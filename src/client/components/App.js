import React, { Component } from 'react';
import '../styles/main.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { string: '' };
  }

  componentDidMount() {
    fetch('/api/hello')
      .then(res => res.json())
      .then((result) => {
        console.log(result);
        this.setState({ string: result.string });
      });
  }

  render() {
    const { string } = this.state;

    return (
      <div>
        <p>{string}</p>
      </div>
    );
  }
}

export default App;
