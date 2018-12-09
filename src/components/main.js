import React from "react";
import { observer } from "mobx-react";

import MessageComponent from "./Message.Component";
import logo from "../logo.svg";

@observer
class main extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </div>
        <MessageComponent />
      </div>
    );
  }
}

export default main;
