export const slugify = (text: string) => {
	return text
		.toString() // Cast to string
		.toLowerCase() // Convert the string to lowercase letters
		.normalize('NFD') // The normalize() method returns the Unicode Normalization Form of a given string.
		.trim() // Remove whitespace from both sides of a string
		.replace(/\s+/g, '_') // Replace spaces with -
		.replace(/[^\w\-]+/g, '') // Remove all non-word chars
		.replace(/\-\-+/g, '_') // Replace multiple - with single -
}

export const slugToSentence = (slug: string) => {
	return slug.split('_').join(' ')
}
