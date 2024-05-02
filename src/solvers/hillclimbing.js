import { canPlaceValue, deepCopy, findEmptyCell } from '../helpers/board.js'

export function evaluateBoard(board) {
  let score = 0
  const size = board.length

  // Check for unique values in rows and columns and for constraint satisfaction
  for (let i = 0; i < size; i++) {
    let rowValues = new Set()
    let colValues = new Set()
    for (let j = 0; j < size; j++) {
      const rowValue = board[i][j].value
      const colValue = board[j][i].value

      if (rowValue !== '') {
        rowValues.add(rowValue)
        if (canPlaceValue(board, i, j, rowValue)) {
          score++ // Reward for legal placements
        }
      }
      if (colValue !== '') {
        colValues.add(colValue)
      }
    }
    // Reward for each unique value in row and column
    score += rowValues.size
    score += colValues.size
  }

  return score
}

function getNeighbor(board) {
  let newBoard = deepCopy(board)
  let emptyCell = findEmptyCell(newBoard)

  if (!emptyCell) return newBoard // No changes if no empty cell is found

  let row = emptyCell[0]
  let col = emptyCell[1]
  let possibleValues = Array.from(
    { length: board.length },
    (_, i) => i + 1
  ).filter(val => canPlaceValue(newBoard, row, col, val))

  if (possibleValues.length > 0) {
    newBoard[row][col].value =
      possibleValues[Math.floor(Math.random() * possibleValues.length)]
    return newBoard
  }

  return board // Return original if no valid move found
}

export function solveWithHillClimbing(board, maxAttempts = 3000) {
  const maxScore = 3 * board.length * board.length
  let currentScore = 0
  let currentBoard = board
  let attempts = 0
  let highestScore = 0
  let duration = 0

  const startTime = performance.now()

  while (currentScore < maxScore && attempts <= maxAttempts) {
    const solved = solve(board)
    currentScore = solved.score
    currentBoard = solved.board

    highestScore = Math.max(highestScore, currentScore)
    if (currentScore === maxScore) {
      duration = performance.now() - startTime
      return {
        solved: true,
        board: currentBoard,
        stats: { attempts, highestScore, duration }
      }
    }

    attempts++
  }

  duration = performance.now() - startTime
  return {
    solved: false,
    board,
    stats: { attempts, highestScore, duration }
  }
}

export function solve(board) {
  let currentBoard = board
  let currentScore = evaluateBoard(currentBoard)

  for (let iteration = 0; iteration < 1000; iteration++) {
    let newBoard = getNeighbor(currentBoard)
    let newScore = evaluateBoard(newBoard)

    if (newScore > currentScore) {
      currentBoard = newBoard
      currentScore = newScore
    }
  }

  return { board: currentBoard, score: currentScore }
}
