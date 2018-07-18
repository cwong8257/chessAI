import React from 'react';

class ChatInput extends React.Component {
  state = { value: '' };

  onChange = (e) => {
    console.log(e.target.value);
    this.setState({ value: e.target.value });
  };

  onSubmit = (e) => {
    e.preventDefault();
    const { value } = this.state;
    const { socket } = this.props;
    socket.emit('message', value);
    this.setState({ value: '' });
  };

  render() {
    const { value } = this.state;

    return (
      <form className="chat__form" onSubmit={this.onSubmit}>
        <input className="chat__input-box" type="text" value={value} onChange={this.onChange} />
        <input className="chat__input-btn" type="submit" value="Submit" />
      </form>
    );
  }
}

export default ChatInput;
