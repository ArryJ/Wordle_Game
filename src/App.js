import "./App.css";
import Board from "./components/Board";
import Keyboard from "./components/Keyboard";
import GameOver from "./components/GameOver";
import { createContext, useEffect, useState } from "react";
import { boardDefault } from "./Words";
import { generateWordSet } from "./Words";
export const AppContext = createContext();

function App() {
	const [board, setBoard] = useState(boardDefault);
	const [currAttempt, setCurrAttempt] = useState({ attempt: 0, letterPos: 0 });
	const [wordSet, setWordSet] = useState(new Set());
	const [disabledLetters, setDisabledLetters] = useState([]);
	const [correctWord, setCorrectWord] = useState("");
	const [gameOver, setGameOver] = useState({
		gameOver: false,
		guessedWord: false,
	});

	useEffect(() => {
		generateWordSet().then((words) => {
			setWordSet(words.wordSet);
			setCorrectWord(words.chosenWord.toUpperCase());
		});
	}, []);

	const onSelectLetter = (keyVal) => {
		if (currAttempt.letterPos > 4) return;
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.letterPos] = keyVal;
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos + 1 });
		setBoard(newBoard);
	};
	const onDelete = () => {
		const newBoard = [...board];
		newBoard[currAttempt.attempt][currAttempt.letterPos - 1] = "";
		setCurrAttempt({ ...currAttempt, letterPos: currAttempt.letterPos - 1 });
		setBoard(newBoard);
	};
	const onEnter = () => {
		if (currAttempt.letterPos !== 5) return;
		let currWord = "";
		for (let i = 0; i < 5; i++) {
			currWord += board[currAttempt.attempt][i];
		}

		currWord = currWord.toLowerCase();
		if (wordSet.has(currWord)) {
			setCurrAttempt({ attempt: currAttempt.attempt + 1, letterPos: 0 });
		} else {
			alert("Word not in the Word List");
		}
		if (currWord === correctWord.toLowerCase()) {
			setGameOver({ gameOver: true, guessedWord: true });
			return;
		}
		if (currAttempt.attempt === 5 && wordSet.has(currWord)) {
			setGameOver({ gameOver: true, guessedWord: false });
			return;
		}
	};

	return (
		<div className="App">
			<nav>
				<h1>Wordle</h1>
			</nav>
			<AppContext.Provider
				value={{
					board,
					setBoard,
					currAttempt,
					setCurrAttempt,
					onSelectLetter,
					onEnter,
					onDelete,
					correctWord,
					disabledLetters,
					setDisabledLetters,
					gameOver,
					setGameOver,
				}}
			>
				<div className="game">
					<Board />
					{gameOver.gameOver ? <GameOver /> : <Keyboard />}
				</div>
			</AppContext.Provider>
		</div>
	);
}

export default App;
