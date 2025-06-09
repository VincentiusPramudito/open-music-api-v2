class PlaylistSongsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postPlaylistSongs = async (request, h) => {
    this._validator.validatePlaylistSongPayload(request.payload);
    const { songId  } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(playlistId, credentialId);
    await this._service.verifySongIsExist(songId);

    await this._service.addPlaylistSongs(playlistId, songId);
    const response = h.response({
      status: 'success',
      message: 'Playlist added successfully',
    });
    response.code(201);
    return response;
  };

  getPlaylistSongs = async (request) => {
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistExist(playlistId);
    await this._service.verifyPlaylistOwner(playlistId, credentialId);

    const playlist = await this._service.getPlaylistSongs(playlistId);
    return {
      status: 'success',
      data: {
        playlist
      }
    };
  };

  deletePlaylistSong = async (request) => {
    const { songId  } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(playlistId, credentialId);

    await this._service.deletePlaylistSong(playlistId, songId);
    return {
      status: 'success',
      message: 'Song deleted from playlists successfully'
    };
  };
}

module.exports = PlaylistSongsHandler;