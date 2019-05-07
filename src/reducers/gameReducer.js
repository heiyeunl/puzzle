import * as types from "../actions/actionTypes";

const initialState = {
  board: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
  whiteSquareIndex: 15,
  targetIndex: null,
  targetOffSetX: 0,
  targetOffSetY: 0,
  targetOppositeDirection: null,
  srcImg: null,
  shuffle: 0,
  numberOfMoves: 0,
  isBoxNumberDisplayed: false,
  hasWon: false
};

const gameReducer = (state = initialState, action) => {
  switch (action.type) {
    //update picture and restart board as new game
    case types.SET_PICTURE_URL:
      return {
        ...state,
        srcImg: action.payload,
        board: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15],
        whiteSquareIndex: 15,
        numberOfMoves: 0,
        //if user wants to request new pic after winning
        hasWon: false
      };
    case types.SET_PICTURE_URL_NULL:
      return {
        ...state,
        srcImg: null,
        isBoxNumberDisplayed: true,
        hasWon: false
      };
    case types.START_SHUFFLE:
      return {
        ...state,
        shuffle: action.payload,
        //if user wants to restart game by shuffling
        hasWon: false
      };
    case types.MOVE_TARGET:
      let { whiteSquareIndex, numberOfMoves, hasWon } = state;
      const board = [...state.board];
      let { direction, shuffle } = action.payload;
      let targetIndex;
      let targetOffSetX = 0;
      let targetOffSetY = 0;
      let targetOppositeDirection;
      numberOfMoves = shuffle ? 0 : numberOfMoves + 1;
      shuffle = shuffle - 1 ? shuffle - 1 : 0;

      //depending on the direction, update board and targetbox accordingly//
      if (direction === "down") {
        const temp = board[whiteSquareIndex];
        targetOppositeDirection = "up";
        board[whiteSquareIndex] = board[whiteSquareIndex - 4];
        board[whiteSquareIndex - 4] = temp;
        whiteSquareIndex -= 4;
        targetIndex = whiteSquareIndex + 4;
        targetOffSetY -= 150;
      }
      if (direction === "up") {
        const temp = board[whiteSquareIndex];
        targetOppositeDirection = "down";
        board[whiteSquareIndex] = board[whiteSquareIndex + 4];
        board[whiteSquareIndex + 4] = temp;
        whiteSquareIndex += 4;
        targetIndex = whiteSquareIndex - 4;
        targetOffSetY += 150;
      }
      if (direction === "right") {
        const temp = board[whiteSquareIndex];
        targetOppositeDirection = "left";
        board[whiteSquareIndex] = board[whiteSquareIndex - 1];
        board[whiteSquareIndex - 1] = temp;
        whiteSquareIndex -= 1;
        targetIndex = whiteSquareIndex + 1;
        targetOffSetX -= 150;
      }
      if (direction === "left") {
        const temp = board[whiteSquareIndex];
        targetOppositeDirection = "right";
        board[whiteSquareIndex] = board[whiteSquareIndex + 1];
        board[whiteSquareIndex + 1] = temp;
        whiteSquareIndex += 1;
        targetIndex = whiteSquareIndex - 1;
        targetOffSetX += 150;
      }
      //check win condition
      //only check if the whiteSquare is at index 15 and when shuffling is happening
      if (whiteSquareIndex === 15 && !shuffle) {
        //check if each boxes are in the correct place
        hasWon = board.join("") === "0123456789101112131415" ? true : false;
      }
      return {
        ...state,
        board,
        targetIndex,
        targetOffSetX,
        targetOffSetY,
        whiteSquareIndex,
        targetOppositeDirection,
        shuffle,
        numberOfMoves,
        hasWon
      };
    case types.TOGGLE_DISPLAY_NUMBER:
      return {
        ...state,
        isBoxNumberDisplayed: !state.isBoxNumberDisplayed
      };
    default:
      return state;
  }
};

export default gameReducer;
