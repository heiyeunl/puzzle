import React, { Component } from "react";
import { connect } from "react-redux";
import * as gameActions from "../actions/creators/gameActions";
import BottomPanel from "./BottomPanel";
import Box from "./Box";

const mapStateToProps = store => ({
  board: store.game.board,
  targetIndex: store.game.targetIndex,
  targetOffSetX: store.game.targetOffSetX,
  targetOffSetY: store.game.targetOffSetY,
  whiteSquareIndex: store.game.whiteSquareIndex,
  targetOppositeDirection: store.game.targetOppositeDirection,
  shuffle: store.game.shuffle,
  srcImg: store.game.srcImg,
  hasWon: store.game.hasWon
});

const mapDispatchToProps = dispatch => ({
  moveTarget: (direction, shuffle) => {
    dispatch(gameActions.moveTarget(direction, shuffle));
  },
  newPicRequest: () => {
    dispatch(gameActions.newPicRequest());
  }
});

class GameContainer extends Component {
  constructor(props) {
    super(props);

    this.onKeyPressed = this.onKeyPressed.bind(this);
    this.checkValidMove = this.checkValidMove.bind(this);
  }

  componentDidMount() {
    this.myDiv.addEventListener("keydown", this.onKeyPressed);
    this.myDiv.focus();
    //request for image
    this.props.newPicRequest();
  }

  componentDidUpdate() {
    const { targetOppositeDirection, whiteSquareIndex, shuffle } = this.props;

    //check if shuffling condition is met to continue to move a random target
    if (shuffle > 0) {
      //randomly select moves to do until a valid move is selected
      let possibleMove = ["up", "right", "down", "left"];

      //remove the opposite of last move from possible move to avoid useless back and forth shuffling
      const lastMoveIndex = possibleMove.indexOf(targetOppositeDirection);
      if (lastMoveIndex > -1) possibleMove.splice(lastMoveIndex, 1);
      possibleMove = possibleMove.filter(el => {
        if (this.checkValidMove(whiteSquareIndex, el)) return el;
      });

      const index = Math.floor(Math.random() * possibleMove.length);
      setTimeout(() => {
        this.props.moveTarget(possibleMove[index], shuffle);
      }, 120);
    }
  }

  componentWillUnmount() {
    this.myDiv.removeEventListener("keydown", this.onKeyPressed);
  }

  checkValidMove(whitePosition, direction) {
    if (direction === "down") return Math.floor(whitePosition / 4) > 0;
    if (direction === "up") return Math.floor(whitePosition / 4) < 3;
    if (direction === "right") return whitePosition % 4 > 0;
    if (direction === "left") return whitePosition % 4 < 3;
  }

  onKeyPressed(e) {
    const keyPressed = e.keyCode;
    e.preventDefault();
    if (keyPressed === 40 && this.checkValidMove(this.props.whiteSquareIndex, "down"))
      this.props.moveTarget("down");

    if (keyPressed === 38 && this.checkValidMove(this.props.whiteSquareIndex, "up"))
      this.props.moveTarget("up");

    if (keyPressed === 39 && this.checkValidMove(this.props.whiteSquareIndex, "right"))
      this.props.moveTarget("right");

    if (keyPressed === 37 && this.checkValidMove(this.props.whiteSquareIndex, "left"))
      this.props.moveTarget("left");

  }

  render() {
    const boxes = [];
    const {
      targetIndex,
      board,
      srcImg,
      targetOffSetY,
      targetOffSetX,
      hasWon
    } = this.props;

    for (let j = 0; j < board.length; j++) {
      const ImgyCord = Math.floor(board[j] / 4) * 150;
      const ImgxCord = (board[j] % 4) * 150;
      const boxStyle = {
        backgroundImage: `url(${srcImg})`,
        backgroundPositionX: -ImgxCord,
        backgroundPositionY: -ImgyCord,
        top: Math.floor(j / 4) * 150,
        left: (j % 4) * 150
      };
      //add CSS animation for targetBox
      if (j === targetIndex) {
        boxStyle.top += targetOffSetY;
        boxStyle.left += targetOffSetX;
        boxStyle.transform = `translate(${-targetOffSetX}px, ${-targetOffSetY}px)`;
        boxStyle.transition = "transform .1s ease-in";
      }
      boxes.push(
        <Box
          id={`box` + board[j]}
          key={`boxIndex` + j}
          boxStyle={boxStyle}
          number={board[j]}
        />
      );
    }
    return (
      <div className="boardContainer" tabIndex="0" onKeyPress={this.onKeyPressed} ref={ref => this.myDiv = ref}>
        <div className="board">
          {boxes}
          {hasWon && (
            <div className="winMessageContainer" style={{ backgroundImage: `url(${srcImg})` }}>
              <div className="winMessage">You Won</div>
            </div>
          )}
        </div>
        <div className="instruction"> Move the tile using arrow keys </div>
        <BottomPanel />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
