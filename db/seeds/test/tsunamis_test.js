const sources = require('../../../public/assets/sources_test.json');
const waves = require('../../../public/assets/waves_test.json');

const createSource = (knex, source) => {
  return knex('sources').insert({
    SOURCE_ID: source.SOURCE_ID,
    YEAR: source.YEAR,
    MONTH: source.MONTH,
    COUNTRY: source.COUNTRY,
    STATEPROVINCE: source['STATE/PROVINCE'],
    LOCATION: source.LOCATION,
    LATITUDE: source.LATITUDE,
    LONGITUDE: source.LONGITUDE,
    MAXIMUM_HEIGHT: source.MAXIMUM_HEIGHT,
    FATALITIES: source.FATALITIES,
    FATALITY_ESTIMATE: source.FATALITY_ESTIMATE,
    ALL_DAMAGE_MILLIONS: source.ALL_DAMAGE_MILLIONS,
    DAMAGE_ESTIMATE: source.DAMAGE_ESTIMATE
  })
}

const createWave = (knex, wave) => {
  return knex('waves').insert({
    WAVE_ID: wave.WAVE_ID,
    SOURCE_ID: wave.SOURCE_ID,
    YEAR: wave.YEAR,
    MONTH: wave.MONTH,
    LOCATION: wave.LOCATION,
    MAXIMUM_HEIGHT: wave.MAXIMUM_HEIGHT,
    FATALITIES: wave.FATALITIES,
    FATALITY_ESTIMATE: wave.FATALITY_ESTIMATE,
    ALL_DAMAGE_MILLIONS: wave.ALL_DAMAGE_MILLIONS,
    DAMAGE_ESTIMATE: wave.DAMAGE_ESTIMATE
  })
}

exports.seed = (knex, Promise) => {
  return knex('waves').del()
    .then(() => knex('sources').del())
    .then(() => {
      let sourcePromises = [];

      sources.forEach(source => {
        sourcePromises.push(createSource(knex, source))
      });
      return Promise.all(sourcePromises)
    })
    .then(() => {
      let wavePromises = [];

      waves.forEach(wave => {
        wavePromises.push(createWave(knex, wave))
      });
      return Promise.all(wavePromises)
    })
    .then(() => console.log('Seeding is complete'))
    .catch(error => console.log(`Error seeding data: ${error}`))
};
