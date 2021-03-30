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

class ChoiceButton extends React.Component{
  render(){
    var text = this.props.text
    var id = this.props.id
    var player_row;
    if (this.props.correct_answer){
      return (
        <button onClick={this.props.handleClick}>{text}</button>
      )  
    }
    else{
      return (
        <button onClick={this.props.handleClick}>{text}</button>
      )
    }
  }
}

class QuestionArea extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      question_id: 0,
      question_text: "tmp",
    }
   const current_question = this.props.current_question;
   this.getQuestion(current_question);

  }

  getQuestion(qn_number){
    // Takes a question number, calls an api, returns a questin object.
    var qn_objects = {1: {"question_id": 1, "text": "Who is the PM of Singapore",
                      "choices":{"1": "Lee","2": "Goh", "3": "Tan"}, "correct_answer":"1"},
                      2: {"question_id": 2, "text": "where is singapore?",
                    "choices":{ "1": "asia",
                    "2": "america"}, 
                    "correct_answer":"1"}}

    return fetch("http://127.0.0.1:8000/question/2/").then(response => response.json()).then(tmp => this.questionData(tmp));
      
    //return qn_objects[qn_number]
  }

  questionData(qn_object){
    console.log(qn_object["question_text"])
    this.setState({ question_text: qn_object["question_text"] })

    // all of the data from question object should be gotten from here.
    // This function must set all the states. No state setting in render(). 

    // var choices = qn_object["choices"]
    // console.log(choices)
    // var correct_answer = qn_object["correct_answer"]
    // var choices_list = []
    // for (const [key, value] of Object.entries(choices)) {
    //   console.log(key)
    //   if (key == correct_answer) {
    //     choices_list.push(<ChoiceButton text={value} handleClick={this.props.handleRightAnswer} 
    //                         correct_answer={true}/> )
    //   }
    //   else{
    //     choices_list.push(<ChoiceButton text={value} handleClick={this.props.handleWrongAnswer}
    //                        correct_answer={false}/>)
    //   }
    // }
  }

  render() {
    // const current_question = this.props.current_question;
    // var qn_object = this.getQuestion(current_question);
    
    return (
      <div>
        {this.state.question_text} 

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
    this.handleRightAnswer = this.handleRightAnswer.bind(this);
    this.handleWrongAnswer = this.handleWrongAnswer.bind(this);
    this.goNextPlayerTurn = this.goNextPlayerTurn.bind(this);
    this.testAlert = this.testAlert.bind(this);

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
    })
  }

  testAlert(){
    alert(this.state.current_player_id);
  }

  handleWrongAnswer(){
    alert ("wrong answer")
    this.goNextPlayerTurn();
  }

  handleRightAnswer(){
    alert ("handling Right answer")
    this.addPointToPlayer();
    this.goNextPlayerTurn();
  }

  goNextPlayerTurn(){
    var number_of_players = this.state.players.length -1;
    var tmp_current_player_id = this.state.current_player_id;
    if (this.state.current_player_id >= number_of_players){
      this.setState({current_player_id: 0,
                     current_question: this.state.current_question +1  })
    }
    else{
      this.setState({current_player_id: this.state.current_player_id + 1})
    }
    
  }

  addPointToPlayer(){
    var newArray = this.state.players.slice() // get a copy of the players array.
    console.log("newArray array:")
    console.log(newArray)
    newArray[this.state.current_player_id]["score"] += 1
    this.setState({players: newArray})
  }

  // Add question. Play 
  render() {
    const game_started = this.state.game_started;
    let question_area;
    let add_player_bar;
    if (game_started){
      question_area = <QuestionArea current_question={this.state.current_question}
                        handleRightAnswer={this.handleRightAnswer}
                        handleWrongAnswer={this.handleWrongAnswer} 
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
