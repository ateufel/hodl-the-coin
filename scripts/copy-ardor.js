const fs = require('fs-extra');

(async () => {
	try {
		//make sure destination folders exist
		await fs.ensureDir('./build-ardor');
		await fs.ensureDir('./build-ardor/img');
		await fs.ensureDir('./build-ardor/audio');
		//copy stuff
		await fs.copy('./app/htdocs', './build-ardor');
		await fs.copy('./app/img', './build-ardor/img');
		await fs.copy('./app/audio', './build-ardor/audio');
	} catch (error) {
		console.log(error);
	}
})();
