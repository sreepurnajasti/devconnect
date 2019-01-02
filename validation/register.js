const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateRegisterInput(data) {
  let errors = {};
  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  console.log(data);
  console.log(typeof data.name);

  if (!validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }
  if (!validator.isLength(data.email, { min: 2, max: 50 })) {
    errors.email = "Email must be between 2 and 50 characters";
  }
  if (!validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (validator.isEmpty(data.name)) {
    console.log("came here");
    errors.name = "Name field is required";
  }
  if (validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }
  if (validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
