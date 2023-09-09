import { Direction, FieldValue, Winer } from '../../store/game.slice';

export const isAllEqual = (arr: FieldValue[]): boolean => {
  return new Set(arr).size === 1 && arr.some((el) => el !== FieldValue.NULL);
};

export const checkDiagonals = (board: FieldValue[][]): number => {
  const firstDiagonalValues: FieldValue[] = [];
  const secondDiagonalValues: FieldValue[] = [];
  const n = board.length;

  for (
    let firstDiagonalCol = 0, secondDiagonalCol = n - 1, row = 0;
    firstDiagonalCol < n && secondDiagonalCol > -1;
    firstDiagonalCol++, row++, secondDiagonalCol--
  ) {
    firstDiagonalValues.push(board[row][firstDiagonalCol]);
    secondDiagonalValues.push(board[row][secondDiagonalCol]);
  }

  if (isAllEqual(firstDiagonalValues)) return 0;
  if (isAllEqual(secondDiagonalValues)) return n - 1;

  return NaN;
};

export const isInDiagonal = (n: number, diagonalIndex: number, colIndex: number, rowIndex: number): boolean => {
  if (diagonalIndex === 0) return colIndex === rowIndex;

  const secondDiagonalIndexes = new Set<string>();

  for (let i = 0, j = n - 1; i < n && j > -1; i++, j--) {
    secondDiagonalIndexes.add(`${i}_${j}`);
  }

  return secondDiagonalIndexes.has(`${rowIndex}_${colIndex}`);
};

export const transposeBoard = (board: FieldValue[][]): FieldValue[][] => {
  return board[0].map((_, i) => board.map((row) => row[i]));
};

export const emptyBoard = (n: number): FieldValue[][] => {
  return [...Array(n)].map((row) => Array(n).fill(FieldValue.NULL));
};

export const isBoardFilled = (board: FieldValue[][]): boolean => {
  return !board.some((row) => row.some((field) => field === FieldValue.NULL));
};

export const findWiner = (board: FieldValue[][]): Winer | null => {
  const n = board.length;
  const transposedBoard = transposeBoard(board);

  // check rows and columns
  for (let i = 0; i < n; i++) {
    const row = board[i];
    const column = transposedBoard[i];

    if (row[0] && isAllEqual(row)) {
      return {
        value: row[0],
        direction: Direction.HORIZONTAL,
        directionIndex: i,
      };
    }

    if (column[0] && isAllEqual(column)) {
      return {
        value: column[0],
        direction: Direction.VERTICAL,
        directionIndex: i,
      };
    }
  }

  const diagonalStartIndex = checkDiagonals(board);
  const value = Number.isNaN(diagonalStartIndex) ? null : board[0][diagonalStartIndex];

  if (value) {
    return {
      value,
      direction: Direction.DIAGONAL,
      directionIndex: diagonalStartIndex,
    };
  }

  return null;
};
