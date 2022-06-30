const validate = (form) => {
  const errors = {},
    regexName = /^[a-zA-Z ]{1,30}$/,
    regexUrl = /https:\/\/.+/,
    regexNum = /^[0-9]*$/;

  if (form.name) {
    if (!regexName.test(form.name))
      errors.name = "name should only contains letters";
    if (form.name.length > 30)
      errors.name = "The name can only contain a maximum of 30 letters";
  } else {
    errors.name = "name is required";
  }

  if (form.weight_min) {
    if (!regexNum.test(form.weight_min))
      errors.weight_min = "min weight should only contains numbers";
  } else {
    errors.weight_min = "min weight is required";
  }

  if (form.weight_max) {
    if (!regexNum.test(form.weight_max))
      errors.weight_max = "max weight should only contains numbers";
  } else {
    errors.weight_max = "max weight is required";
  }
  if (form.weight_min && form.weight_max) {
    if (Number(form.weight_min) >= Number(form.weight_max)) {
      errors.weight_min = "min weight must be less than weight max";
      errors.weight_max = "max weight must be greater than weight min";
    }
  }

  if (form.height_min) {
    if (!regexNum.test(form.height_min))
      errors.height_min = "min height should only contains numbers";
  } else {
    errors.height_min = "min height is required";
  }

  if (form.height_max) {
    if (!regexNum.test(form.height_max))
      errors.height_max = "max height should only contains numbers";
  } else {
    errors.height_max = "max height is required";
  }

  if (form.height_min && form.height_max) {
    if (Number(form.height_min) >= Number(form.height_max)) {
      errors.height_min = "min height must be less than height max";
      errors.height_max = "max height must be greater than height min";
    }
  }

  if (form.life_min || form.life_max) {
    if (!regexNum.test(form.life_min))
      errors.life_min = "min life should only contains numbers";
    if (!regexNum.test(form.life_max)) {
      errors.life_max = "max life should only contains numbers";
    } else {
      if (!form.life_min) {
        errors.life_max = "life min is required";
      }
    }
  }
  if (form.life_min && form.life_max) {
    if (Number(form.life_min) >= Number(form.life_max)) {
      errors.life_min = "min life must be less than life max";
      errors.life_max = "max life must be greater than life min";
    }
  }

  if (form.image) {
    if (!regexUrl.test(form.image))
      errors.image = "The url must match the following format: https://example";
  }

  return errors;
};
export default validate;

/*const noRequired = ["image", "life_min", "life_max", "temperaments"];

const validate = (input) => {
  const errors = {},
    regexName = /([A-Za-z\s]){1,30}/,
    regexUrl = /https:\/\/.+/,
    regexNum = /([0-9]){1,10}/;
  for (let key in input) {
    let value = input[key];
    if (key.includes("life") && !value) continue;
    if (noRequired.includes(key) || value) {
      switch (key) {
        case "name":
          if (!regexName.test(value))
            errors.name = "The name should only contains letters.";
          break;
        case "image":
          if (!regexUrl.test(value))
            errors.image =
              "The url must match the following format: https://example";
          break;
        default:
          if (!isNaN(parseInt(value))) {
            if (!regexNum.test(value))
              errors[key] = `The ${key} should only contains numbers.`;
          }
      }
    } else {
      errors[key] = `The ${key} is required.`;
    }
  }
  return errors;
};
export default validate;
 */
