import React from 'react';

import ChatMessages from './ChatMessages';
import ChatInput from '../molecules/ChatInput';

class Chat extends React.Component {
  state = { user: 'anonymous', messages: [] };

  componentDidMount() {
    const { socket } = this.props;

    socket.on('message', (message) => {
      this.setState((prevState) => {
        const updatedMessages = prevState.messages.concat([message]);

        return { messages: updatedMessages };
      });
    });
  }

  render() {
    const { messages, user } = this.state;
    const { socket } = this.props;

    return (
      <div className="chat">
        <ChatMessages messages={messages} socket={socket} />
        <ChatInput user={user} handleSubmit={this.handleSubmit} socket={socket} />
      </div>
    );
  }
}

export default Chat;
