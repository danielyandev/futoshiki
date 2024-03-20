export default function Info() {
  return (
    <div className="small">
      <h6>Rules</h6>
      <p>
        Futoshiki is a board-based puzzle game, also known under the name
        Unequal. It is playable on a square board having a given fixed size (4x4
        for example).
      </p>
      <p>
        The purpose of the game is to discover the digits hidden inside the
        board's cells; each cell is filled with a digit between 1 and the
        board's size. On each row and column each digit appears exactly once;
        therefore, when revealed, the digits of the board form a so-called Latin
        square.
      </p>
      <p>
        At the beginning of the game some digits might be revealed. The board
        might also contain some inequalities between the board cells; these
        inequalities must be respected and can be used as clues in order to
        discover the remaining hidden digits.
      </p>
      <p>
        Each puzzle is guaranteed to have a solution and only one. In order to
        indicate a move, click the desired square and select a digit or the
        delete sign (X); you can also use the digits on your keyboard (in this
        case, the digit 0 is equivalent to the delete sign).
      </p>
      <p>
        For tips and tricks, you can check out a tutorial:
        <a href="https://www.futoshiki.com/how-to-solve" target="_blank">
          {' '}
          how to solve a Futoshiki puzzle.
        </a>
      </p>
    </div>
  )
}
