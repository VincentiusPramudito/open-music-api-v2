const Joi = require('joi');

const PlaylistSongActivitesPayloadSchema = Joi.object({
  playlistId: Joi.string().required(),
  songId: Joi.string().required(),
  userId: Joi.string().required(),
  action: Joi.string().required()
});

module.exports = PlaylistSongActivitesPayloadSchema;