function isSafe(board, row, col, num) {
  // Check if 'num' is not in the current row and column
  for (let x = 0; x < board.length; x++) {
    if (board[row][x] === num || board[x][col] === num) {
      return false
    }
  }
  return true
}

function getShuffledValues(length) {
  const array = Array.from({ length }, (v, i) => i + 1)
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]] // Swap elements
  }
  return array
}

function solveFutoshiki(board) {
  const size = board.length
  let emptyFound = false
  let row = -1
  let col = -1

  // Find the first empty cell
  for (let r = 0; r < size && !emptyFound; r++) {
    for (let c = 0; c < size; c++) {
      if (board[r][c] === 0) {
        // Assuming 0 represents an empty cell
        row = r
        col = c
        emptyFound = true
        break
      }
    }
  }

  // No empty cell found, puzzle solved
  if (!emptyFound) {
    return true
  }

  const numbers = getShuffledValues(size)
  // Try all possible numbers for the current cell
  for (const num of numbers) {
    // Check if placing 'num' in the current cell is safe
    if (isSafe(board, row, col, num)) {
      board[row][col] = num

      // Recursively try to fill the rest of the board
      if (solveFutoshiki(board)) {
        return true
      }

      // If placing 'num' in the current cell doesn't lead to a solution,
      // reset the cell and try the next number
      board[row][col] = 0
    }
  }

  // Trigger backtracking
  return false
}

function initializeBoard(size) {
  return Array(size)
    .fill(null)
    .map(() => Array(size).fill(0))
}

export function generateSolvedBoard({ size }) {
  size = parseInt(size)
  if (!size) return []

  let board = initializeBoard(size)

  solveFutoshiki(board)

  return board
}
