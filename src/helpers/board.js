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
