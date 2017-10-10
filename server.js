const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const path = require('path')

const environment = process.env.NODE_ENV || 'development'
const configuration = require('./knexfile')[environment]
const database = require('knex')(configuration)

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/api/v1/sources', (request, response) => {
  database('sources').select()
    .then(source => response.status(200).json(source))
    .catch(error => response.status(500).json({error}));
});

app.get('/api/v1/sources/:id', (request, response) => {
  const { id } = request.params;

  database('sources').where({SOURCE_ID: id}).select()
    .then(source => !source.length ? response.status(404).json({error: 'Could not be found.'}) : response.status(200).json(source))
    .catch(error => response.status(500).json({error}));
});

app.get('/api/v1/waves', (request, response) => {
  database('waves').select()
    .then(wave => response.status(200).json(wave))
    .catch(error => response.status(500).json({error}));
});

app.get('/api/v1/waves/:id', (request, response) => {
  const { id } = request.params;

  database('waves').where({WAVE_ID: id}).select()
    .then(wave => !wave.length ? response.status(404).json({error: 'Could not be found.'}) : response.status(200).json(wave))
    .catch(error => response.status(500).json({error}));
});

app.listen(app.get('port'), () => {
  console.log(`Palette Picker is running on ${app.get('port')}.`);
});

module.exports = app
