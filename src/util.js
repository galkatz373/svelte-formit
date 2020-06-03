export const getNodeValue = (ref) => {
  if (Array.isArray(ref)) {
    let value = "";
    for (let item of ref) {
      if (item.checked) value = item.value;
    }
    return value;
  }
  if (isCheckbox(ref)) return ref.checked;
  if (isSelectMulti(ref)) {
    let selected = [];
    for (let i = 0; i < ref.length; i++) {
      if (ref.options[i].selected) selected.push(ref.options[i].value);
    }
    return selected;
  }
  if (isFileInput(ref)) {
    return ref.files;
  }
  return ref.value;
};

export const isRadioButton = (ref) => ref.type === "radio";
export const isCheckbox = (ref) => ref.type === "checkbox";
export const isSelectMulti = (ref) => ref.type === "select-multiple";
export const isFileInput = (ref) => ref.type === "file";

export const flatten = (obj) => {
  const flattened = {};

  Object.keys(obj).forEach((key) => {
    if (typeof obj[key] === "object" && obj[key] !== null) {
      Object.assign(flattened, flatten(obj[key]));
    } else {
      flattened[key] = obj[key];
    }
  });

  return flattened;
};

export function unflatten(table) {
  var result = {};

  for (var path in table) {
    var cursor = result,
      length = path.length,
      property = "",
      index = 0;

    while (index < length) {
      var char = path.charAt(index);

      if (char === "[") {
        var start = index + 1,
          end = path.indexOf("]", start),
          cursor = (cursor[property] = cursor[property] || []),
          property = path.slice(start, end),
          index = end + 1;
      } else {
        var cursor = (cursor[property] = cursor[property] || {}),
          start = char === "." ? index + 1 : index,
          bracket = path.indexOf("[", start),
          dot = path.indexOf(".", start);

        if (bracket < 0 && dot < 0) var end = (index = length);
        else if (bracket < 0) var end = (index = dot);
        else if (dot < 0) var end = (index = bracket);
        else var end = (index = bracket < dot ? bracket : dot);

        var property = path.slice(start, end);
      }
    }

    cursor[property] = table[path];
  }

  return result[""];
}

export const findInputOrSelect = (ref) => {
  if (ref.tagName === "INPUT" || ref.tagName === "SELECT") {
    return ref;
  }
  for (let child of ref.children) {
    return findInputOrSelect(child);
  }
};

export const getNodeName = (ref) => ref.name || ref.getAttribute("name");
