import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';


function Choice(props){
  return (
    <button className='choice' onClick = {props.onClick}>
      {props.value}
    </button>
  );
}

function Question(props){
  return (
    <div className='Question'>
      {props.value}
    </div>
  );
}

class Player extends React.Component{
  constructor(props){
    super(props);
    this.state = { 
      name: "temp name",
      score: 0
    }
  }
  render() {
    return (<p>{this.state.name}</p>)
  }
}

// All player related stuff lives inside PlayerList.
class PlayerList extends React.Component {
  constructor(props){
    super(props);
    this.state = {}
  }

  render(){
    return(
      <div className="playerList">
        <form>
          <input placeholder="Enter Player Name">
          </input>
          <button type="submit">add</button>
        </form>
      </div>
    )
  }
}

class Board extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question: [],
      players: []  // array of player objects. 
    }
  }

  handleClick(i){
    getData()
  }

  renderChoice(text){
    return (

      <Choice
        value={text}
        onClick = {()=>this.handleClick()}
      />
    )
  }

  renderQuestion(i){
    return (
      <Question
        value={i}
      />
    )
  }
  


  renderPlayer(player){
    return (
      <Player/>
    )
  }

  render(){
    //let choices_api = ["sample_choice 1", "sample_choice 2", "sample_choice 3"]
    return(
      <div>
          {this.renderPlayer("abc")}
        <div className="gameArea">
          {this.renderQuestion("Who is the president of Singapore?")}
          {this.renderChoice("Lee Hsien Loong")}
          {this.renderChoice("Goh Chok Tong")}
          {this.renderChoice("Chan Chun Sing")}

        </div>
      </div>
    )
  }
}

class Game extends React.Component{
  render(){
    return (
      <Board />
      
    )
  }
}


function getData() {
  fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  //.then(json => alert(json))
}


function App() {
  return (
    
    <div className="App">
      <header className="App-header">
        <PlayerList />
        <div className="playerArea"> <Game /> </div>

      </header>
      
    </div>
  );
}

export default App;
