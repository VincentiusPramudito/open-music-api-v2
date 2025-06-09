const { nanoid } = require('nanoid');
const ConnectPool = require('./ConnectPool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongsServices {
  constructor(usersService, playlistsService) {
    this._pool = ConnectPool();
    this._songsService = usersService;
    this._playlistsService = playlistsService;
  }

  async addPlaylistSongs(playlistId, songId) {
    const id = `playlist-song-${nanoid(16)}`;

    const query = {
      text: 'INSERT INTO playlist_songs VALUES($1, $2, $3) RETURNING id',
      values: [id, playlistId, songId]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Failed add song to playlist');
    }
  }

  async getPlaylistSongs(playlistId) {
    const playlist = await this._playlistsService.getPlaylistById(playlistId);
    const query = {
      text: `
      SELECT songs.id, songs.title, songs.performer FROM songs
      INNER JOIN playlist_songs ON songs.id = playlist_songs.song_id
      WHERE playlist_songs.playlist_id = $1`,
      values: [playlistId]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Empty songs');
    }

    playlist[0].songs = result.rows;
    return playlist[0];
  }

  async deletePlaylistSong(playlistId, songId) {
    const query = {
      text: 'DELETE FROM playlist_songs WHERE playlist_id = $1 AND song_id = $2 RETURNING id',
      values: [playlistId, songId]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Remove song failed. Cannot find song in playlist');
    }
  }

  async verifySongIsExist(id) {
    await this._songsService.getSongById(id);
  }

  async verifyPlaylistOwner(id, owner) {
    await this._playlistsService.verifyPlaylistOwner(id, owner);
  }
}

module.exports = PlaylistSongsServices;