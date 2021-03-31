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
      question_id: 1,
      question_text: "tmp",
      choices_list: [],
      correct_choice: 0,
    }
    console.log("calling questionarea consturcor")
    let current_question = this.props.current_question;
    this.getQuestion(current_question);
}
  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.current_question !== prevProps.current_question) {
      this.setState({question_id: this.props.current_question})
    }
}


  getQuestion(qn_number){
    // returns a json
    console.log("this props current_question", this.props.current_question)
    let url = "http://127.0.0.1:8000/question/" + qn_number + "/"
    return fetch(url).then(response => response.json()).then(tmp => this.questionData(tmp));

  }

  questionData(qn_object){
    // all of the data from question object should be contained in qn_object
    // This function must set all the states. No state setting in render(). 

    // create variables to set our qn_object
    console.log("calling function questionData, this.props.current_question is:", this.props.current_question)
    this.setState({ question_text: qn_object["question_text"],
                    question_id: qn_object["id"], correct_choice: qn_object["answer"]})
    
    var choices_list = []
    var choices = qn_object['choices']
    for (const [key, value] of Object.entries(choices)) {
      if (key == qn_object["answer"]) {
        choices_list.push(<ChoiceButton text={value} handleClick={this.props.handleRightAnswer} 
                            correct_answer={true}/> )
      }
      else{
        choices_list.push(<ChoiceButton text={value} handleClick={this.props.handleWrongAnswer}
                           correct_answer={false}/>)
      }
    }

    this.setState({choices_list: choices_list});
  }

  render() {
    //this.getQuestion(this.props.current_question)
    console.log("props during render", this.props.current_question)

    return (
      <div>
        <div>{this.state.question_text} </div>
        {this.state.choices_list}
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
      console.log("modifiablegamearea.state.current_question:", this.state.current_question)

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
