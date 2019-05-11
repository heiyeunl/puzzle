import React, { PureComponent } from "react";
import { connect } from "react-redux";
import ScoreDisplay from "./ScoreDisplay";
import * as gameActions from "../actions/creators/gameActions";

const mapStateToProps = store => ({
  shuffle: store.game.shuffle,
  hasWon: store.game.hasWon,
  numberOfMoves: store.game.numberOfMoves
});

const mapDispatchToProps = dispatch => ({
  startShuffle: num => {
    dispatch(gameActions.startShuffle(num));
  },
  newPicRequest: () => {
    dispatch(gameActions.newPicRequest());
  },
  toggleDisplayNumber: () => {
    dispatch(gameActions.toggleDisplayNumber());
  }
});

class BottomPanel extends PureComponent {
  constructor(props) {
    super(props);
    this.clickShuffle = this.clickShuffle.bind(this);
  }

  clickShuffle() {
    if (this.props.shuffle === 0) {
      this.props.startShuffle(35);
    }
  }

  render() {
    const { shuffle, hasWon, numberOfMoves } = this.props;

    return (
      <div className="bottomPanel">
        <ScoreDisplay numberOfMoves={numberOfMoves}/>
        <button onClick={this.clickShuffle}>Shuffle</button>
        <button disabled={shuffle} onClick={this.props.newPicRequest}>
          {hasWon ? "New Game" : "New Picture"}
        </button>
        <button
          className="displayNumberButton"
          disabled={shuffle}
          onClick={this.props.toggleDisplayNumber}
        >
          Display Number
        </button>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BottomPanel);
