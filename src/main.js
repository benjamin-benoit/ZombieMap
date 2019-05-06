import mOrm from './mOrm';

(async () => {
	const orm = new mOrm();

	try {
		await orm.createConnection()
	}
	catch (err) {
		console.log(err);
		process.exit(-1);
	}
})()

// (() => {
//     console.log("test");
// })()