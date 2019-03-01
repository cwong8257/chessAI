import React from 'react';

import { socketService } from '../services/socket-service';


class ChatInput extends React.Component {
  state = { content: '' };

  onChange = (e) => {
    this.setState({ content: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { content } = this.state;
    const { user } = this.props;
    socketService.socket.emit('message', { user, content });
    this.setState({ content: '' });
  };

  render() {
    const { content } = this.state;

    return (
      <form className="chat__form" onSubmit={this.onSubmit}>
        <input className="chat__input-box" type="text" value={content} onChange={this.onChange} />
        <input className="chat__input-btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ChatInput;
