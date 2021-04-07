const monthsList = [
	'January',
	'February',
	'March',
	'April',
	'May',
	'June',
	'July',
	'August',
	'September',
	'October',
	'November',
	'December',
];

export const formatDate = (dateString) => {
	const date = new Date(dateString);
	const month = monthsList[date.getMonth()];
	const day = date.getDate();
	const year = date.getFullYear();
	return `${month} ${day}, ${year}`;
};

export const capitalize = (sentence) => {
	const word_array = sentence.split(' ');
	const cap_word_array = word_array.map((word) => {
		return word.charAt(0).toUpperCase() + word.slice(1);
	});
	const cap_sentence = cap_word_array.join(' ');
	return cap_sentence;
};

// *-*-*- DEPRECATED -*-*-*
// export const htmlParser = (htmlString) => {
// 	const parser = new DOMParser();
// 	const doc = parser.parseFromString(htmlString, 'text/html');
// 	console.log(doc.body);
// 	return doc.body;
// };
