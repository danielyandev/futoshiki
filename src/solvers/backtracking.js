import { canPlaceValue, findEmptyCell } from '../helpers/board.js'

export function solveWithBacktracking(
  board,
  stats = { calls: 0, backtracks: 0, startTime: performance.now() }
) {
  const size = board.length
  stats.calls++

  let emptyCell = findEmptyCell(board)
  if (!emptyCell) {
    return {
      solved: true,
      stats: {
        ...stats,
        duration: performance.now() - stats.startTime
      }
    } // Puzzle solved
  }

  const [row, col] = emptyCell

  for (let num = 1; num <= size; num++) {
    if (canPlaceValue(board, row, col, num)) {
      board[row][col].value = num // Try this number

      let result = solveWithBacktracking(board, stats)
      if (result.solved) return result

      board[row][col].value = '' // Otherwise, reset and backtrack
      stats.backtracks++
    }
  }

  return {
    solved: false,
    stats: {
      ...stats,
      duration: performance.now() - stats.startTime
    }
  } // Trigger backtracking
}
