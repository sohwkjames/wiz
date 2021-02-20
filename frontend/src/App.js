import logo from './logo.svg';
import './App.css';
import React, { Component } from 'react';

// ModifiableGameArea
//   AddPlayerbar
//   PlayerList
//      PlayerRow
//   QuestionArea

// Things to compute:
// Maintain an array of player objects
// Questions will be called via API. No need to keep in memory.

class PlayerRow extends React.Component{
  render(){
    var name = this.props.name
    var score = this.props.score
    var player_row;
    if (this.props.current_player){
      return (
        <b><li>Player: {name}, Score: {score}</li></b>
      )  
    }
    else{
      return (
        <li>Player: {name}, Score: {score}</li>
      )
    }
  }
}

class PlayerList extends React.Component{
    render() {
      const current_player_id = this.props.current_player_id;  
      const players = this.props.players
      var listitems = []
      players.forEach((player) => {
        if (player.id === current_player_id){
          listitems.push(<PlayerRow key={player.id} name={player.name} score={player.score} current_player={true}/>)
        }
        else{
          listitems.push(<PlayerRow key={player.id} name={player.name} score={player.score} current_player={false}/>)
        }
      })
      return (
        <div>
        <p>Players:</p>
        <ul></ul>{listitems}
        </div>
      )
    }
}

class QuestionArea extends React.Component {

  getQuestion(qn_number){
    // Takes a question number, calls an api, returns a questin object.
    var qn_objects = {1: {"question_id": 1, "text": "what is 2+2?","choice1": "3","choice2": "4", "correct_answer":"4"},
     2: {"question_id": 2, "text": "where is singapore?",
     "choice1": "asia",
    "choice2": "america", 
    "correct_answer":"america"}}
    return qn_objects[qn_number]
  }



  render() {
    const current_question = this.props.current_question
    var qn_object = this.getQuestion(current_question);

    return (
      <div>
        {qn_object["text"]}
        <button onClick={this.props.handleAddScore}>{qn_object["choice1"] }</button>
        <button onClick={this.props.handleAddScore}>{qn_object["choice2"]}</button>
      </div>
    )
  }
}

class AddPlayerBar extends React.Component{
  // renders a text input, a addPlayer button, a startGame button.
  render() {
    return (
      <div>
        <input type="text" id="playerName" onChange={this.props.handleOnChange}></input>
        <button id="addPlayer" onClick={this.props.handleOnClick}>Add a Player</button>
        <div><button id="startGame" onClick={this.props.onStartGame}>Start Game</button></div>
      </div>
    )
  }
}

class ModifiableGameArea extends React.Component{
  // This is the top most object, and will hold some state.

  // Will also render a AddPlayer component. We will pass in (as props) methods into the AddPlayer component. 
  // These methods we pass into the AddPlayer component can modify the state of ModifiablePlayerTable
  constructor(props){
    super(props);
    this.state = {
      players: [],
      questions: [],
      player_to_add: "",
      game_started: false,
      current_player_id: 0,
      current_question: 1,
    }
    this.handleAddPlayerClick = this.handleAddPlayerClick.bind(this);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.addPointToPlayer = this.addPointToPlayer.bind(this);

  }

  handleAddPlayerClick(){
    var newArray = this.state.players.slice()
    var newPlayer =  {"id": this.state.players.length, "name": this.state.player_to_add, "score": 0}
    newArray.push(newPlayer)
    this.setState({ players: newArray })
  }
  
  handlePlayerNameChange(e){
    var player_name = e.target.value
    this.setState( {player_to_add: player_name} )
  }

  handleStartGame(){
    this.setState({game_started: true}, () => {
      alert(this.state.game_started + "state of game")
    })
  }

  addPointToPlayer(){
    
    var newArray = this.state.players.slice()
    console.log("current player id", this.props.current_player_id)
    console.log(newArray[this.props.current_player_id] )
    console.log(newArray)
    newArray[this.props.current_player_id] ++
    this.setState({players: newArray})
  }

  // Add question. Play 
  render() {
    const game_started = this.state.game_started;
    let question_area;
    let add_player_bar;
    if (game_started){
      question_area = <QuestionArea current_question={this.state.current_question}
                        handleAddScore={this.addPointToPlayer} 
                        current_player_id={this.state.current_player_id}/>
    }
    else{
      question_area = null;
      add_player_bar = <AddPlayerBar handleOnChange={this.handlePlayerNameChange} handleOnClick={this.handleAddPlayerClick} onStartGame={this.handleStartGame}/>
    }
    return (
      <div>
        {add_player_bar}
        <PlayerList players={this.state.players} current_player_id={this.state.current_player_id}/>
        {question_area}
      </div>
    )
  }
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="playerArea"> <ModifiableGameArea/> </div>
      </header>
    </div>
  );
}

export default App;
