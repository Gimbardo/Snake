import React from 'react'
import * as constant from './constants.js'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Image } from 'react-bootstrap';

export class Tail extends React.Component{
  
  render(){
    if(this.props.tailPos != null)
      return this.props.tailPos.map((snakePos)=><Image style={{position:"absolute", backgroundColor:"green",
      height:constant.snakeSize, width:constant.snakeSize,
      top:snakePos.ypos*constant.snakeSize, left:snakePos.xpos*constant.snakeSize}}
      roundedCircle>
      </Image>)
    return null
  }
}