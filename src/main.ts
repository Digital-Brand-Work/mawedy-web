/// <reference types="@types/googlemaps" />
import {} from 'googlemaps'
import { enableProdMode } from '@angular/core'
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic'
import { environment } from 'environments/environment'
import { AppModule } from 'app/app.module'

;(window as any).Pusher = require('pusher-js')

if (environment.production) {
	enableProdMode()
}

function bootstrap() {
	platformBrowserDynamic()
		.bootstrapModule(AppModule)
		.catch((err) => console.error(err))
}

if (document.readyState === 'complete') {
	bootstrap()
} else {
	document.addEventListener('DOMContentLoaded', bootstrap)
}
