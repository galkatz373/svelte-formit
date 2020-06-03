import { writable, get, derived } from "svelte/store"
import { isRadioButton, flatten, unflatten, isSelectMulti, findInputOrSelect } from "./util"
import { tick } from "svelte"

export const key = {}

export const useForm = ({ mode } = {} || undefined) => {
  let fields = writable({})
  let errors = writable({})
  let isSubmitting = writable(false)
  let touched = writable({})
  let dirty = writable({})
  let isValid = derived(errors, ($errors) => Object.keys($errors).length === 0)
  let validations = writable({})
  let values = writable({})

  const register = (node, validate, isCustom = false) => {
    let initialName = node.name || node.getAttribute("name")
    node = findInputOrSelect(node)
    node.name = initialName
    const { name } = node
    if (validate) {
      validations.update((n) => ({ ...n, [name]: { validate, ref: node } }))
    }

    if (isRadioButton(node)) {
      fields.update((n) => ({
        ...n,
        [name]: n[name] ? [...n[name], node] : [node],
      }))
      values.update((n) => node.checked && { ...n, [name]: node.value })
    } else if (isSelectMulti(node)) {
      fields.update((n) => ({ ...n, [name]: node.options }))
      let selected = []
      for (let option of node.options) {
        if (option.selected) {
          selected.push(option.value)
        }
      }
      values.update((n) => ({ ...n, [name]: selected }))
    } else {
      fields.update((n) => ({ ...n, [name]: node }))
      values.update((n) => ({ ...n, [name]: node.value }))
    }

    // fields.update((n) => {
    //   return isRadioButton(node) ? { ...n, [name]: n[name] ? [...n[name], node] : [node] } : { ...n, [name]: node }
    // })
    if (!isCustom) {
      node.addEventListener("input", (e) => {
        // let value = getNodeValue(node)
        values.update((n) => ({ ...n, [name]: e.target.value }))
        let value = get(values)[name]
        if (mode && validate && mode === "onChange") {
          for (let func of Object.values(validate)) {
            if (func(value)) {
              errors.update((n) => ({
                ...n,
                [name]: {
                  message: func(value),
                  ref: e.target,
                },
              }))
              break
            } else {
              errors.update((n) => {
                let { [name]: value, ...rest } = n
                return rest
              })
            }
          }
        }
      })

      node.addEventListener("change", (e) => {
        fields.update((n) => ({ ...n, [name]: node }))
        if (isRadioButton(node)) {
          values.update((n) => node.checked && { ...n, [name]: node.value })
        } else if (isSelectMulti(node)) {
          let selected = []
          for (let option of node.options) {
            if (option.selected) {
              selected.push(option.value)
            }
          }
          values.update((n) => ({ ...n, [name]: selected }))
        } else {
          values.update((n) => ({ ...n, [name]: node.value }))
        }
      })

      if (isRadioButton(node)) {
        node.addEventListener("click", (e) => {
          // let value = getNodeValue(node)
          values.update((n) => ({ ...n, [name]: node.value }))
          let value = get(values)[name]
          if (mode && validate && mode === "onChange") {
            for (let func of Object.values(validate)) {
              if (func(value)) {
                errors.update((n) => ({
                  ...n,
                  [name]: {
                    message: func(value),
                    ref: node,
                  },
                }))
                break
              } else {
                errors.update((n) => {
                  let { [name]: value, ...rest } = n
                  return rest
                })
              }
            }
          }
        })
      }
    }

    node.addEventListener("blur", (e) => {
      // let value = node.type === "checkbox" ? e.target.checked : e.target.value
      let value = get(values)[name]
      if (mode && validate && mode === "onBlur") {
        for (let func of Object.values(validate)) {
          if (func(value)) {
            errors.update((n) => ({
              ...n,
              [name]: {
                message: func(value),
                ref: e.target,
              },
            }))
            break
          } else {
            errors.update((n) => {
              let { [name]: value, ...rest } = n
              return rest
            })
          }
        }
      }
      touched.update((n) => ({
        ...n,
        [name]: e.target,
      }))
    })

    node.addEventListener("focus", (e) => {
      dirty.update((n) => ({
        ...n,
        [name]: e.target,
      }))
    })

    return {
      destroy() {
        unregister(name)
      },
    }
  }

  const unregister = (name) => {
    validations.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
    fields.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
    errors.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
    dirty.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
    touched.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
    values.update((n) => {
      let { [name]: value, ...rest } = n
      return rest
    })
  }

  const watch = (name) => {
    if (get(fields)) return get(values)[name]
  }

  const triggerValidation = (name) => {
    if (get(validations)[name]) {
      for (let func of Object.values(get(validations)[name].validate)) {
        // getNodeValue(get(validations)[name].ref
        if (func(get(values)[name])) {
          errors.update((n) => ({
            ...n,
            [name]: {
              message: func(get(values)[name]),
              ref: get(validations)[name].ref,
            },
          }))
          break
        } else {
          errors.update((n) => {
            let { [name]: value, ...rest } = n
            return rest
          })
        }
      }
    } else {
      console.error("This field doesn't have validations or doesn't exist")
    }
  }

  const setValue = (fieldName, value) => {
    values.update((n) => ({ ...n, [fieldName]: value }))
  }

  const getValues = () => {
    // for (let [key, ref] of Object.entries(get(fields))) {
    //   values = {
    //     ...values,
    //     [key]: getNodeValue(ref),
    //   }
    // }
    return unflatten(get(values))
  }

  const reset = (values) => {
    let flattenValues = flatten(values)
    for (let [key, value] of Object.entries(flattenValues)) {
      setValue(key, value)
    }
  }

  const handleSubmit = async (ev, onSubmit) => {
    if (ev && ev.preventDefault) {
      ev.preventDefault()
    }
    // getNodeValue(get(fields)[field.ref.name]
    for (let field of Object.values(get(validations))) {
      for (let func of Object.values(field.validate)) {
        if (func(get(values)[field.ref.name])) {
          errors.update((n) => ({
            ...n,
            [field.ref.name]: {
              message: func(get(values)[field.ref.name]),
              ref: field.ref,
            },
          }))
          break
        } else {
          errors.update((n) => {
            let { [field.ref.name]: value, ...rest } = n
            return rest
          })
        }
      }
    }

    let firstError = Object.values(get(errors))[0]
    if (firstError) {
      firstError.ref.focus()
    }

    isSubmitting.set(true)

    // let values = {}

    // for (let [key, field] of Object.entries(get(fields))) {
    //   values = {
    //     ...values,
    //     [key]: getNodeValue(field),
    //   }
    // }

    get(isValid) && (await onSubmit(unflatten(get(values))))
    isSubmitting.set(false)
  }

  return {
    getValues,
    touched,
    dirty,
    setValue,
    watch,
    handleSubmit,
    isSubmitting,
    register,
    triggerValidation,
    isValid,
    errors,
    unregister,
    reset,
  }
}
