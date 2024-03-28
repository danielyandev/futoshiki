// Check if the cell at (row, col) can have the given num according to Futoshiki rules
function canPlaceValue(board, row, col, num) {
  const size = board.length
  // Check row and column uniqueness
  for (let i = 0; i < size; i++) {
    if (board[row][i].value === num || board[i][col].value === num) {
      return false // Duplicate found
    }
  }
  // Check right constraint
  if (col < size - 1 && board[row][col].constraints.right !== '') {
    let rightValue = board[row][col + 1].value
    if (
      (board[row][col].constraints.right === '>' && num <= rightValue) ||
      (board[row][col].constraints.right === '<' && num >= rightValue)
    ) {
      return false // Right constraint violated
    }
  }
  // Check bottom constraint
  if (row < size - 1 && board[row][col].constraints.bottom !== '') {
    let bottomValue = board[row + 1][col].value
    if (
      (board[row][col].constraints.bottom === '>' && num <= bottomValue) ||
      (board[row][col].constraints.bottom === '<' && num >= bottomValue)
    ) {
      return false // Bottom constraint violated
    }
  }
  // Check left constraint (the right constraint of the cell to the left)
  if (col > 0 && board[row][col - 1].constraints.right !== '') {
    if (
      (board[row][col - 1].constraints.right === '>' &&
        num >= board[row][col - 1].value) ||
      (board[row][col - 1].constraints.right === '<' &&
        num <= board[row][col - 1].value)
    ) {
      return false // Violates left cell's right constraint
    }
  }
  // Check top constraint (the bottom constraint of the cell above)
  if (row > 0 && board[row - 1][col].constraints.bottom !== '') {
    if (
      (board[row - 1][col].constraints.bottom === '>' &&
        num >= board[row - 1][col].value) ||
      (board[row - 1][col].constraints.bottom === '<' &&
        num <= board[row - 1][col].value)
    ) {
      return false // Violates above cell's bottom constraint
    }
  }
  return true // No violations, can place value
}

function findEmptySpot(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col].value === '') return [row, col]
    }
  }
  return null // No empty spots
}

export function solveWithBacktracking(
  board,
  solutionCount = { count: 0 },
  stopAfterFirstSolution = false
) {
  const size = board.length
  let emptySpot = findEmptySpot(board)
  if (!emptySpot) {
    solutionCount.count += 1 // Found a solution
    return stopAfterFirstSolution ? true : solutionCount.count === 1 // Stop if only looking for the first solution or if this is the first solution found
  }

  let [row, col] = emptySpot

  for (let num = 1; num <= size; num++) {
    if (canPlaceValue(board, row, col, num)) {
      board[row][col].value = num // Tentatively place num

      // If a solution has been found and we're not looking for more, return true
      if (solveWithBacktracking(board, solutionCount, stopAfterFirstSolution)) {
        // Stop if the first solution is found or if more than one solution has been found
        // In this case return board to insert found values into the UI board
        if (stopAfterFirstSolution || solutionCount.count > 1) return board
      }

      board[row][col].value = '' // Backtrack
    }
  }
  return false // No solution found from this path
}
