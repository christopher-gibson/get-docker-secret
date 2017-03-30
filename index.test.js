const test = require('ava');
const tempWrite = require('temp-write');

process.env.SECRET = 'SECRET!';
process.env.ANOTHER_SECRET_FILE = tempWrite.sync('FILE_SECRET!');
process.env.NO_FILE = './DOES_NOT_EXIST';

const getDockerSecret = require('./index');


test('Gets the secret from the env variable', (t) => {
  const secret = getDockerSecret('SECRET');
  t.is(secret, process.env.SECRET);
});

test('Gets the secret from the file in the env variable', (t) => {
  const secret = getDockerSecret('ANOTHER_SECRET');
  t.is(secret, 'FILE_SECRET!');
});

test('Returns next available when file does not exist', (t) => {
  const secret = getDockerSecret('NO', 'file');
  t.is(secret, 'file');
});

test('Uses the default when no env is set', (t) => {
  const secret = getDockerSecret('DOES_NOT_EXIST', 'default');
  t.is(secret, 'default');
});
