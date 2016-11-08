const tape = require('tape-catch');

tape('Verify /album route', { skip: false }, (describe) => {
  const hapi = require('hapi');
  const hapiReactViews = require('hapi-react-views');
  const querystring = require('querystring');
  const path = require('path');
  const vision = require('vision');

  require('babel-core/register')({
    presets: ['react', 'es2015'],
  });

  const lib = require('../lib');
  const testCases = require('./cases');
  const utils = require('../../utils/lib');

  const plugins = [vision, lib];
  const port = utils.config.get('port');

  testCases.forEach((testCase) => {
    describe.test(testCase.name, testCase.options, (assert) => {
      const server = new hapi.Server();
      server.connection({ port });
      server.register(plugins, (pluginError) => {
        if (pluginError) {
          return assert.fail(pluginError);
        }

        const url = `/album?${querystring.stringify({ gallery: testCase.request.gallery, album_stem: testCase.request.album_stem })}`;
        const request = {
          method: 'GET',
          url,
        };

        server.views({
          engines: {
            jsx: hapiReactViews,
          },
          relativeTo: path.join(__dirname, '../../../'),
        });

        return server.inject(request, (response) => {
          if (response.result.error) {
            return testCase.error(assert, response.result);
          }
          if (testCase.success) {
            return testCase.success(assert, response.result);
          }
          return testCase.successView(assert, response.result);
        });
      });
    });
  });
});