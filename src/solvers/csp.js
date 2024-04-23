import { getCspSettings } from '../helpers/board.js'

export function solveWithCSP(board) {
  const csp = getCspSettings(board)
  const solution = solveWithBacktracking({}, csp.variables, csp)
  if (!solution) {
    return board
  }
  return formatSolution(solution, board)
}

function formatSolution(solution, board) {
  Object.entries(solution).forEach(([key, values]) => {
    const [row, col] = key.split('_').map(Number)
    board[row][col].value = values[0]
  })
  return board
}

function solveWithBacktracking(assignedVars, remainingVars, csp) {
  let assigned = { ...assignedVars }

  if (isAssignmentComplete(remainingVars)) {
    return assigned
  }

  const variable = chooseVariable(remainingVars)
  const values = prioritizeValues(variable, assigned, remainingVars, csp)
  delete remainingVars[variable]

  for (let value of values) {
    assigned[variable] = [value]
    const constraintsSatisfied = checkConsistency(assigned, remainingVars, csp)
    let [newAssigned, newUnassigned] = updateAssignments(
      assigned,
      constraintsSatisfied
    )

    if (areDomainsEmpty(constraintsSatisfied)) {
      continue
    }
    const result = solveWithBacktracking(newAssigned, newUnassigned, csp)
    if (result) {
      return result
    }
  }

  return null
}

function isAssignmentComplete(vars) {
  return Object.keys(vars).length === 0
}

function areDomainsEmpty(checkedVars) {
  return Object.values(checkedVars).some(domain => domain.length === 0)
}

function updateAssignments(assigned, domains) {
  let newAssigned = {}
  let newUnassigned = {}

  Object.keys(domains).forEach(key => {
    if (assigned[key]) {
      newAssigned[key] = assigned[key].slice()
    } else {
      newUnassigned[key] = domains[key].slice()
    }
  })

  return [newAssigned, newUnassigned]
}

function checkConsistency(assigned, unassigned, csp) {
  let queue = csp.constraints.slice()
  let domains = mergeAssignments(assigned, unassigned)

  while (queue.length) {
    const [head, tail, constraint] = queue.shift()
    if (updateIfInconsistent(head, tail, constraint, domains)) {
      queue.push(...csp.constraints.filter(con => con[0] === tail))
    }
  }

  return domains
}

function updateIfInconsistent(head, tail, constraint, domains) {
  const validTailValues = domains[tail].filter(t =>
    domains[head].some(h => constraint(h, t))
  )

  const isUpdated = domains[tail].length !== validTailValues.length
  domains[tail] = validTailValues
  return isUpdated
}

function chooseVariable(vars) {
  // MRV
  let chosenVariable = null
  let smallestDomainSize = Infinity

  Object.keys(vars).forEach(key => {
    if (vars[key].length < smallestDomainSize) {
      chosenVariable = key
      smallestDomainSize = vars[key].length
    }
  })

  return chosenVariable
}

function prioritizeValues(variable, assigned, unassigned, csp) {
  // LCV
  let counts = {}
  unassigned[variable].forEach(value => {
    assigned[variable] = [value]
    counts[value] = countRemainingValues(assigned, unassigned, csp)
    delete assigned[variable]
  })

  return unassigned[variable].sort((a, b) => counts[a] - counts[b])
}

function countRemainingValues(assigned, unassigned, csp) {
  return Object.values(checkConsistency(assigned, unassigned, csp)).reduce(
    (sum, domain) => sum + domain.length,
    0
  )
}

function mergeAssignments(assigned, unassigned) {
  let combined = { ...unassigned }
  Object.keys(assigned).forEach(key => {
    combined[key] = assigned[key].slice()
  })
  return combined
}
