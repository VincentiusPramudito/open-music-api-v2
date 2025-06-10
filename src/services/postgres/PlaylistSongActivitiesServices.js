const { nanoid } = require('nanoid');
const ConnectPool = require('./ConnectPool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');

class PlaylistSongActivitiesServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async addPlaylistSongActivity({ playlistId, songId, credentialId, action }) {
    const id = `activity-${nanoid(16)}`;
    const timestamp = new Date().toISOString();
    const query = {
      text: 'INSERT INTO playlist_song_activities VALUES($1, $2, $3, $4, $5, $6) RETURNING id',
      values: [id, playlistId, songId, credentialId, action, timestamp]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Failed to add activity');
    }

    return result.rows[0].id;
  }

  async getPlaylistSongActivities(playlistId) {
    const query = {
      text: `
        SELECT users.username, songs.title, playlist_song_activities.action, playlist_song_activities.time FROM playlist_song_activities
        INNER JOIN users ON playlist_song_activities.user_id = users.id
        INNER JOIN songs ON playlist_song_activities.song_id = songs.id
        WHERE playlist_song_activities.playlist_id = $1
        ORDER BY time ASC
      `,
      values: [playlistId]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('No records activity');
    }
    return result.rows;
  }
};

module.exports = PlaylistSongActivitiesServices;