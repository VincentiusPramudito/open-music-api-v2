class PlaylistHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  postPlaylistHandler = async (request, h) => {
    this._validator.validatePlaylistPayload(request.payload);

    const { name } = request.payload;
    const { id: credentialId } = request.auth.credentials;

    const playlistId = await this._service.addPlaylist({ name, owner: credentialId });
    const response = h.response({
      status: 'success',
      message: 'Playlist added successfully',
      data: {
        playlistId
      }
    });
    response.code(201);
    return response;
  };

  getPlaylistsHandler = async (request) => {
    const { id: credentialId } = request.auth.credentials;
    const playlists = await this._service.getPlaylists(credentialId);
    return {
      status: 'success',
      data: {
        playlists
      }
    };
  };

  deletePlaylistHandler = async (request) => {
    const { id } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._service.verifyPlaylistOwner(id, credentialId);

    await this._service.deletePlaylistById(id);
    return {
      status: 'success',
      message: 'Playlist deleted successfully'
    };
  };
}

module.exports = PlaylistHandler;