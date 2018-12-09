import { observable, action } from "mobx";
import * as Service from "../services/Message.Service";

class MessageStore {
  @observable
  message = undefined;

  @observable
  hubConnection = undefined;

  @observable
  messages = [];

  @observable
  text = undefined;

  @action
  resetStore = () => {
    this.message = undefined;
    this.hubConnection = undefined;
    this.text = undefined;
    this.messages = [];
  };

  @action
  sendMessage = message => {
    Service.pushMessage({
      messageBody: message,
      id: 0,
      createdDt: new Date(),
      updatedDt: new Date(),
      createdBy: 0,
      updatedBy: 0
    });
  };

  @action
  receiveMessage = data => {
    const msg = [...this.messages];

    msg.push(data);

    this.messages = msg;
  };
}

export default new MessageStore();
