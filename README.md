# Get Docker Secret

`get-docker-secret` is a small library to simplify getting secrets from docker.
This library accepts a name and looks for a file or env for the token.
If given `TOKEN` as the name, it will first look for an env called `TOKEN_FILE`.
If this env exists, it will return the content of the file.

If it doesn't exist, it will check for an env called `TOKEN`, and return it if it does.

To use this with swarm and `docker secret`, add the path to the secret as an environment variable.
An example would be `TOKEN_FILE=/run/secrets/token`.

## Install

```
npm install --save get-docker-secret
```

## Usage

```javascript
const getDockerSecret = require('get-docker-secret');
const secret = getDockerSecret('SECRET', 'default value');
```

