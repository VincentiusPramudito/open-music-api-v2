const InvariantError = require('../../exceptions/InvariantError');
const ConnectPool = require('./ConnectPool');

class AuthenticationsServices {
  constructor() {
    this._pool = ConnectPool();
  }

  async addRefreshToken(token) {
    const query = {
      text: 'INSERT INTO authentications VALUES($1)',
      values: [token]
    };

    const result = await this._pool.query(query);
    return result;
  }

  async verifyRefreshTokenByDB(token) {
    const query = {
      text: 'SELECT token FROM authentications WHERE token = $1',
      values: [token]
    };

    const result = await this._pool.query(query);
    if (!result.rows.length) {
      throw new InvariantError('Credential Invalid!');
    }
  }

  async deleteRefreshToken(token) {
    const query = {
      text: 'DELETE FROM authentications WHERE token = $1 ',
      values: [token]
    };

    await this._pool.query(query);
  }
}

module.exports = AuthenticationsServices;