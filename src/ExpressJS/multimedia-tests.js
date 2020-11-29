let expect = require('chai').expect;
let request = require('request');
require('../hol4.js');

describe('Get all products', function() {
    let result;

    before(function(done) {
        let options = {
            headers: { 'Content-Type': 'application/json' },
            uri: 'http://localhost:3000/products',
            json: {}
        };
        request.get(options, function(err, res, body) {
            result = { err, res, body };
            done();
        });

    });
    it('should execute without errors', function(done) {
        expect(result.err).to.equal(null);
        done();
    });
    it('should return an http status 200', function(done) {
        expect(result.res.statusCode).to.equal(200);
        done();
    });
    it('should return three items', function(done) {
        expect(result.body.length).to.equal(3);
        done();
    });
});
describe('Get one product', function() {
    let result;

    before(function(done) {
        request.get('http://localhost:3000/products?id=3', function(err, res, body) {
            result = { err, res, body };
            done();
        });

    });
    it('should execute without errors', function(done) {
        expect(result.err).to.equal(null);
        done();
    });
    it('should return an http status 200', function(done) {
        expect(result.res.statusCode).to.equal(200);
        done();
    });
    it('should return '
        Dajm '',
        function(done) {
            expect(result.body[0].name).to.equal('Dajm');
            done();
        });
});
describe('Add one product', function() {
    let result;

    before(function(done) {
        let options = {
            headers: { 'Content-Type': 'application/json' },
            uri: 'http://localhost:3000/products',
            json: {
                id: 4,
                name: 'Fransk norgat',
                price: 8.2
            }
        };
        request.post(options, function(err, res, body) {
            result = { err, res, body };
            done();
        });

    });
    it('should execute without errors', function(done) {
        expect(result.err).to.equal(null);
        done();
    });
    it('should return an http status 200', function(done) {
        expect(result.res.statusCode).to.equal(200);
        done();
    });
});
describe('Get all products again', function() {
    let result;

    before(function(done) {
        request.get('http://localhost:3000/products', function(err, res, body) {
            result = { err, res, body };
            done();
        });

    });
    it('should execute without errors', function(done) {
        expect(result.err).to.equal(null);
        done();
    });
    it('should return an http status 200', function(done) {
        expect(result.res.statusCode).to.equal(200);
        done();
    });
    it('should return four items', function(done) {
        expect(result.body.length).to.equal(4);
        done();
    });
});