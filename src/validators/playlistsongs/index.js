const InvariantError = require('../../exceptions/InvariantError');
const PlaylistSongsPayloadSchema = require('./schema');

const PlaylistSongsValidator = {
  validatePlaylistSongPayload: (payload) => {
    const validateResult = PlaylistSongsPayloadSchema.validate(payload);
    if (validateResult.error) {
      throw new InvariantError(validateResult.error.message);
    }
  }
};

module.exports = PlaylistSongsValidator;