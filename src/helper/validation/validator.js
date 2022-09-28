const { createError } = require("../error/handler");

module.exports = {
  create(schema) {
    return ({ body, params: { collection } }, _, next) => {
      const { error } = schema[collection]().validate(body);
      if (error) {
        createError(401, error.message);
      } else {
        next();
      }
    };
  },
  body(schema) {
    return ({ body }, _, next) => {
      const { error } = schema().validate(body);
      if (error) {
        createError(401, error.message);
      } else {
        next();
      }
    };
  },
};