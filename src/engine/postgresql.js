import { Client } from 'pg';
import Core from './core';
import { isEmpty } from "lodash";

export default class PostgreSQL extends Core {

	async initialize() {
		const { host, port, username, password, database, synchronize, entities } = this;

		this.client = new Client({
			user: username,
			host,
			port,
			database,
			password
		});

		try {
			this.client.connect()
			console.log("client connected")
		}
		catch (err) {
			console.log("client disconnected")
			console.log(`database ${database} doesn't exist`);
			console.log(err);
			this.client.end()
		}
		//this.client.end()
	}
}