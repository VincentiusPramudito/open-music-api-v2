const InvariantError = require('../../exceptions/InvariantError');
const { PostAuthenticationsPayloadSchema, PutAuthenticationsPayloadSchema, DeleteAuthenticationsPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validateResult = PostAuthenticationsPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validateResult = PutAuthenticationsPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validateResult = DeleteAuthenticationsPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
};

module.exports = AuthenticationsValidator;