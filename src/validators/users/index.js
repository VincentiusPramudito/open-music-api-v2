const InvariantError = require('../../exceptions/InvariantError');
const UsersSchema = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validateUserPayload = UsersSchema.validate(payload);

    if (validateUserPayload.error) {
      throw new InvariantError(validateUserPayload.error.message);
    }
  }
};

module.exports = UsersValidator;