import React, { Component } from "react";
import GameContainer from './components/GameContainer'
import Header from './components/Header'
export default class App extends Component {
  render () {
    return (
      <div>
        <Header />
        <GameContainer />
      </div>
    )
  }
}