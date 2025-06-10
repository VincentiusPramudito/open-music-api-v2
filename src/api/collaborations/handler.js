class CollaborationsHandler {
  constructor(collaborationsService, playlistsService, usersService, validator) {
    this._collaborationsService = collaborationsService;
    this._playlistsService = playlistsService;
    this._usersService = usersService;
    this._validator = validator;
  }

  postCollaboration = async (request, h) => {
    this._validator.validateCollaborationPayload(request.payload);

    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistById(playlistId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._usersService.verifyUserById(userId);

    const collaborationId = await this._collaborationsService.addCollaboration(request.payload);
    const response = h.response({
      status: 'success',
      data: {
        collaborationId
      }
    });
    response.code(201);
    return response;
  };

  deleteCollaboration = async (request) => {
    const { playlistId, userId } = request.payload;
    const { id: credentialId } = request.auth.credentials;
    await this._playlistsService.verifyPlaylistById(playlistId);
    await this._playlistsService.verifyPlaylistOwner(playlistId, credentialId);
    await this._usersService.verifyUserById(userId);

    await this._collaborationsService.deleteCollaboration(request.payload);
    return {
      status: 'success',
      message: 'Collaboration deleted succesfully'
    };
  };
}

module.exports = CollaborationsHandler;