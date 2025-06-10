const InvariantError = require('../../exceptions/InvariantError');
const PlaylistSongActivitesPayloadSchema = require('./schema');

const PlaylistSongActivityValidator = {
  validatePlaylistSongActivityPayload: (payload) => {
    const validateResult = PlaylistSongActivitesPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
};

module.exports = PlaylistSongActivityValidator;