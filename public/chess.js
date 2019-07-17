importScripts('chess.min.js');

const chess = new Chess();

const COLORS = {
  WHITE: 'w',
  BLACK: 'b'
};

const POINTS = {
  k: 1,
  p: 1,
  n: 3,
  b: 3,
  r: 5,
  q: 9
};

function move(move) {
  chess.move(move);
}

function makeComputerMove(options) {
  const move = calculateBestMove(options);

  chess.move(move);

  postMessage({
    type: 'move',
    payload: move
  });
}

function evaluate() {
  return chess.SQUARES.reduce((score, square) => {
    const piece = chess.get(square);

    if (!piece) return score;

    const { type, color } = piece;
    const value = POINTS[type];

    return color === COLORS.WHITE
      ? score + value
      : score - value;
  }, 0);
}

function calculateBestMove({ depth, isWhite }) {
  let bestMove;
  let bestEvaluation;
  let isBetterEvaluation;

  if (isWhite) {
    bestEvaluation = -Infinity;
    isBetterEvaluation = evaluation => bestEvaluation < evaluation;
  } else {
    bestEvaluation = Infinity;
    isBetterEvaluation = evaluation => bestEvaluation > evaluation;
  }

  chess.moves().forEach((move) => {
    chess.move(move);

    const evaluation = calculateBestEvaluation({
      depth: depth - 1,
      isWhite: !isWhite
    });

    if (isBetterEvaluation(evaluation)) {
      bestEvaluation = evaluation;
      bestMove = move;
    }

    chess.undo();
  });

  return bestMove;
}

function calculateBestEvaluation({ depth, isWhite }) {
  if (depth === 0 || chess.game_over()) {
    return evaluate();
  }

  let bestEvaluation;
  let isBetterEvaluation;

  if (isWhite) {
    bestEvaluation = -Infinity;
    isBetterEvaluation = evaluation => bestEvaluation < evaluation;
  } else {
    bestEvaluation = Infinity;
    isBetterEvaluation = evaluation => bestEvaluation > evaluation;
  }

  chess.moves().forEach((move) => {
    chess.move(move);
    const evaluation = calculateBestEvaluation({
      depth: depth - 1,
      isWhite: !isWhite
    });

    if (isBetterEvaluation(evaluation)) {
      bestEvaluation = evaluation;
    }

    chess.undo();
  });

  return bestEvaluation;
}

const mapEventToFunction = {
  makeComputerMove,
  move
};

onmessage = ({ data }) => {
  const func = mapEventToFunction[data.type];

  func(data.payload);
};
