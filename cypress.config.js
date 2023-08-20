const fs = require('fs')
const { defineConfig } = require('cypress')
const { execSync } = require('child_process')

const appTasks = {
	downloadComplete(fdr) {
		return new Promise((resolve, reject) => {
			try {
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
				console.log(err)
				resolve(false)
			}
		})
	},
	log(msg) {
		console.log(`\t :: ${msg}`)
		return null
	}
}

module.exports = defineConfig({
  e2e: {
		baseUrl: 'https://drive.google.com/drive/folders/',
		watchForFileChanges: false,
		video: false,
		setupNodeEvents(on, config) {
			on('task', appTasks)
		},
		env: {
			max_download_time_secs: 30*60
		}
  }
})
