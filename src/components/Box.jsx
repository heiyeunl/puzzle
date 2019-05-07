import React, { Component } from "react";
import { connect } from "react-redux";

const mapStateToProps = store => ({
  isBoxNumberDisplayed: store.game.isBoxNumberDisplayed,
});

class Box extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { id, isBoxNumberDisplayed, key, boxStyle, number } = this.props;
    return (
      <div className="box" id={id} key={key} style={boxStyle}>
        {isBoxNumberDisplayed && (
          <div className="boxNumberContainer">{number}</div>
        )}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(Box);
