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

// *-*-*- DEPRECATED -*-*-*
// export const htmlParser = (htmlString) => {
// 	const parser = new DOMParser();
// 	const doc = parser.parseFromString(htmlString, 'text/html');
// 	console.log(doc.body);
// 	return doc.body;
// };
