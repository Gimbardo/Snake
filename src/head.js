import React from 'react'
import * as constant from './constants.js'


export class Head extends React.Component{
  
  render(){
    return (<div style={{position:"absolute", backgroundColor:"green",
    height:constant.snakeSize, width:constant.snakeSize,
    top:this.props.headPos.ypos*constant.snakeSize, left:this.props.headPos.xpos*constant.snakeSize}}>
    <center>o_o</center>
    </div>)
  }
}