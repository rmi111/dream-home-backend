"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersRoutes = void 0;
const common_routes_config_1 = require("../common/common.routes.config");
const users_controller_1 = __importDefault(require("./controller/users.controller"));
const users_middleware_1 = __importDefault(require("../users/middleware/users.middleware"));
const body_validation_middleware_1 = __importDefault(require("../common/middleware/body.validation.middleware"));
const express_validator_1 = require("express-validator");
const jwt_middleware_1 = __importDefault(require("../auth/middleware/jwt.middleware"));
const permission_middleware_1 = __importDefault(require("../auth/middleware/permission.middleware"));
const common_permissionflag_enum_1 = require("../auth/middleware/common.permissionflag.enum");
class UsersRoutes extends common_routes_config_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'UsersRoutes');
    }
    configureRoutes() {
        this.app
            .route(`/users`)
            .get(jwt_middleware_1.default.validJWTNeeded, permission_middleware_1.default.permissionFlagRequired(common_permissionflag_enum_1.PermissionFlag.ADMIN_PERMISSION), users_controller_1.default.listUsers);
        // this.app.route(`/users`)
        //     .get(UsersController.listUsers)
        //     .post(
        //         body('email').isEmail(),
        //         body('password')
        //             .isLength({ min : 5})
        //             .withMessage('Must include password ( 5+ character )'),
        //         BodyValidationMiddleware.verifyBodyFieldsErrors,
        //         UsersMiddleware.validateSameEmailDoesntExist,
        //         UsersController.createUser);
        this.app.param(`userId`, users_middleware_1.default.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(users_middleware_1.default.validateUserExists, jwt_middleware_1.default.validJWTNeeded, permission_middleware_1.default.onlySameUserOrAdminCanDoThisAction)
            //.all(UsersMiddleware.validateUserExists)
            .get(users_controller_1.default.getUserById)
            .delete(users_controller_1.default.removeUser);
        this.app.put(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            (0, express_validator_1.body)('firstName').isString(),
            (0, express_validator_1.body)('lastName').isString(),
            (0, express_validator_1.body)('permissionFlags').isInt(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            //UsersMiddleware.validateRequiredUserBodyFields,
            users_middleware_1.default.validateSameEmailBelongToSameUser,
            users_controller_1.default.put,
        ]);
        this.app.patch(`/users/:userId`, [
            (0, express_validator_1.body)('email').isEmail().optional(),
            (0, express_validator_1.body)('password')
                .isLength({ min: 5 })
                .withMessage('Password must be 5+ characters')
                .optional(),
            (0, express_validator_1.body)('firstName').isString().optional(),
            (0, express_validator_1.body)('lastName').isString().optional(),
            (0, express_validator_1.body)('permissionFlags').isInt().optional(),
            body_validation_middleware_1.default.verifyBodyFieldsErrors,
            users_middleware_1.default.validatePatchEmail,
            users_controller_1.default.patch,
        ]);
        return this.app;
    }
}
exports.UsersRoutes = UsersRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlcnMucm91dGVzLmNvbmZpZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uL3NyYy91c2Vycy91c2Vycy5yb3V0ZXMuY29uZmlnLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLHlFQUFvRTtBQUVwRSxxRkFBNEQ7QUFDNUQsNEZBQW1FO0FBQ25FLGlIQUF1RjtBQUN2Rix5REFBdUM7QUFDdkMsdUZBQThEO0FBQzlELHFHQUE0RTtBQUM1RSw4RkFBK0U7QUFFL0UsTUFBYSxXQUFZLFNBQVEseUNBQWtCO0lBQy9DLFlBQVksR0FBd0I7UUFFaEMsS0FBSyxDQUFDLEdBQUcsRUFBRSxhQUFhLENBQUMsQ0FBQztJQUM5QixDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHO2FBQ1AsS0FBSyxDQUFDLFFBQVEsQ0FBQzthQUNmLEdBQUcsQ0FDQSx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsK0JBQW9CLENBQUMsc0JBQXNCLENBQ3ZDLDJDQUFjLENBQUMsZ0JBQWdCLENBQ2xDLEVBQ0QsMEJBQWUsQ0FBQyxTQUFTLENBQzVCLENBQUE7UUFFRCwyQkFBMkI7UUFDM0Isc0NBQXNDO1FBQ3RDLGFBQWE7UUFDYixtQ0FBbUM7UUFDbkMsMkJBQTJCO1FBQzNCLG9DQUFvQztRQUNwQyxzRUFBc0U7UUFFdEUsMkRBQTJEO1FBRTNELHdEQUF3RDtRQUN4RCx1Q0FBdUM7UUFFdkMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxFQUFFLDBCQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDeEQsSUFBSSxDQUFDLEdBQUc7YUFDSCxLQUFLLENBQUMsZ0JBQWdCLENBQUM7YUFDdkIsR0FBRyxDQUNnQiwwQkFBZSxDQUFDLGtCQUFrQixFQUNsQyx3QkFBYSxDQUFDLGNBQWMsRUFDNUIsK0JBQW9CLENBQUMsa0NBQWtDLENBQzFEO1lBQ2pCLDBDQUEwQzthQUN6QyxHQUFHLENBQUMsMEJBQWUsQ0FBQyxXQUFXLENBQUM7YUFDaEMsTUFBTSxDQUFDLDBCQUFlLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFeEMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsZ0JBQWdCLEVBQUU7WUFDM0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRTtZQUN2QixJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDO2lCQUNYLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLHVDQUF1QyxDQUFDO1lBQ3pELElBQUEsd0JBQUksRUFBQyxXQUFXLENBQUMsQ0FBQyxRQUFRLEVBQUU7WUFDNUIsSUFBQSx3QkFBSSxFQUFDLFVBQVUsQ0FBQyxDQUFDLFFBQVEsRUFBRTtZQUMzQixJQUFBLHdCQUFJLEVBQUMsaUJBQWlCLENBQUMsQ0FBQyxLQUFLLEVBQUU7WUFDL0Isb0NBQXdCLENBQUMsc0JBQXNCO1lBQy9DLGlEQUFpRDtZQUNqRCwwQkFBZSxDQUFDLGlDQUFpQztZQUNqRCwwQkFBZSxDQUFDLEdBQUc7U0FDdEIsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLEVBQUU7WUFDN0IsSUFBQSx3QkFBSSxFQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxDQUFDLFFBQVEsRUFBRTtZQUN0QixJQUFBLHdCQUFJLEVBQUMsVUFBVSxDQUFDO2lCQUNYLFFBQVEsQ0FBQyxFQUFFLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztpQkFDcEIsV0FBVyxDQUFDLGdDQUFnQyxDQUFDO2lCQUM3QyxRQUFRLEVBQUU7WUFDZixJQUFBLHdCQUFJLEVBQUMsV0FBVyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQ3ZDLElBQUEsd0JBQUksRUFBQyxVQUFVLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxRQUFRLEVBQUU7WUFDdEMsSUFBQSx3QkFBSSxFQUFDLGlCQUFpQixDQUFDLENBQUMsS0FBSyxFQUFFLENBQUMsUUFBUSxFQUFFO1lBQzlDLG9DQUF3QixDQUFDLHNCQUFzQjtZQUN2RCwwQkFBZSxDQUFDLGtCQUFrQjtZQUNsQywwQkFBZSxDQUFDLEtBQUs7U0FDeEIsQ0FBQyxDQUFDO1FBR0gsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQXpFRCxrQ0F5RUMifQ==