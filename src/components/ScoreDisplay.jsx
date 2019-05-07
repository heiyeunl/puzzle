import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = store => ({
  numberOfMoves: store.game.numberOfMoves
});

class ScoreDisplay extends Component {
  render() {
    return (
      <div className="scoreDisplay">
        Number of Moves : {this.props.numberOfMoves}
      </div>
    );
  }
}

export default connect(
  mapStateToProps,
  null
)(ScoreDisplay);
