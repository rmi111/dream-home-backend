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
const crypto_1 = __importDefault(require("crypto"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const users_service_1 = __importDefault(require("../../services/users.service"));
//@ts-ignore
const jwtSecret = process.env.JWT_SECRET;
class JwtMiddleware {
    verifyRefreshBodyField(req, res, next) {
        if (req.body && req.body.refreshToken) {
            return next();
        }
        else {
            return res.status(400).send({ errors: ['Missing required field: refreshToken'] });
        }
    }
    validRefreshNeeded(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield users_service_1.default.getUserByEmailWithPassword(res.locals.jwt.email);
            const salt = crypto_1.default.createSecretKey(Buffer.from(res.locals.jwt.refreshKey.data));
            const hash = crypto_1.default.createHmac('sha512', salt).
                update(res.locals.jwt.userId + jwtSecret).
                digest('base64');
            if (hash === req.body.refreshToken) {
                req.body =
                    {
                        userId: user._id,
                        email: user.email,
                        permissionFlags: user.permissionFlags
                    };
                return next();
            }
            else {
                return res.status(400).send({ errors: ['Invalid refreshToken'] });
            }
        });
    }
    validJWTNeeded(req, res, next) {
        if (req.headers['authorization']) {
            try {
                const authorization = req.headers['authorization'].split(' ');
                if (authorization[0] !== 'Bearer') {
                    return res.status(401).send();
                }
                else {
                    res.locals.jwt = jsonwebtoken_1.default.verify(authorization[1], jwtSecret);
                    next();
                }
            }
            catch (err) {
                return res.status(403).send();
            }
        }
        else {
            return res.status(401).send();
        }
    }
}
exports.default = new JwtMiddleware();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiand0Lm1pZGRsZXdhcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYXV0aC9taWRkbGV3YXJlL2p3dC5taWRkbGV3YXJlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0RBQTRCO0FBRTVCLGdFQUErQjtBQUUvQixpRkFBd0Q7QUFFeEQsWUFBWTtBQUNaLE1BQU0sU0FBUyxHQUFXLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDO0FBRWpELE1BQU0sYUFBYTtJQUVmLHNCQUFzQixDQUFDLEdBQW9CLEVBQ3ZDLEdBQXFCLEVBQ3JCLElBQTBCO1FBRXRCLElBQUcsR0FBRyxDQUFDLElBQUksSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLFlBQVksRUFDcEM7WUFDSSxPQUFPLElBQUksRUFBRSxDQUFDO1NBQ2pCO2FBQ0c7WUFDQSxPQUFPLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLEVBQUMsTUFBTSxFQUFFLENBQUMsc0NBQXNDLENBQUMsRUFBQyxDQUFDLENBQUM7U0FDbkY7SUFDTCxDQUFDO0lBRUssa0JBQWtCLENBRXBCLEdBQW9CLEVBQ3BCLEdBQXFCLEVBQ3JCLElBQTBCOztZQUd0QixNQUFNLElBQUksR0FBUSxNQUFNLHVCQUFZLENBQUMsMEJBQTBCLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFdEYsTUFBTSxJQUFJLEdBQUcsZ0JBQU0sQ0FBQyxlQUFlLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztZQUNqRixNQUFNLElBQUksR0FBRyxnQkFBTSxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDO2dCQUNqQyxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxHQUFHLFNBQVMsQ0FBQztnQkFDekMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBRTdCLElBQUcsSUFBSSxLQUFLLEdBQUcsQ0FBQyxJQUFJLENBQUMsWUFBWSxFQUNqQztnQkFDSSxHQUFHLENBQUMsSUFBSTtvQkFDUjt3QkFDSSxNQUFNLEVBQUUsSUFBSSxDQUFDLEdBQUc7d0JBQ2hCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSzt3QkFDakIsZUFBZSxFQUFFLElBQUksQ0FBQyxlQUFlO3FCQUN4QyxDQUFBO2dCQUVELE9BQU8sSUFBSSxFQUFFLENBQUM7YUFDakI7aUJBRUQ7Z0JBQ0ksT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxFQUFDLE1BQU0sRUFBRSxDQUFDLHNCQUFzQixDQUFDLEVBQUMsQ0FBQyxDQUFDO2FBQ25FO1FBQ0wsQ0FBQztLQUFBO0lBRUQsY0FBYyxDQUFDLEdBQW9CLEVBQy9CLEdBQXFCLEVBQ3JCLElBQTBCO1FBRXRCLElBQUcsR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUMsRUFDL0I7WUFDSSxJQUNBO2dCQUNJLE1BQU0sYUFBYSxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUU5RCxJQUFHLGFBQWEsQ0FBQyxDQUFDLENBQUMsS0FBSyxRQUFRLEVBQ2hDO29CQUNJLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztpQkFDakM7cUJBRUQ7b0JBQ0ksR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsc0JBQUcsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxFQUFDLFNBQVMsQ0FBUSxDQUFDO29CQUMvRCxJQUFJLEVBQUUsQ0FBQztpQkFDVjthQUNKO1lBQ0QsT0FBTSxHQUFHLEVBQ1Q7Z0JBQ0ksT0FBTyxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO2FBQ2pDO1NBQ0o7YUFFRDtZQUNJLE9BQU8sR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztTQUNqQztJQUVMLENBQUM7Q0FDaEI7QUFFRCxrQkFBZSxJQUFJLGFBQWEsRUFBRSxDQUFDIn0=