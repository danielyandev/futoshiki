# Futoshiki puzzle

## Demo
[http://futoshiki-ai-solver.s3-website-us-east-1.amazonaws.com](http://futoshiki-ai-solver.s3-website-us-east-1.amazonaws.com)

## Run locally

```
npm run dev
```

## Content

This project offers a Futoshiki puzzle with sizes 4, 5, 6, 7, 8, 9,
and difficulty levels Easy, Normal, Hard.
You can try to solve it manually and then check the result.

There are 4 algorithms that can be used to solve the puzzle.

The best is Backtracking, others may perform bad on larger puzzles, or not solve at all.

## Tests
Tests were written for each solver, size and difficulty.
They do not test the results, but log the statistics to check average results.
You can adjust iterations variable to gather statistics based on more solutions.

<b>Note:</b> It is not recommended to run all tests, because larger sizes take too long to complete.
Run each test separately, or size by size instead.

## Enjoy this cool game
