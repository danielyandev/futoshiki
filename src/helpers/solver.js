import { canPlaceValue } from './board.js'

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
