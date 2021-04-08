import React from 'react'
import * as constant from './constants.js'

export class Tail extends React.Component{
  
  render(){
    if(this.props.tailPos != null)
      return this.props.tailPos.map((snakePos)=><div style={{position:"absolute", backgroundColor:"green",
      height:constant.snakeSize, width:constant.snakeSize,
      top:snakePos.ypos*constant.snakeSize, left:snakePos.xpos*constant.snakeSize}}>
      </div>)
    return null
  }
}