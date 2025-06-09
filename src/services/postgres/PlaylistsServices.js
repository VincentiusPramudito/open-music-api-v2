const { nanoid } = require('nanoid');
const ConnectPool = require('./ConnectPool');
const InvariantError = require('../../exceptions/InvariantError');
const NotFoundError = require('../../exceptions/NotFoundError');
const AuthorizationError = require('../../exceptions/AuthorizationError');

class Playlists {
  constructor() {
    this._pool = ConnectPool();
  }

  async addPlaylist({ name, owner }) {
    const id = `playlist-${nanoid(16)}`;
    const query = {
      text: 'INSERT INTO playlists VALUES($1, $2, $3) RETURNING id',
      values: [id, name, owner]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Failed to add playlist');
    }

    return result.rows[0].id;
  }

  async getPlaylists(owner) {
    const query = {
      text: `
        SELECT playlists.id, playlists.name, users.username FROM playlists
        LEFT JOIN users ON playlists.owner = users.id
        WHERE playlists.owner = $1
      `,
      values: [owner]
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async getPlaylistById(id) {
    const query = {
      text: `
        SELECT playlists.id, playlists.name, users.username FROM playlists
        LEFT JOIN users ON playlists.owner = users.id
        WHERE playlists.id = $1
      `,
      values: [id]
    };

    const result = await this._pool.query(query);
    return result.rows;
  }

  async deletePlaylistById(id) {
    const query = {
      text: 'DELETE FROM playlists WHERE id = $1 RETURNING id',
      values: [id]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new NotFoundError('Remove playlist failed. Playlist not exist');
    }
  }

  async verifyPlaylistOwner(id, owner) {
    const query = {
      text: 'SELECT id FROM playlists WHERE id = $1 AND owner = $2',
      values: [id, owner]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new AuthorizationError('You have no permission to do this');
    }
  }
}

module.exports = Playlists;