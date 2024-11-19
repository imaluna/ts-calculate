var text = `0.97725 0.97778 0.97831 0.97882
0.97932 0.97982 0.98030 0.98077 0.98124 0.98169`;

const list = text.match(/\d+\.\d+/g);
console.log(list.length);
const res = [];
list.forEach((item, index) => {
	const key = Math.floor(index / 10);
	const obj = res[key] || {};
	console.log(key);
	obj[`0.0${index % 10}`] = +item;
	res[key] = obj;
});
console.log(res);
