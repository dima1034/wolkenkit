'use strict';

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var nodeenv = require('nodeenv'),
    request = require('requestretry');

var errors = require('../../../errors');

var waitForApplication = function () {
  var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee(options, progress) {
    var configuration, env, host, port, restoreEnvironment, selectedEnvironment, result;
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (options) {
              _context.next = 2;
              break;
            }

            throw new Error('Options are missing.');

          case 2:
            if (options.configuration) {
              _context.next = 4;
              break;
            }

            throw new Error('Configuration is missing.');

          case 4:
            if (options.env) {
              _context.next = 6;
              break;
            }

            throw new Error('Environment is missing.');

          case 6:
            if (progress) {
              _context.next = 8;
              break;
            }

            throw new Error('Progress is missing.');

          case 8:
            configuration = options.configuration, env = options.env;
            host = options.host, port = options.port;
            restoreEnvironment = nodeenv('NODE_TLS_REJECT_UNAUTHORIZED', '0');
            selectedEnvironment = configuration.environments[env];


            if (!host || !port) {
              host = selectedEnvironment.api.address.host;
              port = selectedEnvironment.api.address.port;
            }

            progress({ message: 'Waiting for https://' + host + ':' + port + '/v1/ping to reply...', type: 'info' });

            _context.next = 16;
            return request({
              url: 'https://' + host + ':' + port + '/v1/ping',
              json: true,
              fullResponse: false,
              maxAttempts: 60,
              retryDelay: 2 * 1000,
              retryStrategy: request.RetryStrategies.HTTPOrNetworkError
            });

          case 16:
            result = _context.sent;


            restoreEnvironment();

            if (!(result.api !== 'v1')) {
              _context.next = 20;
              break;
            }

            throw new errors.JsonMalformed();

          case 20:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  }));

  return function waitForApplication(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = waitForApplication;