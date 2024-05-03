import printStats from '../src/helpers/stats.js'
import { generateSolvedBoard } from '../src/helpers/generator.js'
import { getPreparedBoard } from '../src/helpers/board.js'
import { levels } from '../src/constants.js'
import { solveWithCSP } from '../src/solvers/csp.js'

const iterations = 10

function calculateAverages(statsArray) {
  const size = statsArray.length
  let totalDuration = 0

  // Iterate over each object in the array
  statsArray.forEach(stats => {
    totalDuration += stats.duration
  })

  return {
    failures: iterations - size,
    duration: totalDuration / size
  }
}

function solveWithSettings(settings) {
  let failures = 0
  const allStats = []
  for (let i = 0; i < iterations; i++) {
    const solvedBoard = generateSolvedBoard(settings)
    const board = getPreparedBoard(solvedBoard, settings)

    const { solved, stats } = solveWithCSP(board)
    if (solved) {
      allStats.push(stats)
    } else {
      failures++
    }
  }

  const stats = calculateAverages(allStats)
  printStats({
    title: `Size ${settings.size}, Level ${levels[settings.level]}`,
    stats
  })

  return failures
}

describe('CSP solver', function () {
  describe('Size 4', function () {
    const size = 4
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })

  describe('Size 5', function () {
    const size = 5
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })

  describe('Size 6', function () {
    const size = 6
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })

  describe('Size 7', function () {
    const size = 7
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })

  describe('Size 8', function () {
    const size = 8
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })

  describe('Size 9', function () {
    const size = 9
    it('should solve easy', function () {
      solveWithSettings({ size, level: 1 })
    })
    it('should solve normal', function () {
      solveWithSettings({ size, level: 2 })
    })
    it('should solve hard', function () {
      solveWithSettings({ size, level: 3 })
    })
  })
})
