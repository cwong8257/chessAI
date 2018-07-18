import React from 'react';

function ChatMessage(props) {
  const { user, time, content } = props;

  return (
    <li className="chat__message">
      <span className="chat__message-user">{user}</span>
      <span className="chat__message-time">{time}</span>
      <span className="chat__message-content">{content}</span>
    </li>
  );
}

export default ChatMessage;
