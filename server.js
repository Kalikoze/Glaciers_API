const express = require('express');

const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

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

app.get('api/v1/waves?YEAR=:year', (request, response) => {
  const { year } = request.params;
  database('waves')
    .where({ YEAR: year })
    .select()
    .then(wave =>
      (!wave.length
        ? response
          .status(404)
          .json({
            error: `This Database only Contains Tsunami Data from 2013 until 2017, you searched for ${year}`,
          })
        : response.status(200).json(wave)));
});

app.post('/api/v1/sources/', (request, response) => {
  const source = request.body;
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

app.post('/api/v1/waves/', (request, response) => {
  const wave = request.body;
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

app.delete('/api/v1/sources/:id', (request, response) => {
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

app.delete('/api/v1/waves/:id', (request, response) => {
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

app.patch('/api/v1/sources/:id', (request, response) => {
  const sourcePatch = request.body;
  const { id } = request.params;

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

app.patch('/api/v1/waves/:id', (request, response) => {
  const wavePatch = request.body;
  const { id } = request.params;

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
