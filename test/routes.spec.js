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
      chai.request(server)
      .get('/api/v1/sources')
      .end((error, response) => {
        response.should.have.status(200);
        response.should.be.json;
        response.body.should.be.a('array');
        response.body.length.should.equal(3);
        response.body[0].should.have.property('SOURCE_ID');
        response.body[0].SOURCE_ID.should.equal('5586');
        response.body[0].should.have.property('YEAR');
        response.body[0].YEAR.should.equal('551');
        response.body[0].should.have.property('MONTH');
        response.body[0].MONTH.should.equal('7');
        response.body[0].should.have.property('COUNTRY');
        response.body[0].COUNTRY.should.equal('GREECE');
        response.body[0].should.have.property('STATEPROVINCE');
        response.body[0].STATEPROVINCE.should.equal('');
        response.body[0].should.have.property('LOCATION');
        response.body[0].LOCATION.should.equal('');
        response.body[0].should.have.property('LATITUDE');
        response.body[0].LATITUDE.should.equal('38.4');
        response.body[0].should.have.property('LONGITUDE');
        response.body[0].LONGITUDE.should.equal('22.3');
        response.body[0].should.have.property('MAXIMUM_HEIGHT');
        response.body[0].MAXIMUM_HEIGHT.should.equal('');
        response.body[0].should.have.property('FATALITIES');
        response.body[0].FATALITIES.should.equal('');
        response.body[0].should.have.property('FATALITY_ESTIMATE');
        response.body[0].FATALITY_ESTIMATE.should.equal('');
        response.body[0].should.have.property('ALL_DAMAGE_MILLIONS');
        response.body[0].ALL_DAMAGE_MILLIONS.should.equal('');
        response.body[0].should.have.property('DAMAGE_ESTIMATE');
        response.body[0].DAMAGE_ESTIMATE.should.equal('');
        done();
      });
    });

  });
});
