const validator = (body, rules, customMessages, callback) => {
  const errors = {};

  for (const [field, rule] of Object.entries(rules)) {
    const value = body[field];
    const parts = rule.split("|");

    for (const part of parts) {
      if (
        part === "required" &&
        (value === undefined || value === null || value === "")
      ) {
        errors[field] = errors[field] || [];
        errors[field].push(`${field} is required`);
      }
      if (
        part === "string" &&
        value !== undefined &&
        value !== null &&
        typeof value !== "string"
      ) {
        errors[field] = errors[field] || [];
        errors[field].push(`${field} must be a string`);
      }
      if (part === "email" && value !== undefined && value !== null) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (typeof value !== "string" || !emailRegex.test(value)) {
          errors[field] = errors[field] || [];
          errors[field].push(`${field} must be a valid email`);
        }
      }
    }
  }

  if (Object.keys(errors).length > 0) {
    return callback(errors, false);
  }

  callback(null, true);
};

module.exports = validator;
