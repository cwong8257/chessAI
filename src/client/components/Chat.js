import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

class Chat extends React.Component {
  state = { messages: [] };

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
    const { messages } = this.state;
    const { socket } = this.props;

    return (
      <div className="chat">
        <ChatMessages messages={messages} />
        <ChatInput socket={socket} handleSubmit={this.handleSubmit} />
      </div>
    );
  }
}

export default Chat;
