import React from "react";
import { observer, inject } from "mobx-react";
import * as signalR from "@aspnet/signalr";

import Config from "Config";

@inject("store")
@observer
class MessageComponent extends React.Component {
  componentDidMount() {
    const store = this.props.store;
    store.hubConnection = new signalR.HubConnectionBuilder()
      .withUrl(Config.HubConnectionApi)
      .build();

    // register listeners
    store.hubConnection.on("ReceiveMessage", data => {
      store.receiveMessage(data);
    });

    store.hubConnection.start().catch(function(err) {
      return console.error(err.toString());
    });
  }
  render() {
    const store = this.props.store;
    return (
      <div>
        <br />
        <input
          onChange={this.onChange}
          className="form-group"
          value={store.text}
        />
        <br />
        <button onClick={this.onClick} className="btn btn-primary">
          Send
        </button>

        <hr />
        <div>
          {store.messages.map((m, i) => (
            <div key={i}>{m}</div>
          ))}
        </div>
      </div>
    );
  }

  onChange = event => {
    this.props.store.text = event.target.value;
  };

  onClick = event => {
    const store = this.props.store;

    store.sendMessage(store.text);
    store.text = undefined;
  };
}

export default MessageComponent;
