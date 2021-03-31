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
  render() {
    console.log("props passed to questionarea", this.props.question_object)
    //let question_text = this.props.question_object["question_text"]
    //console.log("props during render", this.props.current_question, question_text)
    let question_text = this.props.question_object["question_text"]
    let choices_list = this.props.question_object["choices_list"]
    return (
      <div>
        <div>{question_text} </div>
        <ul>{choices_list}</ul>
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
      question_object: {"question_id":0, "choices_list": [], "question_text":"as", "correct_choice":1},
    }
    this.handleAddPlayerClick = this.handleAddPlayerClick.bind(this);
    this.handlePlayerNameChange = this.handlePlayerNameChange.bind(this);
    this.handleStartGame = this.handleStartGame.bind(this);
    this.addPointToPlayer = this.addPointToPlayer.bind(this);
    this.handleRightAnswer = this.handleRightAnswer.bind(this);
    this.handleWrongAnswer = this.handleWrongAnswer.bind(this);
    this.goNextPlayerTurn = this.goNextPlayerTurn.bind(this);
    this.testAlert = this.testAlert.bind(this);
    this.getQuestion(this.state.current_question)
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
    this.goNextPlayerTurn();
  }

  handleRightAnswer(){
    this.addPointToPlayer();
    this.goNextPlayerTurn();
  }

  goNextPlayerTurn(){
    var number_of_players = this.state.players.length -1;
    // var tmp_current_player_id = this.state.current_player_id;

    if (this.state.current_player_id >= number_of_players){
      console.log("Before increment current_question, current question is", this.state.current_question)

      // Why we pass a functino into setState?
      // setState is asynchronous. We want to ensure that setState fully returns, before calling a function.
      let new_question_number = this.state.current_question + 1
      this.setState({current_player_id: 0,
                     current_question: new_question_number}, 
                     function() {this._handleGetQuestion()})

      console.log("After increment current_question", this.state.current_question)        
    }
    else{
      this.setState({current_player_id: this.state.current_player_id + 1})
    }
  }

  _handleGetQuestion(){
    this.getQuestion(this.state.current_question)
  }

  addPointToPlayer(){
    var newArray = this.state.players.slice() // get a copy of the players array.
    newArray[this.state.current_player_id]["score"] += 1
    this.setState({players: newArray})
  }

  getQuestion(qn_number){
    // returns a json
    console.log("Calling getQuestion with", qn_number)
    let url = "http://127.0.0.1:8000/question/" + qn_number + "/"
    return fetch(url).then(response => response.json()).then(tmp => this.questionData(tmp));
  }

  questionData(qn_object){
    // should update this.question_object
    // long step to create choices list and update this.question_object['choices_list]
    var choices_list = []
    var choices = qn_object['choices']
    for (const [key, value] of Object.entries(choices)) {
      if (key == qn_object["answer"]) {
        choices_list.push(<ChoiceButton text={value} handleClick={this.handleRightAnswer} 
                            correct_answer={true}/> )
      }
      else{
        choices_list.push(<ChoiceButton text={value} handleClick={this.handleWrongAnswer}
                           correct_answer={false}/>)
      }
    }

    let tmp_object = {"question_id":qn_object["id"], "choices_list":choices_list, "question_text":qn_object["question_text"],
                  "correct_choice":qn_object["answer"]            
                  }
    this.setState({ question_object: tmp_object});
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
                        current_player_id={this.state.current_player_id}
                        question_object={this.state.question_object}/>
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
