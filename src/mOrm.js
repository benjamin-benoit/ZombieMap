import { isEmpty } from 'lodash';
import { existsSync } from 'fs';
import Path from 'path';
import PostgreSQL from './engine/postgresql';

export default class mOrm {
	configPathName = "./mOrm.config.json";

	async createConnection(dbConfig = {}, extras = { entities: [] }) {
		console.log("start connection");

		if (isEmpty(dbConfig)) {
			if (!existsSync(Path.join(__dirname, this.configPathName))) {
				throw new Error("config file is required")
			}

			this.dbConfig = require(Path.join(__dirname, this.configPathName));

			console.log("loaded config from file");
		}

		this.dbConfig.synchronize =
			dbConfig.synchronize !== undefined ? dbConfig.synchronize : false;

		// this.entities = {};
		// for (const entities of extras.entities) {
		// 	this.entities[entities.prototype.constructor.name] = entities;
		// }

		console.log("connect ok");

		switch (this.dbConfig.type) {
			case 'postgres':
                this.dbInstance = new PostgreSQL(this.dbConfig)
                console.log("")
				break;

			default:
				throw new Error(`engine ${this.dbConfig.type} not supported`)
		}
        await this.dbInstance.initialize()
	}
}