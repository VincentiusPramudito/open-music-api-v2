class PlaylistSongActivitiesHandler {
  constructor(playlistSongActivitiesService, playlistsService, validator) {
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._playlistsService = playlistsService;
    this._validator = validator;
  }

  postPlaylistSongActivity = async (request) => {
    this._validator.validatePlaylistSongActivityPayload(request.payload);

    const { playlistId, userId, songId, action } = request.payload;
    // const { id: credentialId } = request.auth.credentials;
    // await this._playlistsService.verifyPlaylistById(playlistId);
    // await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);

    const playlistSongActivity = await this._playlistSongActivitiesService.addPlaylistSongActivity({ playlistId, songId, userId, action });
    return {
      status: 'success',
      data : {
        playlistSongActivity
      }
    };
  };

  getPlaylistSongActivity = async (request) => {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._playlistsService.verifyPlaylistById(playlistId);

    const activities = await this._playlistSongActivitiesService.getPlaylistSongActivities(playlistId);
    return {
      status: 'success',
      data: {
        playlistId,
        activities
      }
    };
  };
};

module.exports = PlaylistSongActivitiesHandler;