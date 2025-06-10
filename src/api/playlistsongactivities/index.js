const PlaylistSongActivitiesServices = require('./handler');
const routes = require('./routes');

module.exports = {
  name: 'playlist_song_activities',
  version: '1.0.0',
  register: async (server, { playlistSongActivitiesService, playlistsService, validator }) => {
    const playlistSongsHandler = new PlaylistSongActivitiesServices(playlistSongActivitiesService, playlistsService, validator);
    server.route(routes(playlistSongsHandler));
  }
};