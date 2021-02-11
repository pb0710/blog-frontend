const { NodeSSH } = require('node-ssh')

function compose(middlewares) {
	return ctx => {
		function disaptch(i) {
			if (i >= middlewares.length) return Promise.resolve()

			const fn = middlewares[i]
			if (!fn) return Promise.resolve()

			const next = () => disaptch(i + 1)
			try {
				const result = fn(ctx, next)
				return Promise.resolve(result)
			} catch (error) {
				return Promise.reject(error)
			}
		}
		return disaptch(0)
	}
}

class Task {
	constructor() {
		this.ctx = Object.create(null)
		this.tasks = []
	}

	do(task) {
		if (typeof task !== 'function') return
		this.tasks.push(task)
		return this
	}

	connect(config) {
		return new Promise((resolve, reject) => {
			const fn = compose(this.tasks)
			this.ctx.ssh = new NodeSSH()
			this.ctx.ssh.connect(config).then(() => {
				fn(this.ctx).then(resolve, reject)
			}, reject)
		})
	}
}

module.exports = { Task }
