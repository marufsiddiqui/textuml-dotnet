define(function(require) {
  var Session, _;

  _ = require('underscore');
  Session = require('../../../application/models/session');
  return describe('models/session', function() {
    var session;

    session = null;
    beforeEach(function() {
      return session = new Session;
    });
    describe('#defaults', function() {
      it('has #email', function() {
        return expect(session.defaults()).to.have.property('email');
      });
      it('has #password', function() {
        return expect(session.defaults()).to.have.property('password');
      });
      return it('has #rememberMe', function() {
        return expect(session.defaults()).to.have.property('rememberMe');
      });
    });
    describe('#url', function() {
      return it('is set', function() {
        return expect(session.url).to.exist;
      });
    });
    return describe('validation', function() {
      describe('valid', function() {
        beforeEach(function() {
          return session.set({
            email: 'user@example.com',
            password: '$ecre8',
            rememberMe: true
          });
        });
        return it('is valid', function() {
          return expect(session.isValid()).to.be.ok;
        });
      });
      return describe('invalid', function() {
        describe('#email', function() {
          describe('missing', function() {
            beforeEach(function() {
              return session.set({
                password: '$ecre8'
              });
            });
            return it('is invalid', function() {
              expect(session.isValid()).to.not.be.ok;
              return expect(session.validationError).to.have.property('email');
            });
          });
          return describe('blank', function() {
            beforeEach(function() {
              return session.set({
                email: '',
                password: '$ecre8'
              });
            });
            return it('is invalid', function() {
              expect(session.isValid()).to.not.be.ok;
              return expect(session.validationError).to.have.property('email');
            });
          });
        });
        return describe('#password', function() {
          describe('missing', function() {
            beforeEach(function() {
              return session.set({
                email: 'user@example.com'
              });
            });
            return it('is invalid', function() {
              expect(session.isValid()).to.not.be.ok;
              return expect(session.validationError).to.have.property('password');
            });
          });
          return describe('blank', function() {
            beforeEach(function() {
              return session.set({
                email: 'user@example.com',
                password: ''
              });
            });
            return it('is invalid', function() {
              expect(session.isValid()).to.not.be.ok;
              return expect(session.validationError).to.have.property('password');
            });
          });
        });
      });
    });
  });
});
