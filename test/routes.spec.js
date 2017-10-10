const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');
const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with text', done => {
    chai.request(server)
    .get('/')
    .end((error, response) => {
      response.should.have.status(200);
      response.should.be.html;
      response.res.text.should.include('Tsunamis API')
      done();
    });
  });

  it('should return a 404 for a route that does not exist', done => {
    chai.request(server)
    .get('/foo')
    .end((error, response) => {
      response.should.have.status(404);
      done();
    });
  });
});

describe('API Routes', () => {
  before(done => {
    database.migrate.latest()
    .then(() => done())
    .catch(error => console.log(error))
  });

  beforeEach(done => {
    database.seed.run()
    .then(() => done())
    .catch(error => console.log(error))
  });

  describe('GET /api/v1/sources', () => {
    it('should get all of the sources', done => {
      const mockData = {
        'SOURCE_ID': '5586',
        'YEAR': '551',
        'MONTH': '7',
        'COUNTRY': 'GREECE',
        'STATEPROVINCE': '',
        'LOCATION': '',
        'LATITUDE': '38.4',
        'LONGITUDE': '22.3',
        'MAXIMUM_HEIGHT': '',
        'FATALITIES': '',
        'FATALITY_ESTIMATE': '',
        'ALL_DAMAGE_MILLIONS': '',
        'DAMAGE_ESTIMATE': '',
      }

      chai.request(server)
      .get('/api/v1/sources')
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.SOURCE_ID === mockData.SOURCE_ID)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[index].should.include(mockData);
        done();
      });
    });

    it('should return a 404 status if the url is invalid', done => {
      chai.request(server)
      .get('/api/v1/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('GET /api/v1/waves', () => {
    it('should get all of the waves', done => {
      const mockData = {
        'WAVE_ID': '28689',
        'SOURCE_ID': '5586',
        'YEAR': '2013',
        'MONTH': '8',
        'LOCATION': 'QUEEN\'S WHARF',
        'MAXIMUM_HEIGHT': '0.07',
        'FATALITIES': '',
        'FATALITY_ESTIMATE': '',
        'ALL_DAMAGE_MILLIONS': null,
        'DAMAGE_ESTIMATE': '',
      }

      chai.request(server)
      .get('/api/v1/waves')
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.WAVE_ID === mockData.WAVE_ID)
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array')
        response.body.length.should.equal(3);
        response.body[index].should.include(mockData)
        done();
      });
    });

    it('should return a 404 status if the url is invalid', done => {
      chai.request(server)
      .get('/api/v1/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
    });
  });

  describe('POST /api/v1/sources', () => {
    it('should create a new source', done => {
      const mockData = {
        'SOURCE_ID': '5543',
        'YEAR': '221',
        'MONTH': '8',
        'COUNTRY': 'ITALY',
        'STATEPROVINCE': 'Foo',
        'LOCATION': 'Foo',
        'LATITUDE': '41.4',
        'LONGITUDE': '45.3',
        'MAXIMUM_HEIGHT': '21',
        'FATALITIES': '455',
        'FATALITY_ESTIMATE': '21',
        'ALL_DAMAGE_MILLIONS': '4553',
        'DAMAGE_ESTIMATE': '231',
      };

      chai.request(server)
      .post('/api/v1/sources')
      .send(mockData)
      .end((error, response) => {
        const index = response.body.findIndex(obj => obj.SOURCE_ID === mockData.SOURCE_ID)
        response.should.have.status(201);
        response.body.should.be.a('array');
        response.body[index].should.include(mockData);
        done();
      });
    });

    it('should not create a source with a missing data', done => {
      chai.request(server)
      .post('/api/v1/sources')
      .send({
        'YEAR': '221',
        'LONGITUDE': '45.3',
        'DAMAGE_ESTIMATE': ''
      })
      .end((error, response) => {
        response.should.have.status(422);
        response.body.error.should.equal(`Expected format: { 'SOURCE_ID': <String>, 'YEAR': <String>, 'MONTH': <String>, 'COUNTRY': <String>, 'STATEPROVINCE': <String>, 'LOCATION': <String>, 'LATITUDE': <string>, 'LONGITUDE': <string>, 'MAXIMUM_HEIGHT': <String>, 'FATALITIES': <string>, 'FATALITY_ESTIMATE': <String>, 'ALL_DAMAGE_MILLIONS': <String>, 'DAMAGE_ESTIMATE': <String> }. You're missing a SOURCE_ID property.`);
        done();
      });
    });
  });
});
