function Field() {
  const rows = 3;
  const columns = 3;
  const field = [];
  for (let i = 0; i < rows; i++) {
    field[i] = [];
    for (let j = 0; j < columns; j++) {      
      field[i][j] = Cell(i, j);      
    }
  }  

  // Return empty field  
  const getField = () => field;
  
  // Add player's mark
  const addMark = (mark, row, column) => field[row][column].addMark(mark);

  // Get available cells 
  // const getAvailableCells = () => field.filter((cell) => cell.getMark() !== ' ');
  const getAvailableCells = () => {
    // console.log(`current field is: ${field[0][0].getMark()}`);
    let availableCells = [];
    for (let i = 0; i < rows; i++) {
      availableCells[i] = field[i].filter((cell) => cell.getMark() === '.');      
    }
    return availableCells;
  };

  // O | O | X
  // –-+-–-+-–
  // X | X | O
  // ––+–––+––
  // O | X | O

  const printField = () => {
    console.log(` ${field[0][0].getMark()} | ${field[0][1].getMark()} | ${field[0][2].getMark()} `);
    console.log('---+---+---');
    console.log(` ${field[1][0].getMark()} | ${field[1][1].getMark()} | ${field[1][2].getMark()} `);
    console.log('---+---+---');
    console.log(` ${field[2][0].getMark()} | ${field[2][1].getMark()} | ${field[2][2].getMark()} `);
  }
  
  return {getField, addMark, getAvailableCells, printField};
}

function Cell(cellRow, cellColumn) {
  let mark = '.';
  const row = cellRow;
  const column = cellColumn;

  // Add player's mark to the cell
  const addMark = (newMark) => {
    mark = newMark;
  };
  const getMark = () => mark;
  const getPosition = () => ({ row, column });

  return {addMark, getMark, getPosition};
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
    field.getAvailableCells().forEach( (row) => row.forEach( (cell) => console.log(cell.getPosition())));
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

