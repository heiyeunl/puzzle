import React from "react";

const Box = props => {
  const { id, isBoxNumberDisplayed, key, boxStyle, number } = props;
  return (
    <div className="box" id={id} key={key} style={boxStyle}>
      {isBoxNumberDisplayed && (
        <div className="boxNumberContainer">{number}</div>
      )}
    </div>
  );
};

export default Box;
