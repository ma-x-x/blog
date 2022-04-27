"use strict";
var _bcrypt = _interopRequireDefault(require("bcrypt"));
var _sequelize = require("sequelize");
var _supertest = _interopRequireDefault(require("supertest"));
var _app = _interopRequireDefault(require("../app"));
var _usersRoute = _interopRequireDefault(require("../routes/users.route"));
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
describe('Testing Users', ()=>{
    describe('[GET] /users', ()=>{
        it('response findAll users', async ()=>{
            const usersRoute = new _usersRoute.default();
            const users = usersRoute.usersController.userService.users;
            users.findAll = jest.fn().mockReturnValue([
                {
                    id: 1,
                    email: 'a@email.com',
                    password: await _bcrypt.default.hash('q1w2e3r4!', 10)
                },
                {
                    id: 2,
                    email: 'b@email.com',
                    password: await _bcrypt.default.hash('a1s2d3f4!', 10)
                },
                {
                    id: 3,
                    email: 'c@email.com',
                    password: await _bcrypt.default.hash('z1x2c3v4!', 10)
                }, 
            ]);
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                usersRoute
            ]);
            return (0, _supertest).default(app.getServer()).get(`${usersRoute.path}`).expect(200);
        });
    });
    describe('[GET] /users/:id', ()=>{
        it('response findOne user', async ()=>{
            const username = 1;
            const usersRoute = new _usersRoute.default();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: 1,
                email: 'a@email.com',
                password: await _bcrypt.default.hash('q1w2e3r4!', 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                usersRoute
            ]);
            return (0, _supertest).default(app.getServer()).get(`${usersRoute.path}/${username}`).expect(200);
        });
    });
    describe('[POST] /users', ()=>{
        it('response Create user', async ()=>{
            const userData = {
                email: 'test@email.com',
                password: 'q1w2e3r4!'
            };
            const usersRoute = new _usersRoute.default();
            const users = usersRoute.usersController.userService.users;
            users.findOne = jest.fn().mockReturnValue(null);
            users.create = jest.fn().mockReturnValue({
                id: 1,
                email: userData.email,
                password: await _bcrypt.default.hash(userData.password, 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                usersRoute
            ]);
            return (0, _supertest).default(app.getServer()).post(`${usersRoute.path}`).send(userData).expect(201);
        });
    });
    describe('[PUT] /users/:id', ()=>{
        it('response Update user', async ()=>{
            const username = 1;
            const userData = {
                email: 'test@email.com',
                password: '1q2w3e4r!'
            };
            const usersRoute = new _usersRoute.default();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: username,
                email: userData.email,
                password: await _bcrypt.default.hash(userData.password, 10)
            });
            users.update = jest.fn().mockReturnValue([
                1
            ]);
            users.findByPk = jest.fn().mockReturnValue({
                id: username,
                email: userData.email,
                password: await _bcrypt.default.hash(userData.password, 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                usersRoute
            ]);
            return (0, _supertest).default(app.getServer()).put(`${usersRoute.path}/${username}`).send(userData).expect(200);
        });
    });
    describe('[DELETE] /users/:id', ()=>{
        it('response Delete user', async ()=>{
            const username = 1;
            const usersRoute = new _usersRoute.default();
            const users = usersRoute.usersController.userService.users;
            users.findByPk = jest.fn().mockReturnValue({
                id: username,
                email: 'a@email.com',
                password: await _bcrypt.default.hash('q1w2e3r4!', 10)
            });
            _sequelize.Sequelize.authenticate = jest.fn();
            const app = new _app.default([
                usersRoute
            ]);
            return (0, _supertest).default(app.getServer()).delete(`${usersRoute.path}/${username}`).expect(200);
        });
    });
});

//# sourceMappingURL=users.test.js.map