"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("../../app"));
const supertest_1 = __importDefault(require("supertest"));
const chai_1 = require("chai");
const shortid_1 = __importDefault(require("shortid"));
const mongoose_1 = __importDefault(require("mongoose"));
let firstUserIdTest = ''; // will later hold a value returned by our API
const firstUserBody = {
    email: `marcos.henrique+${shortid_1.default.generate()}@toptal.com`,
    password: 'Sup3rSecret!23',
};
let accessToken = '';
let refreshToken = '';
const newFirstName = 'Jose';
const newFirstName2 = 'Paulo';
const newLastName2 = 'Faraco';
describe('users and auth endpoints', function () {
    let request;
    before(function () {
        request = supertest_1.default.agent(app_1.default);
    });
    after(function (done) {
        // shut down the Express.js server, close our MongoDB connection, then
        // tell Mocha we're done:
        app_1.default.close(() => {
            mongoose_1.default.connection.close(done);
        });
    });
    it('should allow a POST to /users', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post('/users').send(firstUserBody);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body.id).to.be.a('string');
            firstUserIdTest = res.body.id;
        });
    });
    it('should allow a POST to /auth', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request.post('/auth').send(firstUserBody);
            (0, chai_1.expect)(res.status).to.equal(201);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body.accessToken).to.be.a('string');
            accessToken = res.body.accessToken;
            refreshToken = res.body.refreshToken;
        });
    });
    it('should allow a GET from /users/:userId with an access token', function () {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield request
                .get(`/users/${firstUserIdTest}`)
                .set({ Authorization: `Bearer ${accessToken}` })
                .send();
            (0, chai_1.expect)(res.status).to.equal(200);
            (0, chai_1.expect)(res.body).not.to.be.empty;
            (0, chai_1.expect)(res.body).to.be.an('object');
            (0, chai_1.expect)(res.body._id).to.be.a('string');
            (0, chai_1.expect)(res.body._id).to.equal(firstUserIdTest);
            (0, chai_1.expect)(res.body.email).to.equal(firstUserBody.email);
        });
    });
    describe('with a valid access token', function () {
        it('should allow a GET from /users', function () {
            return __awaiter(this, void 0, void 0, function* () {
                const res = yield request
                    .get(`/users`)
                    .set({ Authorization: `Bearer ${accessToken}` })
                    .send();
                (0, chai_1.expect)(res.status).to.equal(403);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMudGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy90ZXN0L3VzZXJzL3VzZXJzLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvREFBNEI7QUFDNUIsMERBQWtDO0FBQ2xDLCtCQUE4QjtBQUM5QixzREFBOEI7QUFDOUIsd0RBQWdDO0FBRWhDLElBQUksZUFBZSxHQUFHLEVBQUUsQ0FBQyxDQUFDLDhDQUE4QztBQUN4RSxNQUFNLGFBQWEsR0FBRztJQUNsQixLQUFLLEVBQUUsbUJBQW1CLGlCQUFPLENBQUMsUUFBUSxFQUFFLGFBQWE7SUFDekQsUUFBUSxFQUFFLGdCQUFnQjtDQUM3QixDQUFDO0FBRUYsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO0FBQ3JCLElBQUksWUFBWSxHQUFHLEVBQUUsQ0FBQztBQUN0QixNQUFNLFlBQVksR0FBRyxNQUFNLENBQUM7QUFDNUIsTUFBTSxhQUFhLEdBQUcsT0FBTyxDQUFDO0FBQzlCLE1BQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUU5QixRQUFRLENBQUMsMEJBQTBCLEVBQUU7SUFDakMsSUFBSSxPQUFpQyxDQUFDO0lBQ3RDLE1BQU0sQ0FBQztRQUNILE9BQU8sR0FBRyxtQkFBUyxDQUFDLEtBQUssQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUNuQyxDQUFDLENBQUMsQ0FBQztJQUNILEtBQUssQ0FBQyxVQUFVLElBQUk7UUFDaEIsc0VBQXNFO1FBQ3RFLHlCQUF5QjtRQUN6QixhQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRTtZQUNYLGtCQUFRLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsRUFBRSxDQUFDLCtCQUErQixFQUFFOztZQUNoQyxNQUFNLEdBQUcsR0FBRyxNQUFNLE9BQU8sQ0FBQyxJQUFJLENBQUMsUUFB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