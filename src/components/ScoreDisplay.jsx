import React from "react";

const ScoreDisplay = props => {
  return (
    <div className="scoreDisplay">
      Number of Moves : {props.numberOfMoves} 
    </div>
  );
};

export default ScoreDisplay;
