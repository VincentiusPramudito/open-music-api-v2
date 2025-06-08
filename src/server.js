require('dotenv').config();

const Hapi = require('@hapi/hapi');

// Albums
const album = require('./api/albums');
const AlbumValidator = require('./validators/albums');
const AlbumsService = require('./services/postgres/AlbumsServices');

// Songs
const song = require('./api/songs');
const SongValidator = require('./validators/songs');
const SongsService = require('./services/postgres/SongsServices');

// Users
const user = require('./api/users');
const UserValidator = require('./validators/users');
const UsersService = require('./services/postgres/UsersServices');

// Authentications
const authentication = require('./api/authentications');
const AuthenticationValidator = require('./validators/authentications');
const AuthenticationsService = require('./services/postgres/AuthenticationsServices');
const TokenManager = require('./tokenize/TokenManager');

const ClientError = require('./exceptions/ClientError');

const init = async () => {
  const albumsService = new AlbumsService();
  const songsService = new SongsService();
  const usersService = new UsersService();
  const authenticationsService = new AuthenticationsService();

  const server = Hapi.server({
    port: process.env.PORT,
    host: process.env.HOST,
    routes: {
      cors: {
        origin: ['*']
      }
    }
  });

  await server.register([
    {
      plugin: album,
      options: {
        service: albumsService,
        validator: AlbumValidator
      }
    },
    {
      plugin: song,
      options: {
        service: songsService,
        validator: SongValidator
      }
    },
    {
      plugin: user,
      options: {
        service: usersService,
        validator: UserValidator
      }
    },
    {
      plugin: authentication,
      options: {
        authenticationsService,
        usersService,
        tokenManager: TokenManager,
        validator: AuthenticationValidator,
      }
    }
  ]);

  server.ext('onPreResponse', (request, h) => {
    // get context response from request
    const { response } = request;

    // error client handling from internal
    if (response instanceof ClientError) {
      const newResponse = h.response({
        status: 'fail',
        message: response.message,
      });
      newResponse.code(response.statusCode);
      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log(`App is running on ${server.info.uri}`);
};

init();