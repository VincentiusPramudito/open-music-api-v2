const InvariantError = require('../../exceptions/InvariantError');
const UsersSchema = require('./schema');

const UsersValidator = {
  validateUserPayload: (payload) => {
    const validateResult = UsersSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
};

module.exports = UsersValidator;