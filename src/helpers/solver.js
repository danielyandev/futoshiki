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
    board[row][col + 1].value &&
    num <= board[row][col + 1].value
  )
    return false
  if (
    board[row][col].constraints.right === '<' &&
    col + 1 < board.length &&
    board[row][col + 1].value &&
    num >= board[row][col + 1].value
  )
    return false

  // Check bottom constraint
  if (
    board[row][col].constraints.bottom === '>' &&
    row + 1 < board.length &&
    board[row + 1][col].value &&
    num <= board[row + 1][col].value
  )
    return false
  if (
    board[row][col].constraints.bottom === '<' &&
    row + 1 < board.length &&
    board[row + 1][col].value &&
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

function findEmptyCell(board) {
  const size = board.length
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col].value === '') return [row, col]
    }
  }
  return null // No unassigned locations, puzzle solved or no solution
}

export function solveWithBacktracking(board) {
  const size = board.length
  let emptyCell = findEmptyCell(board)

  if (!emptyCell) {
    return true // Puzzle solved
  }
  const [row, col] = emptyCell

  for (let num = 1; num <= size; num++) {
    if (canPlaceValue(board, row, col, num)) {
      board[row][col].value = num // Try this number
      if (solveWithBacktracking(board)) return true // If it leads to a solution, return true

      board[row][col].value = '' // Otherwise, reset and backtrack
    }
  }
  return false // Trigger backtracking
}
