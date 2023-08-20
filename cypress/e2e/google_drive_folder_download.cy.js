describe('Download Google Drive folder', () => {
	const downloadsFolder = Cypress.config('downloadsFolder')
	const driveFolderId = Cypress.env('driveFolderId')
	const maxDownloadTime = Cypress.env('maxDownloadTimeSeconds')

	it('zip download complete', () => {
		cy.visit(driveFolderId)

		// 5 secs to let the link show on page
		cy.contains("Download all", { timeout: 5*1000}).click()
		cy.task('log', 'Google preparing zip bundle..')

		// 10 mins to let Google prepare download link
		cy.contains("1 file zipped", { timeout: 10*60*1000 })
		cy.task('log', 'ZIP file download started')

		// wait until full zip file is downloaded
		cy.task('downloadComplete', downloadsFolder, { timeout: maxDownloadTime * 1000 })
			.then(result => {
				result && cy.task('log', 'DONE. Download folder: ' + downloadsFolder)
				expect(result).to.be.true
			})
	})
})
