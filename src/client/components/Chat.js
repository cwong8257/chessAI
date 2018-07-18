import React from 'react';
import ChatMessages from './ChatMessages';
import ChatInput from './ChatInput';

class Chat extends React.Component {
  state = { messages: [] };

  render() {
    const { messages } = this.state;

    return (
      <div className="chat">
        <ChatMessages messages={messages} />
        <ChatInput />
      </div>
    );
  }
}

export default Chat;
