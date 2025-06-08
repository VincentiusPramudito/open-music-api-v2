const InvariantError = require('../../exceptions/InvariantError');
const { PostAuthenticationsPayloadSchema, PutAuthenticationsPayloadSchema, DeleteAuthenticationsPayloadSchema } = require('./schema');

const AuthenticationsValidator = {
  validatePostAuthenticationPayload: (payload) => {
    const validatePayload = PostAuthenticationsPayloadSchema.validate(payload);
    if (validatePayload.error) {
      throw new InvariantError(validatePayload.error.message);
    }
  },
  validatePutAuthenticationPayload: (payload) => {
    const validatePayload = PutAuthenticationsPayloadSchema.validate(payload);
    if (validatePayload.error) {
      throw new InvariantError(validatePayload.error.message);
    }
  },
  validateDeleteAuthenticationPayload: (payload) => {
    const validatePayload = DeleteAuthenticationsPayloadSchema.validate(payload);
    if (validatePayload.error) {
      throw new InvariantError(validatePayload.error.message);
    }
  }
};

module.exports = AuthenticationsValidator;