export const getNodeValue = (ref) => {
  if (Array.isArray(ref)) {
    let value = ""
    for (let item of ref) {
      if (item.checked) value = item.value
    }
    // console.log(value)
    return value
  }
  if (ref.type === "checkbox") return ref.checked
  return ref.value
}

export const isRadioButton = (ref) => ref.type === "radio"

export const flatten = (obj) => {
  const flattened = {}

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flatten(obj[key]))
    } else {
      flattened[key] = obj[key]
    }
  })

  return flattened
}

export const unflatten = (obj) => {
  var result = {}
  for (var i in obj) {
    var keys = i.split(".")
    keys.reduce(function (r, e, j) {
      return r[e] || (r[e] = isNaN(Number(keys[j + 1])) ? (keys.length - 1 == j ? obj[i] : {}) : [])
    }, result)
  }
  return result
}
