import React, { useRef, useState, useEffect } from 'react';
import styled from "styled-components";
import './App.css';

interface ContainerProps {
  colorWinner: String | undefined,
}

const Container = styled.div<ContainerProps>`
  position: static;
  height: 100vh;
  width: 100vw;
  background: ${({colorWinner})=> colorWinner ? `${colorWinner}` : "black"};
  touch-action: none;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const TimerMessage = styled.p`

  color: gray;
  font-size: 200px;
`;

interface touchPosition {
  color: String,
  identifier: Number,
  positionX: Number,
  positionY: Number
}

function App() {

  const [touches, setTouches] = useState<any>({})

  const [winner, setWinner] = useState<touchPosition>()
  let timerWinner = useRef<any>()

  const [countToRandom, setCountToRandom] = useState<number>(0)
  const countToRandomRef = useRef(countToRandom)
  countToRandomRef.current = countToRandom;
  

  const COLORS : any = {
    0:"hsl(359, 100%, 50%)",
    1:"hsl(96, 100%, 50%)",
    2:"hsl(208, 100%, 50%)",
    3:"hsl(39, 100%, 50%)",
    4:"hsl(300, 100%, 50%)",
    5:"hsl(68, 100%, 50%)",
    6:"hsl(156, 100%, 50%)",
    7:"hsl(330, 100%, 50%)",
    8:"hsl(244, 100%, 50%)",
    9:"hsl(60, 100%, 50%)",
    10:"hsl(178, 100%, 50%)",
    11:"hsl(90, 100%, 50%)",
    12:"hsl(23, 100%, 50%)",
    13:"hsl(272, 100%, 50%)",
    14:"hsl(121, 100%, 50%)",
    15:"hsl(48, 100%, 50%)",
    16:"hsl(359, 100%, 50%)",
    17:"hsl(96, 100%, 50%)",
    18:"hsl(208, 100%, 50%)",
    19:"hsl(39, 100%, 50%)",
    20:"hsl(300, 100%, 50%)",
  }

  const onWinnerTimer = (tempTouches: any) => {

    if (countToRandomRef.current >= 3) {
      setWinner(tempTouches[0])
      return
    }
    setCountToRandom(prevCount => prevCount + 1)
  }
  
  const touchStart = (event: React.TouchEvent<HTMLDivElement>) => {

    let tempTouches = {...touches}

    for (let [, touch] of Object.entries(event.changedTouches)) {
      let newTouch : touchPosition = {
        color: `${COLORS[touch.identifier]}`,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    }

    setTouches(tempTouches)

    timerWinner.current = setInterval(()=>{
      onWinnerTimer(tempTouches);
    }, 1000);
  }

  const touchMove = (event: React.TouchEvent<HTMLDivElement>) => {

    let tempTouches = {...touches}

    for (let [, touch] of Object.entries(event.changedTouches)) {

      let newTouch : touchPosition = {
        color: tempTouches[touch.identifier].color,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    }

    setTouches(tempTouches)
  }

  const touchEnd = (event: React.TouchEvent<HTMLDivElement>) => {

    let tempTouches = {...touches}

    for (let [, touch] of Object.entries(event.changedTouches)) {
      delete tempTouches[touch.identifier]
    }

    setTouches(tempTouches);

    clearCountDown();
  }

  const clearCountDown = () => {

    clearInterval(timerWinner.current)
    setWinner(undefined)
    timerWinner.current=undefined
    setCountToRandom(0)
    countToRandomRef.current = 0

  }

  return (
    <Container 
      className="App"
      colorWinner={winner?.color}
      onTouchStart={e => touchStart(e)}
      onTouchMove={e => touchMove(e)}
      onTouchEnd={e => touchEnd(e)}
      onTouchCancel={e => touchEnd(e)}
    >
      {(!winner && timerWinner.current) && <TimerMessage>{countToRandom}</TimerMessage>}
      {Object.keys(touches).length !== 0 && Object.entries(touches).map(([index, element]:Array<any>)=>(
              
        <div  
          style={{
            position: "absolute", 
            top: `${parseInt(element.positionY)-60}px`, 
            left: `${parseInt(element.positionX)-60}px`,
            borderTop: "12px solid black",
            borderRight: `12px solid ${winner ? "black" : "#d1d1d1"}`,
            borderBottom: "12px solid black",
            borderLeft: `12px solid ${winner ? "black" : "#d1d1d1"}`,
            background: `${element.color}`,
            width: "120px",
            height: "120px",
            borderRadius: "60%",
          }} 
          key={index}
        />
      ))}
    
    </Container>
  );
}

export default App;
