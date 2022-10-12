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
const debug_1 = __importDefault(require("debug"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const crypto_1 = __importDefault(require("crypto"));
const log = (0, debug_1.default)('app:auth-controller');
//const jwtSecret: string = process.env.JWT_SECRET;
const tokenExpirationInSeconds = 36000;
class AuthController {
    createJWT(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const jwtSecret = process.env.JWT_SECRET;
                //console.log(jwtSecret);
                const refreshId = req.body.userId + jwtSecret;
                const salt = crypto_1.default.createSecretKey(crypto_1.default.randomBytes(16));
                const hash = crypto_1.default
                    .createHmac('sha512', salt)
                    .update(refreshId)
                    .digest('base64');
                req.body.refreshKey = salt.export();
                const token = jsonwebtoken_1.default.sign(req.body, jwtSecret, { expiresIn: tokenExpirationInSeconds });
                return res.status(201).send({ accessToken: token, refreshToken: hash });
            }
            catch (err) {
                log('CreateJWT error: %0', err);
                return res.status(500).send();
            }
        });
    }
}
exports.default = new AuthController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aC5jb250cm9sbGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2F1dGgvY29udHJvbGxlcnMvYXV0aC5jb250cm9sbGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQ0Esa0RBQTBCO0FBQzFCLGdFQUErQjtBQUMvQixvREFBNEI7QUFHNUIsTUFBTSxHQUFHLEdBQW9CLElBQUEsZUFBSyxFQUFDLHFCQUFxQixDQUFDLENBQUM7QUFHMUQsbURBQW1EO0FBQ25ELE1BQU0sd0JBQXdCLEdBQUcsS0FBSyxDQUFDO0FBRXZDLE1BQU0sY0FBYztJQUNWLFNBQVMsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUV2RCxJQUFHO2dCQUNDLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBcUIsQ0FBQztnQkFFNUQseUJBQXlCO2dCQUV6QixNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxTQUFTLENBQUM7Z0JBQzlDLE1BQU0sSUFBSSxHQUFHLGdCQUFNLENBQUMsZUFBZSxDQUFDLGdCQUFNLENBQUMsV0FBVyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7Z0JBRTVELE1BQU0sSUFBSSxHQUFHLGdCQUFNO3FCQUNGLFVBQVUsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDO3FCQUN6QixNQUFNLENBQUMsU0FBUyxDQUFDO3FCQUNqQixNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7Z0JBRWxDLEdBQUcsQ0FBQyxJQUFJLENBQUMsVUFBVSxHQUFHLElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFFcEMsTUFBTSxLQUFLLEdBQUcsc0JBQUcsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUUsRUFBQyxTQUFTLEVBQUUsd0JBQXdCLEVBQUMsQ0FBQyxDQUFDO2dCQUVuRixPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxZQUFZLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQzthQUMzRTtZQUNELE9BQU0sR0FBRyxFQUNUO2dCQUNJLEdBQUcsQ0FBQyxxQkFBcUIsRUFBRSxHQUFHLENBQUMsQ0FBQztnQkFDaEMsT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDO1FBQ0wsQ0FBQztLQUFBO0NBQ0o7QUFFRCxrQkFBZSxJQUFJLGNBQWMsRUFBRSxDQUFDIn0=