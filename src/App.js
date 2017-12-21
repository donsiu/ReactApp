import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  //if the state properties value is changed, state trigger an UI update
  state = {
    persons : [{ name : `BB0`, age : 20},
               { name : `BB1`, age : 21},
               { name : `BB2`, age : 22}],
    otherState : null
  }

  switchName = (newName) => {
    this.setState({    
    persons : [{ name : `Donald`, age : 20},
    { name : `Siu`, age : 21},
    { name : newName, age : 233}]})
  }

  render() {
    return (
      <div className="App">
        <h1>Hello</h1>
        <h1>Another heading</h1>
        <Person name={this.state.persons[2].name} age={this.state.persons[2].age}/>
        <Person name={this.state.persons[1].name} age={this.state.persons[1].age}/>
        <Person name={this.state.persons[0].name} age={this.state.persons[0].age}/>
          {/* Synetic event  https://reactjs.org/docs/events.html#clipboard-events */}
        <button onClick={this.switchName.bind(this, "hello boboie")}>Switch Name</button>
      </div>
    );
    return React.createElement('div', {className : 'App'}, React.createElement('h1',null, 'hi, I am new'));
  };
}

export default App;
