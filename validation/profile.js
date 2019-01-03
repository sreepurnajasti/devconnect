const validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.empNo = !isEmpty(data.empNo) ? data.empNo : "";
  data.companyName = !isEmpty(data.companyName) ? data.companyName : "";
  data.department = !isEmpty(data.department) ? data.department : "";
  // data.location = !isEmpty(data.location) ? data.location : "";
  data.status = !isEmpty(data.status) ? data.status : "";
  data.handle = !isEmpty(data.handle) ? data.handle : "";

  data.phone = !isEmpty(data.phone) ? data.phone : "";
  data.address = !isEmpty(data.address) ? data.address : "";
  data.emergencyNo = !isEmpty(data.emergencyNo) ? data.emergencyNo : "";
  data.bloodGroup = !isEmpty(data.bloodGroup) ? data.bloodGroup : "";

  data.skills = !isEmpty(data.skills) ? data.skills : "";

  console.log(data);

  if (!validator.isLength(data.handle, { min: 2, max: 50 })) {
    errors.handle = "Handle must be between 2 and 50 characters";
  }
  if (validator.isMobilePhone(data.phone)) {
    errors.phone = "Not a valid phone number";
  }
  if (validator.isMobilePhone(data.emergencyNo)) {
    errors.emergencyNo = "Not a valid phone number";
  }

  if (validator.isEmpty(data.empNo)) {
    errors.empNo = "Employee Number field is required";
  }
  if (validator.isEmpty(data.companyName)) {
    errors.companyName = "companyName field is required";
  }
  if (validator.isEmpty(data.department)) {
    errors.department = "department field is required";
  }
  // if (validator.isEmpty(data.location)) {
  //   errors.location = "location field is required";
  // }
  if (validator.isEmpty(data.status)) {
    errors.status = "status field is required";
  }
  if (validator.isEmpty(data.handle)) {
    errors.handle = "handle field is required";
  }
  if (validator.isEmpty(data.phone)) {
    errors.phone = "phone field is required";
  }
  if (validator.isEmpty(data.address)) {
    errors.address = "address field is required";
  }
  if (validator.isEmpty(data.emergencyNo)) {
    errors.emergencyNo = "emergencyNo field is required";
  }
  if (validator.isEmpty(data.bloodGroup)) {
    errors.bloodGroup = "bloodGroup field is required";
  }
  if (validator.isEmpty(data.skills)) {
    errors.skills = "skills field is required";
  }
  // if (!isEmpty(data.dob)) {
  //   if (!validator.isRFC3339(data.dob)) {
  //     errors.dob = "Not a valid date";
  //   }
  // }
  if (!isEmpty(data.website)) {
    if (!validator.isURL(data.website)) {
      errors.website = "Not a valid URL";
    }
  }
  if (!isEmpty(data.youtube)) {
    if (!validator.isURL(data.youtube)) {
      errors.youtube = "Not a valid URL";
    }
  }
  if (!isEmpty(data.twitter)) {
    if (!validator.isURL(data.twitter)) {
      errors.twitter = "Not a valid URL";
    }
  }
  if (!isEmpty(data.facebook)) {
    if (!validator.isURL(data.facebook)) {
      errors.facebook = "Not a valid URL";
    }
  }
  if (!isEmpty(data.instagram)) {
    if (!validator.isURL(data.instagram)) {
      errors.instagram = "Not a valid URL";
    }
  }
  if (!isEmpty(data.stackoverflow)) {
    if (!validator.isURL(data.stackoverflow)) {
      errors.stackoverflow = "Not a valid URL";
    }
  }
  if (!isEmpty(data.medium)) {
    if (!validator.isURL(data.medium)) {
      errors.medium = "Not a valid URL";
    }
  }
  if (!isEmpty(data.quora)) {
    if (!validator.isURL(data.quora)) {
      errors.quora = "Not a valid URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
