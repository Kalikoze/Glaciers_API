const chai = require('chai');

const should = chai.should();
const chaiHttp = require('chai-http');
const server = require('../server');

const environment = process.env.NODE_ENV || 'test';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);

chai.use(chaiHttp);

describe('Client Routes', () => {
  it('should return the homepage with text', (done) => {
    chai
      .request(server)
      .get('/')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.html;
        response.res.text.should.include('Tsunamis API');
        done();
      });
  });

  it('should return a 404 for a route that does not exist', (done) => {
    chai
      .request(server)
      .get('/foo')
      .end((error, response) => {
        response.should.have.status(404);
        done();
      });
  });
});

describe('API Routes', () => {
  let token

  before((done) => {
    database.migrate
      .rollback()
      .then(() => database.migrate.latest())
      .then(() => done())
      .catch(error => console.log(error));

      chai
        .request(server)
        .post('/api/v1/newuser/authenticate')
        .send({appName: 'Cool App', email: 'travis@turing.io'})
        .end((error, response) => token = JSON.parse(response.text).token)
  });

  beforeEach((done) => {
    database.seed
      .run()
      .then(() => done())
      .catch(error => console.log(error));
  });

  describe('GET /api/v1/sources', () => {
    it('should get all of the sources', (done) => {
      const mockData = {
        SOURCE_ID: '5586',
        YEAR: '551',
        MONTH: '7',
        COUNTRY: 'GREECE',
        STATEPROVINCE: '',
        LOCATION: '',
        LATITUDE: '38.4',
        LONGITUDE: '22.3',
        MAXIMUM_HEIGHT: '',
        FATALITIES: '',
        FATALITY_ESTIMATE: '',
        ALL_DAMAGE_MILLIONS: '',
        DAMAGE_ESTIMATE: '',
      };

      chai
        .request(server)
        .get('/api/v1/sources')
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.SOURCE_ID === mockData.SOURCE_ID);
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[index].should.include(mockData);
          done();
        });
    });

    it('should return a 404 status if the url is invalid', (done) => {
      chai
        .request(server)
        .get('/api/v1/foo')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/waves', () => {
    it('should get all of the waves', (done) => {
      const mockData = {
        WAVE_ID: '28689',
        SOURCE_ID: '5586',
        YEAR: '2013',
        MONTH: '8',
        LOCATION: "QUEEN'S WHARF",
        MAXIMUM_HEIGHT: '0.07',
        FATALITIES: '',
        FATALITY_ESTIMATE: '',
        ALL_DAMAGE_MILLIONS: null,
        DAMAGE_ESTIMATE: '',
      };

      chai
        .request(server)
        .get('/api/v1/waves')
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.WAVE_ID === mockData.WAVE_ID);
          response.should.have.status(200);
          response.should.be.json;
          response.body.should.be.a('array');
          response.body.length.should.equal(3);
          response.body[index].should.include(mockData);
          done();
        });
    });

    it('should return a 404 status if the url is invalid', (done) => {
      chai
        .request(server)
        .get('/api/v1/foo')
        .end((error, response) => {
          response.should.have.status(404);
          done();
        });
    });
  });

  describe('GET /api/v1/waves?year=:year', () => {
    it('should return waves from a specific year', (done) => {
      const mockData = {
        WAVE_ID: '28689',
        SOURCE_ID: '5586',
        YEAR: '2013',
        MONTH: '8',
        LOCATION: "QUEEN'S WHARF",
        MAXIMUM_HEIGHT: '0.07',
        FATALITIES: '',
        FATALITY_ESTIMATE: '',
        ALL_DAMAGE_MILLIONS: null,
        DAMAGE_ESTIMATE: '',
      };

      chai
        .request(server)
        .get('/api/v1/waves?year=2013')
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.WAVE_ID === mockData.WAVE_ID);

          response.body.length.should.equal(2);
          response.body.should.be.a('array');
          response.body[index].should.include(mockData);
          done();
        });
    });

    it('should return a 404 status if searching for a year that is not between 2013 and 2017', (done) => {
      chai
        .request(server)
        .get('/api/v1/waves?year=pizza')
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('This Database only Contains Tsunami Data from 2013 until 2017, you searched for pizza');
          done();
        });
    });
  });

  describe('POST /api/v1/sources', () => {
    it('should create a new source', (done) => {
      const mockData = {
        SOURCE_ID: '5543',
        YEAR: '221',
        MONTH: '8',
        COUNTRY: 'ITALY',
        STATEPROVINCE: 'Foo',
        LOCATION: 'Foo',
        LATITUDE: '41.4',
        LONGITUDE: '45.3',
        MAXIMUM_HEIGHT: '21',
        FATALITIES: '455',
        FATALITY_ESTIMATE: '21',
        ALL_DAMAGE_MILLIONS: '4553',
        DAMAGE_ESTIMATE: '231',
      };

      chai
        .request(server)
        .post('/api/v1/sources')
        .set('Authorization', token)
        .send(mockData)
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.SOURCE_ID === mockData.SOURCE_ID);
          response.should.have.status(201);
          response.body.should.be.a('array');
          response.body[index].should.include(mockData);
          done();
        });
    });

    it('should not create a source with a missing data', (done) => {
      chai
        .request(server)
        .post('/api/v1/sources')
        .set('Authorization', token)
        .send({
          YEAR: '221',
          LONGITUDE: '45.3',
          DAMAGE_ESTIMATE: '',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.error.should.equal("Expected format: { 'SOURCE_ID': <String>, 'YEAR': <String>, 'MONTH': <String>, 'COUNTRY': <String>, 'STATEPROVINCE': <String>, 'LOCATION': <String>, 'LATITUDE': <string>, 'LONGITUDE': <string>, 'MAXIMUM_HEIGHT': <String>, 'FATALITIES': <string>, 'FATALITY_ESTIMATE': <String>, 'ALL_DAMAGE_MILLIONS': <String>, 'DAMAGE_ESTIMATE': <String> }. You're missing a SOURCE_ID property.");
          done();
        });
    });
  });

  describe('POST /api/v1/waves', () => {
    const mockData = {
      WAVE_ID: '41232',
      SOURCE_ID: '5586',
      YEAR: '2011',
      MONTH: '2',
      LOCATION: "QUEEN'S WHARF",
      MAXIMUM_HEIGHT: '0.07',
      FATALITIES: '345',
      FATALITY_ESTIMATE: '3232',
      ALL_DAMAGE_MILLIONS: '3382',
      DAMAGE_ESTIMATE: '2',
    };

    it('should create a new wave', (done) => {
      chai
        .request(server)
        .post('/api/v1/waves')
        .set('Authorization', token)
        .send(mockData)
        .end((error, response) => {
          const index = response.body.findIndex(obj => obj.SOURCE_ID === mockData.SOURCE_ID);
          response.should.have.status(201);
          response.body.should.be.a('array');
          response.body[index].should.include(mockData);
          done();
        });
    });

    it('should not create a wave with missing data', (done) => {
      chai
        .request(server)
        .post('/api/v1/waves')
        .set('Authorization', token)
        .send({
          WAVE_ID: '324521',
          DAMAGE_ESTIMATE: '34235',
        })
        .end((error, response) => {
          response.should.have.status(422);
          response.body.error.should.equal("Expected format: { 'WAVE_ID': <String>, 'SOURCE_ID': <String>, 'YEAR': <String>, 'MONTH': <String>, 'LOCATION': <String>, 'MAXIMUM_HEIGHT': <String>, 'FATALITIES': <string>, 'FATALITY_ESTIMATE': <String>, 'ALL_DAMAGE_MILLIONS': <String>, 'DAMAGE_ESTIMATE': <String> }. You're missing a SOURCE_ID property.");
          done();
        });
    });
  });

  describe('DELETE /api/v1/sources/:id', () => {
    it('should delete a source', (done) => {
      chai
        .request(server)
        .delete('/api/v1/sources/5586')
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return a 404 error if an invalid ID is passed', (done) => {
      chai
        .request(server)
        .delete('/api/v1/sources/pizza')
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Cannot find Source with ID of pizza');
          done();
        });
    });
  });

  describe('DELETE /api/v1/waves/:id', () => {
    it('should delete a wave', (done) => {
      chai
        .request(server)
        .delete('/api/v1/waves/28689')
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(204);
          done();
        });
    });

    it('should return a 404 error if an invalid ID is passed', (done) => {
      chai
        .request(server)
        .delete('/api/v1/waves/pizza')
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Cannot find Wave with ID of pizza');
          done();
        });
    });
  });

  describe('PATCH /api/v1/sources', () => {
    const update = {
      LOCATION: 'DENVER',
    };

    it('should update source object', (done) => {
      chai
        .request(server)
        .patch('/api/v1/sources/5586')
        .set('Authorization', token)
        .send(update)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('LOCATION');
          response.body.LOCATION.should.equal('DENVER');
          response.body.YEAR.should.equal('551');
          done();
        });
    });

    it('should return a 404 error if an invalid ID is passed', (done) => {
      chai
        .request(server)
        .patch('/api/v1/sources/pizza')
        .set('Authorization', token)
        .send(update)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Cannot find Source with ID of pizza');
          done();
        });
    });
  });

  describe('PATCH /api/v1/waves/:id', () => {
    const update = {
      LOCATION: 'DENVER',
    };

    it('should update source object', (done) => {
      chai
        .request(server)
        .patch('/api/v1/waves/28689')
        .set('Authorization', token)
        .send(update)
        .end((error, response) => {
          response.should.have.status(200);
          response.body.should.be.a('object');
          response.body.should.have.property('LOCATION');
          response.body.LOCATION.should.equal('DENVER');
          response.body.YEAR.should.equal('2013');
          done();
        });
    });

    it('should return a 404 error if an invalid ID is passed', (done) => {
      chai
        .request(server)
        .patch('/api/v1/waves/gummi-worms')
        .send(update)
        .set('Authorization', token)
        .end((error, response) => {
          response.should.have.status(404);
          response.body.error.should.equal('Cannot find Wave with ID of gummi-worms');
          done();
        });
    });
  });
});
