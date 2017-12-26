import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {
  //if the state properties value is changed, state trigger an UI update
  state = {
    persons : [{ name : `BB0`, age : 20},
               { name : `BB1`, age : 21},
               { name : `BB2`, age : 22}],
    otherState : null,
    showPersons : false,
  }

  nameChangeHandler = (event) => {
    this.setState({ 
      persons : [{ name : event.target.value, age : 20},
               { name : `Manu`, age : 21},
               { name : `Max`, age : 22}]   
    })
  } 

  togglePersonHanlder = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons : !doesShow});
  }

  switchName = (newName) => {
    this.setState({    
    persons : 
    [{ name : `Donald`, age : 20},
    { name : `Siu`, age : 21},
    { name : newName, age : 233}]})
  }

  render() {
    //inline style
    const style = {
      backgroundColor: 'White',
      fonrt:'inherit',
      border: '1x solid blue',
      padding: '8px',
      cusor: 'pointer'
    }

    let persons = null;
    if(this.state.showPersons){
      persons = (
        <div>
          {this.state.persons.map(person => {
             return (<Person 
             name= {person.name} 
             age= {person.age}/>)
          })}
          {/* Synetic event  https://reactjs.org/docs/events.html#clipboard-events */}
        </div>);
    }

    return(
      <div className="App">
        <h1>Hello</h1>
        {/* this.switchName.bind(this, "hello bobby") */}
        <button style={style} onClick={this.togglePersonHanlder}>Toggle Name</button>
        {persons}
      </div>
    );
    return React.createElement('div', {className : 'App'}, React.createElement('h1',null, 'hi, I am new'));
  };
}

export default App;