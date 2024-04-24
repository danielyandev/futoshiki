export function selectRandomCells(board, qty) {
  const n = board.length
  const totalCells = n * n
  let selectedCells = []

  // Ensure qty does not exceed the total number of cells in the board
  if (qty > totalCells) {
    console.warn(
      `Requested quantity (${qty}) exceeds the total number of cells (${totalCells}). Adjusting to ${totalCells}.`
    )
    qty = totalCells
  }

  // A more efficient approach when qty is a significant fraction of totalCells
  if (qty > totalCells / 2) {
    let allCells = []
    for (let row = 0; row < n; row++) {
      for (let col = 0; col < n; col++) {
        allCells.push(cellIndexToSting(row, col)) // using stings for faster checks
      }
    }
    // Shuffle allCells and select the first 'qty' elements
    allCells.sort(() => Math.random() - 0.5)
    selectedCells = allCells.slice(0, qty)
  } else {
    // If qty is small relative to totalCells, the original method is fine
    while (selectedCells.length < qty) {
      let row = Math.floor(Math.random() * n)
      let col = Math.floor(Math.random() * n)
      let cell = { row, col }

      // Check if this cell is already selected
      let isAlreadySelected = selectedCells.some(
        selectedCell =>
          selectedCell.row === cell.row && selectedCell.col === cell.col
      )

      if (!isAlreadySelected) {
        selectedCells.push(cellIndexToSting(row, col))
      }
    }
  }

  return selectedCells
}

export function cellIndexToSting(row, col) {
  return `${row},${col}`
}

export function addConstraintsBasedOnSolvedBoard(board, numConstraints) {
  const size = board.length
  const constraints = []

  // Function to check if a constraint already exists for a cell
  function constraintExists(row, col, isVertical) {
    return constraints.some(
      constraint =>
        constraint.row === row &&
        constraint.col === col &&
        constraint.isVertical === isVertical
    )
  }

  while (constraints.length < numConstraints) {
    // Randomly choose adjacent cells
    const row = Math.floor(Math.random() * size)
    const col = Math.floor(Math.random() * size)
    const isVertical = Math.random() < 0.5 // Randomly decide between vertical and horizontal adjacency
    let adjRow = isVertical ? row + 1 : row
    let adjCol = isVertical ? col : col + 1

    // Ensure the adjacent cell is within bounds
    if (adjRow >= size || adjCol >= size) continue

    // Ensure no existing constraint for these cells in this direction
    if (constraintExists(row, col, isVertical)) continue

    // Determine the direction of the constraint
    const value = board[row][col]
    const adjacentValue = board[adjRow][adjCol]
    let constraint
    if (value > adjacentValue) {
      constraint = '>'
    } else if (value < adjacentValue) {
      constraint = '<'
    } else {
      // This case should not happen in a properly solved Futoshiki board
      continue
    }

    // Add the constraint
    constraints.push({
      row,
      col,
      constraint,
      isVertical
    })
  }

  return constraints
}

export function calculatePuzzleParameters({ size, level }) {
  // level: preFilled
  const basePreFilled = {
    1: 3,
    2: 2,
    3: 1
  }
  const baseConstraints = {
    1: 3,
    2: 5,
    3: 7
  }

  const adjustmentFactorPreFilled = {
    1: 2,
    2: 1.5,
    3: 1
  }
  const adjustmentFactorConstraints = {
    1: 1,
    2: 1.5,
    3: 3
  }

  const visibleCellsCount = Math.round(
    basePreFilled[level] + (size - 4) * adjustmentFactorPreFilled[level]
  )
  const constraintsCount = Math.round(
    baseConstraints[level] + (size - 2) * adjustmentFactorConstraints[level]
  )

  return {
    visibleCellsCount,
    constraintsCount
  }
}

export function getPreparedBoard(solvedBoard, settings) {
  const { visibleCellsCount, constraintsCount } =
    calculatePuzzleParameters(settings)

  const visibleCells = selectRandomCells(solvedBoard, visibleCellsCount)
  const constraints = addConstraintsBasedOnSolvedBoard(
    solvedBoard,
    constraintsCount
  )

  return solvedBoard.map((row, rowIndex) =>
    row.map((column, columnIndex) => {
      let right = ''
      let bottom = ''

      for (const constraint of constraints) {
        if (constraint.row === rowIndex && constraint.col === columnIndex) {
          if (constraint.isVertical) {
            bottom = constraint.constraint
          } else {
            right = constraint.constraint
          }
        }
      }

      return {
        value: visibleCells.includes(cellIndexToSting(rowIndex, columnIndex))
          ? column
          : '',
        constraints: { right, bottom }
      }
    })
  )
}

export function canPlaceValue(board, row, col, num) {
  // Check row and column for duplicates
  for (let i = 0; i < board.length; i++) {
    if (i !== col && board[row][i].value === num) {
      return false
    }

    if (i !== row && board[i][col].value === num) {
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

export function findEmptyCell(board) {
  const size = board.length
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col].value === '') return [row, col]
    }
  }
  return null // No unassigned locations, puzzle solved or no solution
}

export function checkSolution(board) {
  const size = board.length
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const value = board[row][col].value
      // If a value couldn't be place in current cell return false
      if (!value || !canPlaceValue(board, row, col, value)) {
        return false
      }
    }
  }

  // Solution is correct
  return true
}

export function deepCopy(board) {
  return JSON.parse(JSON.stringify(board))
}

export function getCspSettings(board) {
  const size = board.length
  const variables = {}
  const constraints = []

  // Initialize variables and constraints for rows and columns
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      const key = `${row}_${col}`

      // Assign domain based on whether the cell is pre-filled or empty
      if (board[row][col].value === '') {
        variables[key] = Array.from({ length: size }, (_, i) => i + 1) // Domain: 1 to size
      } else {
        variables[key] = [board[row][col].value] // Domain is a single pre-filled value
      }
    }

    // Constraints for unique values in each row and column
    for (let j = 0; j < size; j++) {
      for (let k = j + 1; k < size; k++) {
        constraints.push([`${row}_${j}`, `${row}_${k}`, (a, b) => a !== b])
        constraints.push([`${j}_${row}`, `${k}_${row}`, (a, b) => a !== b])
      }
    }
  }

  // Inequality constraints
  for (let row = 0; row < size; row++) {
    for (let col = 0; col < size; col++) {
      if (board[row][col].constraints.right) {
        const rightKey = `${row}_${col + 1}`
        const constraintFunction =
          board[row][col].constraints.right === '>'
            ? (a, b) => a > b
            : (a, b) => a < b
        if (col + 1 < size) {
          constraints.push([`${row}_${col}`, rightKey, constraintFunction])
        }
      }
      if (board[row][col].constraints.bottom) {
        const bottomKey = `${row + 1}_${col}`
        const constraintFunction =
          board[row][col].constraints.bottom === '>'
            ? (a, b) => a > b
            : (a, b) => a < b
        if (row + 1 < size) {
          constraints.push([`${row}_${col}`, bottomKey, constraintFunction])
        }
      }
    }
  }

  return { variables, constraints }
}
