const { Task } = require('./utils')
const path = require('path')
const fs = require('fs')
const archiver = require('archiver')
const packageJson = require('../package.json')
const { version } = packageJson
const { serverConfig } = require('./configs')
const fileName = `build.${version}.zip`
const buildPath = './build'
const localPackagePath = path.join(process.cwd(), fileName)
const remoteDirPath = '/data'
const remotePackagepath = path.join(remoteDirPath, fileName)

function compressPackage(inputPath, outputPath) {
	return async (ctx, next) => {
		await new Promise((resolve, reject) => {
			const archive = archiver('zip', {
				zlib: { level: 9 }
			})

			archive.on('error', err => {
				reject(err)
			})
			archive.on('end', () => {
				console.log('fulfilled - Data has been drained')
				resolve()
			})

			const output = fs.createWriteStream(outputPath)
			archive.pipe(output)
			archive.directory(inputPath)
			archive.finalize()
		})
		await next()
	}
}

function uploadPackage(localPath, remotePath) {
	return async (ctx, next) => {
		await ctx.ssh.putFile(localPath, remotePath)
		await next()
	}
}

function removeRemoteDirectory(dirname, cwd) {
	return async (ctx, next) => {
		await ctx.ssh.execCommand(`rm -rf ${dirname}`, { cwd })
		await next()
	}
}

function parseRemotePackage(fileName, cwd) {
	return async (ctx, next) => {
		await ctx.ssh.execCommand(`unzip ${fileName}`, { cwd })
		await next()
	}
}

function deleteLocalPackage(localPath) {
	return async (ctx, next) => {
		await new Promise((resolve, reject) => {
			fs.unlink(localPath, async err => {
				if (err) reject(err)
				resolve()
			})
		})
		await next()
	}
}

const task = new Task()

task
	.do(compressPackage(buildPath, localPackagePath))
	.do(uploadPackage(localPackagePath, remotePackagepath))
	.do(removeRemoteDirectory(buildPath, remoteDirPath))
	.do(parseRemotePackage(fileName, remoteDirPath))
	.do(deleteLocalPackage(localPackagePath))
	.connect(serverConfig)
	.then(
		() => {
			process.exit()
		},
		err => {
			console.error(`task execution failed: ${err}`)
		}
	)
