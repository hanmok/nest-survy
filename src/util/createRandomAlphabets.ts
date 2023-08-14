const randomString = require('randomstring');

export function createRandomAlphabets(length: number): string { 
	const randomAlphabets = randomString.generate({ 
		length: length, 
		charset: 'alphabetic',
		capitalization: 'uppercase'
	})
	return randomAlphabets
}

