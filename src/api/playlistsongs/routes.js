const routes = (handler) => [
  {
    method: 'POST',
    path: '/playlists/{id}/songs',
    handler: handler.postPlaylistSongs,
    options: {
      auth: 'openmusicapp_jwt'
    }
  },
  {
    method: 'GET',
    path: '/playlists/{id}/songs',
    handler: handler.getPlaylistSongs,
    options: {
      auth: 'openmusicapp_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/playlists/{id}/songs',
    handler: handler.deletePlaylistSong,
    options: {
      auth: 'openmusicapp_jwt'
    }
  }
];

module.exports = routes;