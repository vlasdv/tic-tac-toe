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

  // return empty field  
  const getField = () => field;
  
  // add player's mark
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



