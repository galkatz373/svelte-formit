import { writable, get, derived } from "svelte/store";
import {
  getNodeValue,
  isRadioButton,
  flatten,
  unflatten,
  isSelectMulti,
  findInputOrSelect,
} from "./util";
import { tick } from "svelte";

export const key = {};

export const useForm = ({ mode } = {} || undefined) => {
  let fields = writable({});
  let errors = writable({});
  let isSubmitting = writable(false);
  let touched = writable({});
  let dirty = writable({});
  let isValid = derived(errors, ($errors) => Object.keys($errors).length === 0);
  let validations = writable({});

  const register = (node, validate) => {
    let initialName = node.name || node.getAttribute("name");
    node = findInputOrSelect(node);
    node.name = initialName;
    const { name } = node;
    if (validate) {
      validations.update((n) => ({ ...n, [name]: { validate, ref: node } }));
    }

    if (isRadioButton(node)) {
      fields.update((n) => ({
        ...n,
        [name]: n[name] ? [...n[name], node] : [node],
      }));
    } else if (isSelectMulti(node)) {
      fields.update((n) => ({ ...n, [name]: node.options }));
    } else {
      fields.update((n) => ({ ...n, [name]: node }));
    }

    fields.update((n) => {
      return isRadioButton(node)
        ? { ...n, [name]: n[name] ? [...n[name], node] : [node] }
        : { ...n, [name]: node };
    });

    node.addEventListener("input", (e) => {
      let value = getNodeValue(node);
      if (mode && validate && mode === "onChange") {
        for (let func of Object.values(validate)) {
          if (func(value)) {
            errors.update((n) => ({
              ...n,
              [name]: {
                message: func(value),
                ref: e.target,
              },
            }));
            break;
          } else {
            errors.update((n) => {
              let { [name]: value, ...rest } = n;
              return rest;
            });
          }
        }
      }
    });

    node.addEventListener("change", (e) => {
      fields.update((n) => ({ ...n, [name]: e.target }));
    });

    if (isRadioButton(node)) {
      node.addEventListener("click", (e) => {
        let value = getNodeValue(node);
        if (mode && validate && mode === "onChange") {
          for (let func of Object.values(validate)) {
            if (func(value)) {
              errors.update((n) => ({
                ...n,
                [name]: {
                  message: func(value),
                  ref: e.target,
                },
              }));
              break;
            } else {
              errors.update((n) => {
                let { [name]: value, ...rest } = n;
                return rest;
              });
            }
          }
        }
      });
    }

    node.addEventListener("blur", (e) => {
      let value = node.type === "checkbox" ? e.target.checked : e.target.value;
      if (mode && validate && mode === "onBlur") {
        for (let func of Object.values(validate)) {
          if (func(value)) {
            errors.update((n) => ({
              ...n,
              [name]: {
                message: func(value),
                ref: e.target,
              },
            }));
            break;
          } else {
            errors.update((n) => {
              let { [name]: value, ...rest } = n;
              return rest;
            });
          }
        }
      }
      touched.update((n) => ({
        ...n,
        [name]: e.target,
      }));
    });

    node.addEventListener("focus", (e) => {
      dirty.update((n) => ({
        ...n,
        [name]: e.target,
      }));
    });

    return {
      destroy() {
        unregister(name);
      },
    };
  };

  const unregister = (name) => {
    validations.update((n) => {
      let { [name]: value, ...rest } = n;
      return rest;
    });
    fields.update((n) => {
      let { [name]: value, ...rest } = n;
      return rest;
    });
    errors.update((n) => {
      let { [name]: value, ...rest } = n;
      return rest;
    });
    dirty.update((n) => {
      let { [name]: value, ...rest } = n;
      return rest;
    });
    touched.update((n) => {
      let { [name]: value, ...rest } = n;
      return rest;
    });
  };

  const watch = (name) => {
    if (get(fields)) return getNodeValue(get(fields)[name]);
  };

  const triggerValidation = (name) => {
    if (get(validations)[name]) {
      for (let func of Object.values(get(validations)[name].validate)) {
        if (func(getNodeValue(get(validations)[name].ref))) {
          errors.update((n) => ({
            ...n,
            [name]: {
              message: func(getNodeValue(get(validations)[name].ref)),
              ref: get(validations)[name].ref,
            },
          }));
          break;
        } else {
          errors.update((n) => {
            let { [name]: value, ...rest } = n;
            return rest;
          });
        }
      }
    } else {
      console.error("This field doesn't have validations or doesn't exist");
    }
  };

  const setValue = (fieldName, value) => {
    fields.update((n) => {
      if (get(fields)[fieldName]) {
        get(fields)[fieldName].type === "checkbox"
          ? (get(fields)[fieldName].checked = value)
          : (get(fields)[fieldName].value = value);
      }

      return n;
    });
  };

  const getValues = () => {
    let values = {};
    for (let [key, ref] of Object.entries(get(fields))) {
      values = {
        ...values,
        [key]: getNodeValue(ref),
      };
    }
    return unflatten(values);
  };

  const reset = (values) => {
    let flattenValues = flatten(values);
    for (let [key, value] of Object.entries(flattenValues)) {
      setValue(key, value);
    }
  };

  const handleSubmit = (ev, onSubmit) => {
    if (ev && ev.preventDefault) {
      ev.preventDefault();
    }
    for (let field of Object.values(get(validations))) {
      for (let func of Object.values(field.validate)) {
        if (func(getNodeValue(get(fields)[field.ref.name]))) {
          errors.update((n) => ({
            ...n,
            [field.ref.name]: {
              message: func(getNodeValue(get(fields)[field.ref.name])),
              ref: field.ref,
            },
          }));
          break;
        } else {
          errors.update((n) => {
            let { [field.ref.name]: value, ...rest } = n;
            return rest;
          });
        }
      }
    }

    let firstError = Object.values(get(errors))[0];
    if (firstError) {
      firstError.ref.focus();
    }

    isSubmitting.set(true);

    let values = {};

    for (let [key, field] of Object.entries(get(fields))) {
      values = {
        ...values,
        [key]: getNodeValue(field),
      };
    }

    get(isValid) && onSubmit(unflatten(values));
    isSubmitting.set(false);
  };

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
  };
};
