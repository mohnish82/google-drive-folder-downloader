const fs = require('fs')
const { defineConfig } = require('cypress')
const { execSync } = require('child_process')

const appTasks = {
	downloadComplete(fdr) {
		return new Promise((resolve, reject) => {
			try {
				console.log('download folder: ', fdr)
				while (true) {
					const partialFilesExist = fs.readdirSync(fdr)
									.filter(f => !f.endsWith('.zip'))
									.length > 0;

					const zipFilesExist = fs.readdirSync(fdr)
									.filter(f => f.endsWith('.zip'))
									.length > 0;

					if (zipFilesExist && !partialFilesExist) {
						resolve(true)
						return
					}

					execSync('sleep 2')
				}
				resolve(false)
			} catch (err) {
				console.log(`\t :: ${err}`)
				resolve(false)
			}
		})
	},
	log(msg) {
		console.log(msg)
		return null
	}
}

module.exports = defineConfig({
  e2e: {
	baseUrl: 'https://drive.google.com/drive/folders/',
	watchForFileChanges: false,
	taskTimeout: 30*60*1000,
	video: false,
    setupNodeEvents(on, config) {
		on('task', appTasks)
    }
  }
})
