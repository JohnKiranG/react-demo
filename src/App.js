import React, { Component } from 'react';
import CreateChapter from './components/chapter/CreateChapter';
// import './App.css';

class App extends Component {
  state={}

  render() {
    return (
      <div className="App">
      {/* <Button type="primary">Button</Button> */}
      <CreateChapter/>
    </div>
    );
  }
}

export default App;
