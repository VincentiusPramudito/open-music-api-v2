const routes = (handler) => [
  {
    method: 'POST',
    path: '/collaborations',
    handler: handler.postCollaboration,
    options: {
      auth: 'openmusicapp_jwt'
    }
  },
  {
    method: 'DELETE',
    path: '/collaborations',
    handler: handler.deleteCollaboration,
    options: {
      auth: 'openmusicapp_jwt'
    }
  }
];

module.exports = routes;