import wordBank from "./WordBank.txt";
export const boardDefault = [
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
	["", "", "", "", ""],
];

export const generateWordSet = async () => {
	let wordSet;
	let chosenWord;
	await fetch(wordBank)
		.then((response) => response.text())
		.then((result) => {
			const wordArr = result.split("\r\n");
			chosenWord = wordArr[Math.floor(Math.random() * wordArr.length)];
			wordSet = new Set(wordArr);
		});

	return { wordSet, chosenWord };
};
