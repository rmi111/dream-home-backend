import { CommonRoutesConfig } from "../common/common.routes.config";
import express from 'express';
import UsersController from "./controller/users.controller";
import UsersMiddleware from '../users/middleware/users.middleware';
import BodyValidationMiddleware from '../common/middleware/body.validation.middleware';
import {body} from 'express-validator';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from "../auth/middleware/permission.middleware";
import { PermissionFlag } from "../auth/middleware/common.permissionflag.enum";

export class UsersRoutes extends CommonRoutesConfig{
    constructor(app: express.Application)
    {
        super(app, 'UsersRoutes');
    }

    configureRoutes(): express.Application {
        this.app
        .route(`/users`)
        .get(
            jwtMiddleware.validJWTNeeded,
            permissionMiddleware.permissionFlagRequired(
                PermissionFlag.ADMIN_PERMISSION
            ),
            UsersController.listUsers
        )

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
    
        this.app.param(`userId`, UsersMiddleware.extractUserId);
        this.app
            .route(`/users/:userId`)
            .all(
                                UsersMiddleware.validateUserExists,
                                jwtMiddleware.validJWTNeeded,
                                permissionMiddleware.onlySameUserOrAdminCanDoThisAction
                            )
            //.all(UsersMiddleware.validateUserExists)
            .get(UsersController.getUserById)
            .delete(UsersController.removeUser);

        this.app.put(`/users/:userId`, [
            body('email').isEmail(),
            body('password')
                .isLength({ min: 5 })
                .withMessage('Must include password (5+ characters)'),
            body('firstName').isString(),
            body('lastName').isString(),
            body('permissionFlags').isInt(),
            BodyValidationMiddleware.verifyBodyFieldsErrors,
            //UsersMiddleware.validateRequiredUserBodyFields,
            UsersMiddleware.validateSameEmailBelongToSameUser,
            UsersController.put,
        ]);

        this.app.patch(`/users/:userId`, [
            body('email').isEmail().optional(),
                        body('password')
                            .isLength({ min: 5 })
                            .withMessage('Password must be 5+ characters')
                            .optional(),
                        body('firstName').isString().optional(),
                        body('lastName').isString().optional(),
                        body('permissionFlags').isInt().optional(),
                    BodyValidationMiddleware.verifyBodyFieldsErrors,
            UsersMiddleware.validatePatchEmail,
            UsersController.patch,
        ]);

    
        return this.app;
    }
}