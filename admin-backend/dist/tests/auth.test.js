"use strict";
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _sequelize = require("sequelize");
var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../app"));
var _authRoute = _interopRequireDefault(require("../routes/auth.route"));
function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        default: obj
    };
}
afterAll(async ()=>{
    await new Promise((resolve)=>setTimeout(()=>resolve()
        , 500)
    );
});
describe('Testing Auth', ()=>{
    describe('[POST] /signup', ()=>{
        it('response should have the Create userData', async ()=>{
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!'
            };
            const authRoute = new _authRoute.default();
            const users = authRoute.authController.authService.users;
            users.findOne = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                id: 1,
                email: userData.email,
                password: await _bcrypt.default.hash(userData.password, 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                authRoute
            ]);
            return (0, _supertest).default(app.getServer()).post(`${authRoute.path}signup`).send(userData).expect(201);
        });
    });
    describe('[POST] /login', ()=>{
        it('response should have the Set-Cookie header with the Authorization token', async ()=>{
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!'
            };
            const authRoute = new _authRoute.default();
            const users = authRoute.authController.authService.users;
            users.findOne = jest.fn().mockReturnValue({
                id: 1,
                email: userData.email,
                password: await _bcrypt.default.hash(userData.password, 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                authRoute
            ]);
            return (0, _supertest).default(app.getServer()).post(`${authRoute.path}login`).send(userData).expect('Set-Cookie', /^Authorization=.+/);
        });
    });
});

//# sourceMappingURL=auth.test.js.map