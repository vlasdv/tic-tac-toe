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
    return field.flat().filter(cell => cell.getMark() === '.');
  };

  const checkMatch = () => {

    // const field = getField();

    function horizontal() {
      for (let i = 0; i < rows; i++) {        
        if (field[i][0].getMark() !== Cell().getMark()) {
          if (field[i][0].getMark() === field[i][1].getMark() && field[i][1].getMark() === field[i][2].getMark()) {            
            winningCombo = [`b${i}0`, `b${i}1`, `b${i}2`];            
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
            winningCombo = [`b0${j}`, `b1${j}`, `b2${j}`];
            console.log('winner is: ' + field[0][j].getMark()); 
            return field[0][j].getMark();
          }
        }        
      }
      return false;
    }    

    function diagonal() {
      if (field[1][1].getMark() !== Cell().getMark()) {
        if (field[0][0].getMark() === field[1][1].getMark() && field[1][1].getMark() === field[2][2].getMark()) {
          winningCombo = ["b00", "b11", "b22"];
          return field[1][1].getMark();
        } else if (field[0][2].getMark() === field[1][1].getMark() && field[1][1].getMark() === field[2][0].getMark()) {
          winningCombo = ["b02", "b11", "b20"];         
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
    const currentButton = document.querySelector(`#b${row}${column}`);
    currentButton.textContent = newMark;
  };
  const getMark = () => mark;
  const getPosition = () => ({ row, column });

  return {addMark, getMark, getPosition};
}

function GameController(playerOneName='X', playerTwoName='O') {
  let field = Field();

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
    const currentTurnText = `${getActivePlayer().name}'s turn.`;
    console.log(currentTurnText);    

    const gameStatus = document.querySelector(".game-status");
    gameStatus.textContent = currentTurnText;
  }
  
  // play round (row, column):
  // add player's mark to chosen row:column
  const playRound = (row, column) => {
    console.log(`Adding ${getActivePlayer().name}'s mark to ${row}:${column}...`);    
    console.log("Available cells: " + field.getAvailableCells());
    
    const currentCell = field.getField()[row][column];
    const gameStatus = document.querySelector(".game-status");

    if (currentCell.getMark() === Cell().getMark()) {
      // Place player's mark on the field:
      field.addMark(getActivePlayer().mark, row, column);
      
      // Check if there is a match:
      const match = field.checkMatch()      
      if (match) {
        const winner = (match === players[0].mark) ? players[0].name : players[1].name;
        const winnerText = `The winner is ${winner}!`;                
        gameStatus.textContent = winnerText;
        disableButtons();

      // If there is no match, but there are still available cells:  
      } else if (field.getAvailableCells().length > 0) {  
        switchPlayer();
        printNewRound();
            
      } else {
        const tieText = "It's a tie!";
        console.log(tieText);
        
        gameStatus.textContent = tieText;
        disableButtons();        
      }  
    } else {
      console.log('This cell was already used, try another one');
      printNewRound();   
    }  
  }

  const startOver = () => {
    game = GameController();
    winningCombo = [];
  }

  // Initial round play
  printNewRound();

  return {playRound, getActivePlayer, startOver};
}

function setupInterface() {
  const fieldContainer = document.querySelector('.field');

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      const button = document.createElement('button');
      button.className = 'field-buttons';
      button.id = `b${i}${j}`;
      button.textContent = "\u2060";
      console.log(`Button ${button.id} created`);
      fieldContainer.appendChild(button);

      button.addEventListener('click', () => {
        const row = +button.id.charAt(1);
        const column = +button.id.charAt(2);
        console.log(`row: ${row}, column: ${column}`);
        
        game.playRound(row, column);
      });
    }
  }  

  const restart = document.querySelector(".restart")
  restart.addEventListener('click', () => {
    game.startOver();    

    const fieldContainer = document.querySelector(".field");
    fieldContainer.replaceChildren();
    setupInterface();
  })
}

function disableButtons() {
  let winningButtons = [];
  winningCombo.forEach((id) => {
    winningButtons.push(document.querySelector(`#${id}`));
  });
  const buttons = document.querySelectorAll(".field-buttons");
  buttons.forEach((button) => {
    button.disabled = true;
    if (winningButtons.includes(button)) {
      button.classList.add("winner-buttons");
    }            
  });
}

let winningCombo = [];
let game = GameController();
setupInterface();