class PlaylistSongsHandler {
  constructor(playlistSongsService, playlistSongActivitiesService, songsService, playlistsService, validator) {
    this._playlistSongsService = playlistSongsService;
    this._playlistSongActivitiesService = playlistSongActivitiesService;
    this._playlistsService = playlistsService;
    this._songsService = songsService;
    this._validator = validator;
  }

  postPlaylistSongs = async (request, h) => {
    this._validator.validatePlaylistSongPayload(request.payload);

    const { songId  } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._songsService.getSongById(songId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    await this._playlistSongsService.addPlaylistSongs(playlistId, songId);
    await this._playlistSongActivitiesService.addPlaylistSongActivity({ playlistId, songId, credentialId, action: 'add' });

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

    await this._playlistsService.verifyPlaylistById(playlistId);
    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const playlistSongs = await this._playlistSongsService.getPlaylistSongs(playlistId);
    playlist[0].songs = playlistSongs;
    return {
      status: 'success',
      data: {
        playlist: playlist[0]
      }
    };
  };

  deletePlaylistSong = async (request) => {
    const { songId  } = request.payload;
    const { id: playlistId } = request.params;
    const { id: credentialId } = request.auth.credentials;

    await this._playlistsService.verifyPlaylistAccess(playlistId, credentialId);

    await this._playlistSongActivitiesService.addPlaylistSongActivity({ playlistId, songId, credentialId, action: 'delete' });
    await this._playlistSongsService.deletePlaylistSong(playlistId, songId);
    return {
      status: 'success',
      message: 'Song deleted from playlists successfully'
    };
  };
}

module.exports = PlaylistSongsHandler;