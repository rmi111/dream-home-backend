import express from 'express';
import { PermissionFlag } from '../auth/middleware/common.permissionflag.enum';
import jwtMiddleware from '../auth/middleware/jwt.middleware';
import permissionMiddleware from '../auth/middleware/permission.middleware';
import { CommonRoutesConfig } from "../common/common.routes.config";


export class PropertiesRoute extends CommonRoutesConfig
{
    constructor(app: express.Application){
        super(app,'PropertiesRoute');
    }

    configureRoutes(): express.Application 
    {
        this.app
            .route('/properties')
            .get(
                jwtMiddleware.validJWTNeeded,
                permissionMiddleware.permissionFlagRequired(PermissionFlag.ALL_PERMISSIONS),
                //PropertyController.listProperty
            )
        

        return this.app;
    }

    
}