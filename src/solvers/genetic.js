import { canPlaceValue, checkSolution, deepCopy } from '../helpers/board.js'
import { evaluateBoard } from './hillclimbing.js'

function initializePopulation(popSize, board) {
  let population = []
  for (let i = 0; i < popSize; i++) {
    population.push(generateIndividual(board))
  }
  return population
}

function generateIndividual(board) {
  let individual = deepCopy(board)
  individual.forEach((row, rowIndex) => {
    let numbers = Array.from({ length: board.length }, (_, i) => i + 1)

    // Shuffle numbers to randomize initial arrangement
    shuffleArray(numbers)

    row.forEach((cell, colIndex) => {
      if (cell.value === '') {
        // If cell is empty
        for (let i = 0; i < numbers.length; i++) {
          // Find a valid number
          if (canPlaceValue(individual, rowIndex, colIndex, numbers[i])) {
            individual[rowIndex][colIndex].value = numbers[i]

            // Remove the placed number from the list
            numbers.splice(i, 1)
            break
          }
        }
      }
    })
  })
  return individual
}

function selectParents(population) {
  // Tournament selection: randomly pick a few individuals and select the best out of these.
  function tournamentSelection() {
    let tournamentSize = 3
    let selected = []
    for (let i = 0; i < tournamentSize; i++) {
      let randomIndex = Math.floor(Math.random() * population.length)
      selected.push(population[randomIndex])
    }
    return selected.reduce((prev, curr) =>
      evaluateBoard(prev) > evaluateBoard(curr) ? prev : curr
    )
  }
  return [tournamentSelection(), tournamentSelection()]
}

function crossover(parent1, parent2) {
  let child = deepCopy(parent1)
  let crossoverPoint = Math.floor(Math.random() * child.length)

  // Exchange rows above the crossover point
  for (let i = 0; i < crossoverPoint; i++) {
    child[i] = deepCopy(parent2[i])
  }
  return child
}

function mutate(individual, mutationRate) {
  individual.forEach(row => {
    if (Math.random() < mutationRate) {
      let idx1 = Math.floor(Math.random() * row.length)
      let idx2 = Math.floor(Math.random() * row.length)
      while (idx1 === idx2) {
        // Ensure two different indices
        idx2 = Math.floor(Math.random() * row.length)
      }
      // Swap two values
      let temp = row[idx1].value
      row[idx1].value = row[idx2].value
      row[idx2].value = temp
    }
  })
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    // Random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1))
    // Swap elements
    ;[array[i], array[j]] = [array[j], array[i]]
  }
}

export function solveWithGeneticAlgorithm(board) {
  const boardCopy = deepCopy(board)
  for (let i = 0; i < 20; i++) {
    console.log('Genetic algorithm solving iteration: ', i)
    const solution = geneticAlgorithm(boardCopy)
    if (checkSolution(solution)) {
      return solution
    }
  }

  return board
}

function geneticAlgorithm(board) {
  const popSize = board.length * 10
  const mutationRate = board.length * 0.01
  const generations = board.length * 50

  let population = initializePopulation(popSize, board)
  let bestSolution = population[0]

  for (let gen = 0; gen < generations; gen++) {
    let newPopulation = []
    for (let i = 0; i < popSize; i++) {
      let [parent1, parent2] = selectParents(population)
      let child = crossover(parent1, parent2)
      mutate(child, mutationRate)
      newPopulation.push(child)
    }

    population = newPopulation.map(ind => ({ ind, fit: evaluateBoard(ind) }))
    population.sort((a, b) => b.fit - a.fit)

    // Select the best fit individuals
    population = population.map(p => p.ind)

    if (evaluateBoard(population[0]) > evaluateBoard(bestSolution)) {
      bestSolution = population[0]
    }
  }

  return bestSolution
}
