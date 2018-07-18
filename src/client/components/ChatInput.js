import React from 'react';

class ChatInput extends React.Component {
  state = { value: '' };

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { socket } = this.props;
    socket.emit('message', { message: e.target.value });
    this.setState({ value: '' });
  };

  render() {
    return (
      <form onSubmit={this.onSubmit}>
        <input type="text" value={this.value} onChange={this.onChange} />
        <input type="submit" value="Submit" />
      </form>
    );
  }
}

export default ChatInput;
