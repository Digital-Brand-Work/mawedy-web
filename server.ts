import 'zone.js/dist/zone-node'
import { ngExpressEngine } from '@nguniversal/express-engine'
import * as express from 'express'
import { AppServerModule } from './src/main.server'
import { APP_BASE_HREF } from '@angular/common'
import { existsSync } from 'fs'
import { createWindow } from 'domino'
import { join } from 'path'
import { applyDomino } from '@ntegral/ngx-universal-window'

export function app(): express.Express {
	const server = express()

	const MockBrowser = require('mock-browser').mocks.MockBrowser

	const distFolder = join(process.cwd(), 'dist/mawedy/browser/')

	applyDomino(global, join(distFolder, 'index.html'))

	const indexHtml = existsSync(join(distFolder, 'index.html'))
		? 'index.original.html'
		: 'index.html'

	const mock = new MockBrowser()

	const win = createWindow(indexHtml)

	global['window'] = mock.getWindow()

	global['localStorage'] = localStorage

	global['navigator'] = win.navigator

	server.engine(
		'html',
		ngExpressEngine({
			bootstrap: AppServerModule,
		}),
	)

	server.set('view engine', 'html')

	server.set('views', distFolder)

	server.get('/robots.txt', (req, res) => {
		const robotsPath = `${distFolder}/robots.txt`

		res.type('text/plain')

		res.sendFile(robotsPath)
	})

	server.get(
		'*.*',
		express.static(distFolder, {
			maxAge: '1y',
		}),
	)

	server.get('*', (req, res) => {
		res.render(indexHtml, {
			req,
			providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }],
		})
	})

	return server
}

function run(): void {
	const port = process.env['PORT'] || 4000

	const server = app()

	server.listen(port, () => {
		console.log(`Node Express server listening on http://localhost:${port}`)
	})
}

declare const __non_webpack_require__: NodeRequire

const mainModule = __non_webpack_require__.main

const moduleFilename = (mainModule && mainModule.filename) || ''

if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
	run()
}

export * from './src/main.server'
