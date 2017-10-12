const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const jwt = require('jsonwebtoken');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);
const key = require('./key')
const secretKey = process.env.secretKey || key

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

const checkAuth = (request, response, next) => {
  const token = request.headers.authorization || request.body.token;

  if (!token) {
    return response.status(403).json({error: 'You must be authorized to hit this endpoint.'})
  }

  jwt.verify(token, secretKey, (error, decoded) => {
    if (error) {
      return response.status(403).json({error: "Invalid token"});
    };

    decoded.email.includes('turing.io') ? next() : response.status(403).json({error: "Invalid email."})
  });
};

app.get('/api/v1/sources', (request, response) => {
  database('sources')
    .select()
    .then(source => response.status(200).json(source))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/sources/:id', (request, response) => {
  const { id } = request.params;

  database('sources')
    .where({ SOURCE_ID: id })
    .select()
    .then(source =>
      (!source.length
        ? response.status(404).json({ error: 'Could not be found.' })
        : response.status(200).json(source)))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/waves', (request, response) => {
  if(request.query.year) {
    const { year } = request.query
    return database('waves').select().where('YEAR', year)
      .then(waves => waves.length ? response.status(200).json(waves) : response.status(404).json({error: `This Database only Contains Tsunami Data from 2013 until 2017, you searched for ${year}`}))
      .catch(error => response.status(500).json({error}))
  }

  database('waves')
    .select()
    .then(wave => response.status(200).json(wave))
    .catch(error => response.status(500).json({ error }));
});

app.get('/api/v1/waves/:id', (request, response) => {
  const { id } = request.params;

  database('waves')
    .where({ WAVE_ID: id })
    .select()
    .then(wave =>
      (!wave.length
        ? response.status(404).json({ error: 'Could not be found.' })
        : response.status(200).json(wave)))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/newuser/authenticate', (request, response) => {
  const { email, appName } = request.body;

  if(!email || !appName) {
    return response.status(422).json({error: `An App Name and Email are required.`})
  }

  const accountAuth = email.includes('turing.io') ? Object.assign(request.body, {admin: true}) : Object.assign(request.body, {admin: false})

  jwt.sign(accountAuth, secretKey, {expiresIn: "48h"}, (error, token) => {
    token ? response.status(200).json({ token }) : response.status(404).json({error})
  });
})

app.post('/api/v1/sources/', checkAuth, (request, response) => {
  const source = request.body;

  delete source.token

  const keys = [
    'SOURCE_ID',
    'YEAR',
    'MONTH',
    'COUNTRY',
    'STATEPROVINCE',
    'LOCATION',
    'LATITUDE',
    'LONGITUDE',
    'MAXIMUM_HEIGHT',
    'FATALITIES',
    'FATALITY_ESTIMATE',
    'ALL_DAMAGE_MILLIONS',
    'DAMAGE_ESTIMATE',
  ];

  for (const requiredParameter of keys) {
    if (!source[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { 'SOURCE_ID': <String>, 'YEAR': <String>, 'MONTH': <String>, 'COUNTRY': <String>, 'STATEPROVINCE': <String>, 'LOCATION': <String>, 'LATITUDE': <string>, 'LONGITUDE': <string>, 'MAXIMUM_HEIGHT': <String>, 'FATALITIES': <string>, 'FATALITY_ESTIMATE': <String>, 'ALL_DAMAGE_MILLIONS': <String>, 'DAMAGE_ESTIMATE': <String> }. You're missing a ${requiredParameter} property.`,
      });
    }
  }

  database('sources')
    .insert(source, '*')
    .then(source => response.status(201).json(source))
    .catch(error => response.status(500).json({ error }));
});

app.post('/api/v1/waves/', checkAuth, (request, response) => {
  const wave = request.body;

  delete wave.token

  const keys = [
    'WAVE_ID',
    'SOURCE_ID',
    'YEAR',
    'MONTH',
    'LOCATION',
    'MAXIMUM_HEIGHT',
    'FATALITIES',
    'FATALITY_ESTIMATE',
    'ALL_DAMAGE_MILLIONS',
    'DAMAGE_ESTIMATE',
  ];

  for (const requiredParameter of keys) {
    if (!wave[requiredParameter]) {
      return response.status(422).send({
        error: `Expected format: { 'WAVE_ID': <String>, 'SOURCE_ID': <String>, 'YEAR': <String>, 'MONTH': <String>, 'LOCATION': <String>, 'MAXIMUM_HEIGHT': <String>, 'FATALITIES': <string>, 'FATALITY_ESTIMATE': <String>, 'ALL_DAMAGE_MILLIONS': <String>, 'DAMAGE_ESTIMATE': <String> }. You're missing a ${requiredParameter} property.`,
      });
    }
  }

  database('waves')
    .insert(wave, '*')
    .then(wave => response.status(201).json(wave))
    .catch(error => response.status(500).json({ error }));
});

app.delete('/api/v1/sources/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('waves')
    .where({ SOURCE_ID: id })
    .del()
    .then(() => {
      database('sources')
        .where({ SOURCE_ID: id })
        .del()
        .then(deleted =>
          (!deleted
            ? response.status(404).json({ error: `Cannot find Source with ID of ${id}` })
            : response.sendStatus(204)))
        .catch(error => response.status(500).json({ error }));
    });
});

app.delete('/api/v1/waves/:id', checkAuth, (request, response) => {
  const { id } = request.params;

  database('waves')
    .where({ WAVE_ID: id })
    .del()
    .then(deleted =>
      (!deleted
        ? response.status(404).json({ error: `Cannot find Wave with ID of ${id}` })
        : response.sendStatus(204)))
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/sources/:id', checkAuth, (request, response) => {
  const sourcePatch = request.body;
  const { id } = request.params;

  delete sourcePatch.token

  database('sources')
    .where('SOURCE_ID', id)
    .update(sourcePatch, '*')
    .then((update) => {
      if (!update.length) {
        response.status(404).json({
          error: `Cannot find Source with ID of ${id}`,
        });
      }
      response.status(200).json(update[0]);
    })
    .catch(error => response.status(500).json({ error }));
});

app.patch('/api/v1/waves/:id', checkAuth, (request, response) => {
  const wavePatch = request.body;
  const { id } = request.params;

  delete wavePatch.token

  database('waves')
    .where('WAVE_ID', id)
    .update(wavePatch, '*')
    .then((update) => {
      if (!update.length) {
        response.status(404).json({
          error: `Cannot find Wave with ID of ${id}`,
        });
      }
      response.status(200).json(update[0]);
    })
    .catch(error => response.status(500).json({ error }));
});

app.listen(app.get('port'), () => {
  console.log(`Tsunami API is running on ${app.get('port')}.`);
});

module.exports = app;
