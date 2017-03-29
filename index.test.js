const test = require('ava');
const tempWrite = require('temp-write');

test('Gets the token from the env variable', (t) => {
  const envName = 'TOKEN';

  process.env[envName] = 'test';
  const getDockerSecret = require('./index');

  const token = getDockerSecret(envName);

  t.is(token, 'test');
});

test('Gets the token from the file in the env variable', (t) => {
  const envName = 'FILE_TOKEN';
  const filepath = tempWrite.sync('file');

  process.env[envName + '_FILE'] = filepath;
  const getDockerSecret = require('./index');

  const token = getDockerSecret(envName);

  t.is(token, 'file');
});

test('Uses the default token when no env is set', (t) => {
  const getDockerSecret = require('./index');
  const token = getDockerSecret('DOES_NOT_EXIST', 'default');

  t.is(token, 'default');
});
