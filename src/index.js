import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import {Tail} from './tail.js'
import {Head} from './head.js'
import {Food} from './food.js'
import * as constant from './constants.js'
import {Position} from './position'
import {getRandom} from './utility.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button } from 'react-bootstrap';
import { Alert } from 'react-bootstrap';

class Game extends React.Component{
  render(){
    return <div>
      <Board />
      <Start />
    </div>
  }
}
class Board extends React.Component{
  render(){
    return<div style={{height:constant.boardSize, width:constant.boardSize, backgroundColor:"Bisque"}}>
    </div>
  }
}

class Start extends React.Component{
  constructor(props){
    super(props)
    this.state={direction:'ArrowLeft', startDisabled:false, score:0}
    this.lastInput='ArrowLeft' //to prevent multiple switches in a single tic, that would have allowed 180° rotations
    this.start=this.start.bind(this);
    this.stop=this.stop.bind(this)
    this.handleKeyDown = this.handleKeyDown.bind(this)
    this.increaseScore = this.increaseScore.bind(this)
    this.positions=[new Position(getRandom(constant.boardSizeInSquares),getRandom(constant.boardSizeInSquares))]
  }
  /**
   * Basically a queue manager
   * we add elements to the top with unshift, and remove them from the bottom with pop
   * when snake eats, we use push to add an element to the bottom
   */
  moveSnake()
  {
    this.setState({direction:this.lastInput})
    switch(this.state.direction){
      case 'ArrowDown':
        if(this.positions[0].ypos+1<constant.boardSizeInSquares)
          this.positions.unshift(new Position(this.positions[0].xpos,this.positions[0].ypos+1))
        else
          this.positions.unshift(new Position(this.positions[0].xpos,0))
        break;
      case 'ArrowUp':
        if(this.positions[0].ypos>0)
          this.positions.unshift(new Position(this.positions[0].xpos,this.positions[0].ypos-1))
        else
          this.positions.unshift(new Position(this.positions[0].xpos,constant.boardSizeInSquares-1))
        break;
      case 'ArrowRight':
        if(this.positions[0].xpos+1<constant.boardSizeInSquares)
          this.positions.unshift(new Position(this.positions[0].xpos+1,this.positions[0].ypos))
        else
          this.positions.unshift(new Position(0,this.positions[0].ypos))
        break;
      case 'ArrowLeft':
        if(this.positions[0].xpos>0)
          this.positions.unshift(new Position(this.positions[0].xpos-1,this.positions[0].ypos))
        else
          this.positions.unshift(new Position(constant.boardSizeInSquares-1,this.positions[0].ypos))
        break;
      default:
        break;
    }
    this.positions.pop()
    
    if(this.youLostCheck()){
      this.positions=[new Position(getRandom(constant.boardSizeInSquares),getRandom(constant.boardSizeInSquares))]
      alert('GAME OVER Score: '+this.state.score)
      this.stop()
    }
    this.forceUpdate()
  }

  youLostCheck(){
    return this.positions.slice(1).find((position)=>(this.positions[0].xpos===position.xpos)&&(this.positions[0].ypos===position.ypos) )
  }

  handleKeyDown(e) {
    var keysAllowed=["ArrowDown","ArrowUp","ArrowRight","ArrowLeft"]
    switch(this.state.direction){
      case 'ArrowDown':
        keysAllowed.splice(1,1)
        break;
      case 'ArrowUp':
        keysAllowed.splice(0,1)
        break;
      case 'ArrowRight':
        keysAllowed.splice(3,1)
        break;
      case 'ArrowLeft':
        keysAllowed.splice(2,1)
        break;
      default:
        break;
    }
    if(keysAllowed.includes(e.key))
      this.lastInput=e.key  
  }
  start(){
    this.setState({startDisabled:true})
    this.idInterval=setInterval(()=>this.moveSnake(),constant.interval)
  }
  stop(){
    this.setState({startDisabled:false})
    clearInterval(this.idInterval)
    this.setState({score:0})
    this.positions=[new Position(getRandom(constant.boardSizeInSquares),getRandom(constant.boardSizeInSquares))]
  }
  increaseScore(){
    this.setState({score:this.state.score+1})
    if(this.state.score+1 >= 399){//damn you sync methods
      alert('Hai vinto :)')
      this.stop()
    }
  }
  render(){ 
    onkeydown=this.handleKeyDown
    
    return (<div onkeypress={this.handleKeyDown}>
    <Food snakePos={this.positions} increaseScore={this.increaseScore}/>
    <Tail tailPos={this.positions.slice(1)} direction={this.state.direction}/>
    <Head headPos={this.positions[0]} direction={this.state.direction}/>
    

    <Button variant="outline-success" disabled={this.state.startDisabled}onClick={this.start}
      style={{position: "absolute",
      top:100,left:constant.boardSize + 100,
      height:70,width:150}}>START</Button>
      <Button variant="outline-warning" disabled={!(this.state.startDisabled)}onClick={this.stop}
      style={{position: "absolute",
      top:200,left:constant.boardSize + 100,
      height:70,width:150}}>STOP</Button>
      <Alert variant='info'>Score: {this.state.score}</Alert>
    </div>)
  }
}

ReactDOM.render(
    <Game />,
  document.getElementById('root')
);
