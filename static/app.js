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
  const getAvailableCells = () => {
    // console.log(`current field is: ${field[0][0].getMark()}`);
    let availableCells = [];
    for (let i = 0; i < rows; i++) {
      availableCells[i] = field[i].filter((cell) => cell.getMark() === '.');      
    }
    
    if (availableCells[0].length === 0 && availableCells[1].length === 0 && availableCells[2].length === 0) {
      return false;
    } else {
      return availableCells;
    }
    
  };

  const checkMatch = () => {

    const field = getField();

    function horizontal() {
      for (let i = 0; i < rows; i++) {        
        if (field[i][0].getMark() !== Cell().getMark()) {
          if (field[i][0].getMark() === field[i][1].getMark() && field[i][1].getMark() === field[i][2].getMark()) {
            console.log('winner is: ' + field[i][0].getMark()); 
            return field[i][0].getMark();
          }
        }        
      }
      return false;
    };

    function vertical() {
      for (let j = 0; j < columns; j++) {        
        if (field[0][j].getMark() !== Cell().getMark()) {
          if (field[0][j].getMark() === field[1][j].getMark() && field[1][j].getMark() === field[2][j].getMark()) {
            console.log('winner is: ' + field[0][j].getMark()); 
            return field[0][j].getMark();
          }
        }        
      }
      return false;
    }    

    function diagonal() {
      if (field[1][1].getMark() !== Cell().getMark()) {
        if (field[0][0].getMark() === field[1][1].getMark() && field[1][1].getMark() === field[2][2].getMark() ||
            field[0][2].getMark() === field[1][1].getMark() && field[1][1].getMark() === field[0][0].getMark()) {
          return field[1][1].getMark();
        } 
      }
      return false;
    }
    
    return horizontal() || vertical() || diagonal();    
  };
  
  const printField = () => {
    console.log(` ${field[0][0].getMark()} | ${field[0][1].getMark()} | ${field[0][2].getMark()} `);
    console.log('---+---+---');
    console.log(` ${field[1][0].getMark()} | ${field[1][1].getMark()} | ${field[1][2].getMark()} `);
    console.log('---+---+---');
    console.log(` ${field[2][0].getMark()} | ${field[2][1].getMark()} | ${field[2][2].getMark()} `);
  }
  
  return {getField, addMark, getAvailableCells, printField, checkMatch};
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
    
    const match = field.checkMatch()
    if (match) {
      const winner = (match === players[0].mark) ? players[0].name : players[1].name;
      console.log(`The winner is ${winner}!`);
    } else if (field.getAvailableCells()) {
      switchPlayer();
      printNewRound();
    } else {
      console.log("It's a tie!");
    }    
  }

  // Initial round play
  printNewRound();

  return {playRound, getActivePlayer};
}

