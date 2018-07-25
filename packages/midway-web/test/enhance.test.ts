const assert = require('assert');
const request = require('supertest');
const utils = require('./utils');
const mm = require('mm');

describe('/test/enhance.test.ts', () => {

  describe('load ts file', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('hello', done);
    });
  });

  describe('load ts class controller use decorator', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-controller', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load controller from applicationContext', (done) => {
      request(app.callback())
        .get('/api/index')
        .expect(200)
        .expect('index', done);
    });

    it('should load controller use controller decorator', (done) => {
      request(app.callback())
        .get('/api/test')
        .expect(200)
        .expect('hello', done);
    });
  });

  describe('load ts file and use config, plugin decorator', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-decorator', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect(/3t/, done);
    });
  });

  describe('load ts file and use third party module', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-utils', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject module', (done) => {
      request(app.callback())
        .get('/api/test')
        .expect(200)
        .expect('false3', done);
    });
  });

  describe('load ts file and use async init', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-async', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject module', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('10t', done);
    });
  });

  describe('ts directory different from other', function () {

    let app;
    before(() => {
      mm(process.env, 'HOME', '');
      app = utils.app('enhance/base-app', {
        typescript: true
      });
      return app.ready();
    });
    afterEach(mm.restore);
    after(() => app.close());

    it('should appDir not equal baseDir', () => {
      const appInfo = app.loader.getAppInfo();
      assert(appInfo['name'] === app.name);
      assert(appInfo['baseDir'] === app.baseDir);
      assert(appInfo['root'] === app.appDir);
      assert(appInfo['baseDir'] === app.appDir + '/src');
    });
  });

  describe('load ts file support constructor inject', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-constructor', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject in constructor', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('63t', done);
    });
  });

  describe('auto load function file and inject by function name', () => {
    let app;
    before(() => {
      app = utils.app('enhance/base-app-function', {
        typescript: true
      });
      return app.ready();
    });

    after(() => app.close());

    it('should load ts directory and inject in constructor', (done) => {
      request(app.callback())
        .get('/api')
        .expect(200)
        .expect('63t', done);
    });
  });
});