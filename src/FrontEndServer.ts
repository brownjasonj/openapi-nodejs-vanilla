import cors from 'cors';
import Express from 'express';
import http from 'http';
import https from 'https';
import morgan from 'morgan';
import fs from 'fs';
import { OpenAPIBackend, Request } from 'openapi-backend';
import * as swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import 'reflect-metadata';
import { FrontEndConfiguration } from './models/eom/configuration/FrontEndConfiguration';
import { validationFailHandler } from './handlers/validationFailHandler';
import { notFoundHandler } from './handlers/notFoundHandler';
import { notImplementedHandler } from './handlers/notImplementedHandler';


class FrontEndServer {
    private expressServer: Express.Express;
    private frontEndConfiguration: FrontEndConfiguration;

    constructor(frontEndConfiguration: FrontEndConfiguration) {
        this.frontEndConfiguration = frontEndConfiguration;
        this.expressServer = Express();

        // extende the size of body requests
        this.expressServer.use(Express.json({ limit: '200mb' }));

        // enable cors
        this.expressServer.use(cors({
            origin: 'http://localhost:3000',
        }));

        const openApiDocumentPath = frontEndConfiguration.getOpenapiPath();

        // create api with your definition file or object
        const api = new OpenAPIBackend({ 
            definition: openApiDocumentPath
        });

        // register the swagger-ui
        const swaggerDocument = YAML.load(openApiDocumentPath);
        this.expressServer.use('/swagger', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

        // register default handlers
        api.register('validationFail', validationFailHandler);
        api.register('notFound', notFoundHandler);
        api.register('notImplemented', notImplementedHandler);

        // initalize the backend
        api.init();

        // logging
        this.expressServer.use(morgan('combined'));
        // this.expressServer.use(PinoHttp);

        // use as express middleware to pick-up requests and send to the openapi-backend handler.
        this.expressServer.use((req, res) => api.handleRequest(req as Request, req, res));
    }

    public getExpressServer(): Express.Express {
        return this.expressServer;
    }
}

export { FrontEndServer }