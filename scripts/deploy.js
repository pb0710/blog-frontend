const archiver = require('archiver')
const fs = require('fs')
const path = require('path')
const scp = require('node-scp')
const packageJson = require('../package.json')
const { serverConfig } = require('./configs')

const currentVersion = packageJson.version
const fileName = `build.${currentVersion}.zip`
const packagePath = path.join(process.cwd(), fileName)

async function scpPackageToRemote() {
	try {
		const client = await scp(serverConfig)
		await client.uploadFile(packagePath, path.join('/data', fileName))
		client.close() // remember to close connection after you finish
	} catch (err) {
		throw err
	}
}

function deleteLocalPackage() {
	fs.unlink(packagePath, err => {
		if (err) console.log(`${packagePath} - deleted errors ${err}`)
	})
}

const archive = archiver('zip', {
	zlib: { level: 9 }
})

archive.on('error', err => {
	throw err
})
archive.on('end', () => {
	console.log('END - Data has been drained')
	scpPackageToRemote().then(deleteLocalPackage).catch(console.error).finally(process.exit)
})

const output = fs.createWriteStream(packagePath)
archive.pipe(output)
archive.directory('build/')
archive.finalize()
