export const getClasses = classes => {
	// filter classes by removing empty lines and merging them into one line with spaces
	return classes
		.filter(item => item !== '')
		.join(' ')
		.trim()
}
