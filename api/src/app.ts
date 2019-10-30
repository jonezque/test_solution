import 'reflect-metadata';

import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import { createConnection } from 'typeorm';
import { MysqlConnectionOptions } from 'typeorm/driver/mysql/MysqlConnectionOptions';

import * as config from './config.json';
import solution from './routes/solution';
import { seed } from './utilities/seed';

const connectionDBconfig: MysqlConnectionOptions = {
    name: 'default',
    type: 'mysql',
    host: process.env.DATABASE_HOST || 'localhost',
    port: 3306,
    username: 'dps_user',
    database: 'dps_db',
    password: 'dps_password',
    entities: [__dirname + '/entity/*{.js,.ts}'],
    insecureAuth: true,
    synchronize: true,
    logging: true,
};

createConnection(connectionDBconfig).then(async () => {
    await seed();
    const app = express();
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(express.static(path.join(__dirname, '/../public')));

    app.use('/api/solution', solution);

    app.listen(config.port);
}).catch(e => console.log(e));