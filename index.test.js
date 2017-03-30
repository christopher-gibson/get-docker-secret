const test = require('ava');
const tempWrite = require('temp-write');

process.env.SECRET = 'SECRET!';
process.env.ANOTHER_SECRET_FILE = tempWrite.sync('FILE_SECRET!');
process.env.NO_FILE = './DOES_NOT_EXIST';

const getDockerSecret = require('./index');


test('Gets the token from the env variable', (t) => {
  const token = getDockerSecret('SECRET');
  t.is(token, process.env.SECRET);
});

test('Gets the token from the file in the env variable', (t) => {
  const token = getDockerSecret('ANOTHER_SECRET');
  t.is(token, 'FILE_SECRET!');
});

test('Returns next available when file does not exist', (t) => {
  const token = getDockerSecret('NO', 'file');
  t.is(token, 'file');
});

test('Uses the default token when no env is set', (t) => {
  const token = getDockerSecret('DOES_NOT_EXIST', 'default');
  t.is(token, 'default');
});
