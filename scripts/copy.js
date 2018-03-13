const fs = require('fs-extra');

(async () => {
	try {
		//make sure destination folders exist
		await fs.ensureDir('./build');
		await fs.ensureDir('./build/img');
		await fs.ensureDir('./build/audio');
		//copy stuff
		await fs.copy('./app/htdocs', './build');
		await fs.copy('./app/img', './build/img');
		await fs.copy('./app/audio', './build/audio');
	} catch (error) {
		console.log(error);
	}
})();
