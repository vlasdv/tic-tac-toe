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
  const addMark = (mark, row, column) => field[row][column] = mark;

  // O | O | X
  // –-+-–-+-–
  // X | X | O
  // ––+–––+––
  // O | X | O

  const printField = () => {
    console.log(` ${field[0][0]} | ${field[0][1]} | ${field[0][2]} `);
    console.log('---+---+---');
    console.log(` ${field[1][0]} | ${field[1][1]} | ${field[1][2]} `);
    console.log('---+---+---');
    console.log(` ${field[2][0]} | ${field[2][1]} | ${field[2][2]} `);
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
    console.log(`${getActivePlayer().name}'s turn.`);
  }
  
  // play round (row, column):
  // add player's mark to chosen row:column
  const playRound = (row, column) => {
    console.log(`Adding ${getActivePlayer().name}'s mark to ${row}:${column}...`);
    field.addMark(getActivePlayer().mark, row, column);    

    switchPlayer();
    printNewRound();
  }

  // Initial round play
  printNewRound();

  return {playRound, getActivePlayer};
}

