function Field() {
  const rows = 3;
  const columns = 3;
  const field = [];
  for (let i = 0; i < rows; i++) {
    field[i] = [];
    for (let j = 0; j < columns; j++) {
      field[i][j] = ' ';
    }
  }

  // Return empty field  
  const getField = () => field;
  
  // Add player's mark
  const addMark = (mark, row, column) => field[row, column] = mark;

  // O | O | X
  // –-+-–-+-–
  // X | X | O
  // ––+–––+––
  // O | X | O

  const printField = () => {
    console.log();
  }
  
  return {getField, addMark, printField};
}

function Cell() {
  let value = 0;

  // Add player's mark to the cell
  const addValue = (mark) => {
    value = mark;
  };
  
  const getValue = () => value;

  return {addMark, getValue};
}

function GameController(playerOneName = 'Human', playerTwoName = 'Computer') {
  const field = Field();

  const players = [
    {
      name: playerOneName,
      mark: 'X'
    },
    {
      name: playerTwoName,
      mark: 'O'
    }
  ];

  let activePlayer = players[0];
  const switchPlayer = () => activePlayer = (activePlayer === players[0]) ? players[1] : players[0];
  const getActivePlayer = () => activePlayer;
  
  // print current round:
  // current field status
  // player's name
  const printNewRound = () => {
    field.printField();
    console.log(`${getActivePlayer}'s turn.`);
  }
  
  // play round (row, column):
  // add player's mark to chosen row:column
  const playRound = (row, column) => {
    console.log(`Adding ${activePlayer}'s mark to ${row}:${column}...`);
    field.addMark(activePlayer.mark, row, column);    

    switchPlayer();
    printNewRound();
  }

  // Initial round play
  printNewRound();

  return {playRound, getActivePlayer};
}

