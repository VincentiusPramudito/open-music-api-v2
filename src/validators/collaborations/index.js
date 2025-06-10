const InvariantError = require('../../exceptions/InvariantError');
const CollaborationsPayloadSchema = require('./schema');

const CollaborationValidator = {
  validateCollaborationPayload: (payload) => {
    const validateResult = CollaborationsPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
};

module.exports = CollaborationValidator;