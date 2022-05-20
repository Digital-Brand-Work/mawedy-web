import { Injectable } from '@angular/core'
import { Meta, Title } from '@angular/platform-browser'

@Injectable({ providedIn: 'root' })
export class SeoService {
	constructor(private meta: Meta, private titleService: Title) {}

	default() {
		return {
			title: 'Mawedy',
			description: 'Helping people for better health.',
			image: './assets/app/logo.jpg',
			slug: '',
		}
	}

	generateTags(tags: {
		title?: string
		description?: string
		image?: string
		slug?: string
	}) {
		tags = {
			title: 'Mawedy',
			description: 'Helping people for better health.',
			image: './assets/app/logo.jpg',
			slug: '',
			...tags,
		}

		this.titleService.setTitle(tags.title!)

		this.setTwitterMeta(tags)

		this.setOGMeta(tags)
	}

	setOGMeta(tags: any) {
		this.meta.updateTag({
			name: 'og:type',
			content: 'Website',
		})

		this.meta.updateTag({
			name: 'og:type',
			content: 'website',
		})

		this.meta.updateTag({
			name: 'og:site_name',
			content: 'Mawedy',
		})

		this.meta.updateTag({
			name: 'og:title',
			content: tags.title,
		})

		this.meta.updateTag({
			name: 'og:description',
			content: tags.description,
		})

		this.meta.updateTag({
			name: 'og:image',
			content: tags.image,
		})
	}

	setTwitterMeta(tags: any) {
		this.meta.updateTag({
			name: 'twitter:card',
			content: 'summary',
		})

		this.meta.updateTag({
			name: 'twitter:site',
			content: 'Mawedy',
		})

		this.meta.updateTag({
			name: 'twitter:title',
			content: tags.title,
		})

		this.meta.updateTag({
			name: 'twitter:description',
			content: tags.description,
		})

		this.meta.updateTag({
			name: 'twitter:image',
			content: tags.image,
		})
	}
}
