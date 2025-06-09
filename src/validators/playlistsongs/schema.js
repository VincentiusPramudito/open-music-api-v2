const Joi = require('joi');

const PlaylistSongsPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  songId: Joi.string().required()
});

module.exports = PlaylistSongsPayloadSchema;