function canPlaceValue(board, row, col, num) {
  // Check row and column for duplicates
  for (let i = 0; i < board.length; i++) {
    if (board[row][i].value === num || board[i][col].value === num) {
      return false
    }
  }

  // Check right constraint
  if (
    board[row][col].constraints.right === '>' &&
    col + 1 < board.length &&
    num <= board[row][col + 1].value
  )
    return false
  if (
    board[row][col].constraints.right === '<' &&
    col + 1 < board.length &&
    num >= board[row][col + 1].value
  )
    return false

  // Check bottom constraint
  if (
    board[row][col].constraints.bottom === '>' &&
    row + 1 < board.length &&
    num <= board[row + 1][col].value
  )
    return false
  if (
    board[row][col].constraints.bottom === '<' &&
    row + 1 < board.length &&
    num >= board[row + 1][col].value
  )
    return false

  // Check constraints of the left cell related to the current cell
  if (col > 0) {
    if (
      board[row][col - 1].constraints.right === '>' &&
      board[row][col - 1].value <= num
    )
      return false
    if (
      board[row][col - 1].constraints.right === '<' &&
      board[row][col - 1].value >= num
    )
      return false
  }

  // Check constraints of the top cell related to the current cell
  if (row > 0) {
    if (
      board[row - 1][col].constraints.bottom === '>' &&
      board[row - 1][col].value <= num
    )
      return false
    if (
      board[row - 1][col].constraints.bottom === '<' &&
      board[row - 1][col].value >= num
    )
      return false
  }

  return true
}

export function solveWithBacktracking(board, cellIndex = 0) {
  if (cellIndex === board.length * board.length) {
    // All cells filled; solution found
    return board
  }

  const row = Math.floor(cellIndex / board.length)
  const col = cellIndex % board.length

  if (board[row][col].value !== '') {
    // Cell already has a clue; skip to the next cell
    return solveWithBacktracking(board, cellIndex + 1)
  }

  for (let num = 1; num <= board.length; num++) {
    if (canPlaceValue(board, row, col, num)) {
      board[row][col].value = num
      if (solveWithBacktracking(board, cellIndex + 1)) {
        return board
      }
      // Backtrack
      board[row][col].value = ''
    }
  }

  // No valid number found for this cell; backtrack
  return false
}
