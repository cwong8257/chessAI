import React from 'react';
import ChatMessage from './ChatMessage';

function ChatMessages({ messages }) {
  const messageEls = messages.map(message => <ChatMessage {...message} />);

  return <ul className="chat__messages">{messageEls}</ul>;
}

export default ChatMessages;
