import React, { useRef, useState, useEffect } from 'react';
import { start } from 'repl';
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
  font-size: 300px;
`;

const StartMessage = styled.p`

  color: gray;
  font-size: 40px;
  padding: 0 16px;
`;

interface touchPosition {
  color: String,
  identifier: Number,
  positionX: Number,
  positionY: Number
}

function App() {

  const [touches, setTouches] = useState<any>({})

  const [whoIsSelected, setWhoIsSelected] = useState<any>()
  
  let oneSecondIntervalTimer = useRef<any>()
  const [countToSelectWho, setCountToSelectWho] = useState<number>(0)
  const countToSelectWhoRef = useRef(countToSelectWho)
  countToSelectWhoRef.current = countToSelectWho;
  
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
  
  const touchStart = (event: React.TouchEvent<HTMLDivElement>) => {

    if (whoIsSelected && event.touches.length === 1) {
      resetCountDown();
      setWhoIsSelected(null);
    }

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

    if (event.touches.length === 2) {
      startCountDown(tempTouches);
    } else if (event.touches.length > 2) {
      resetCountDown();
      startCountDown(tempTouches);
    }
    
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

    let tempTouches : any = {}
    /* let tempTouches = {...touches}

    for (let [, touch] of Object.entries(event.changedTouches)) {
      delete tempTouches[touch.identifier]
    }
 */
    for (let [, touch] of Object.entries(event.touches)) {
      let newTouch : touchPosition = {
        color: `${COLORS[touch.identifier]}`,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    }

    setTouches(tempTouches);

    if (event.touches.length <= 1) {

      resetCountDown();
    } else if (event.touches.length > 1) {
      resetCountDown();
      startCountDown(tempTouches);
    }

  }

  const onCountDownFinish = (participantTouches: any) => {
    const randomNumberTotalTouches = Math.floor(Math.random() * Object.keys(participantTouches).length)
    const indexOfSelected = Object.keys(participantTouches)[randomNumberTotalTouches]
    setWhoIsSelected(participantTouches[indexOfSelected])
  }

  const onCountDownCycle = (participantTouches: any) => {
    if (countToSelectWhoRef.current === 3) {
      onCountDownFinish(participantTouches);
      resetCountDown();
      return
    } 

    setCountToSelectWho(prevCount => prevCount + 1)
  }
  
  const startCountDown = (participantTouches: any) => {
    oneSecondIntervalTimer.current = setInterval(()=>{
      onCountDownCycle(participantTouches);
    }, 1000);
  }

  const resetCountDown = () => {
    clearInterval(oneSecondIntervalTimer.current)
    oneSecondIntervalTimer.current=undefined
    setCountToSelectWho(0)
  }

  return (
    <Container 
      className="App"
      colorWinner={whoIsSelected?.color}
      onTouchStart={e => touchStart(e)}
      onTouchMove={e => touchMove(e)}
      onTouchEnd={e => touchEnd(e)}
      onTouchCancel={e => touchEnd(e)}
    >
      {(!whoIsSelected && !oneSecondIntervalTimer.current) && <StartMessage>Place 2 or more fingers to select between them</StartMessage>}
      {(!whoIsSelected && oneSecondIntervalTimer.current) && <TimerMessage>{countToSelectWho}</TimerMessage>}

      {(!whoIsSelected && Object.keys(touches).length !== 0) && Object.entries(touches).map(([index, element]:Array<any>)=>(
              
        <div  
          style={{
            position: "absolute", 
            top: `${parseInt(element.positionY)-60}px`, 
            left: `${parseInt(element.positionX)-60}px`,
            borderTop: "12px solid black",
            borderRight: `12px solid ${whoIsSelected ? "black" : "#d1d1d1"}`,
            borderBottom: "12px solid black",
            borderLeft: `12px solid ${whoIsSelected ? "black" : "#d1d1d1"}`,
            background: `${element.color}`,
            width: "120px",
            height: "120px",
            borderRadius: "60%",
          }} 
          key={index}
        />
      ))}

      {whoIsSelected && 
              
        <div  
          style={{
            position: "absolute", 
            top: `${parseInt(whoIsSelected.positionY)-60}px`, 
            left: `${parseInt(whoIsSelected.positionX)-60}px`,
            borderTop: "12px solid black",
            borderRight: `12px solid ${whoIsSelected ? "black" : "#d1d1d1"}`,
            borderBottom: "12px solid black",
            borderLeft: `12px solid ${whoIsSelected ? "black" : "#d1d1d1"}`,
            background: `${whoIsSelected.color}`,
            width: "120px",
            height: "120px",
            borderRadius: "60%",
          }} 
        />
      }
    
    </Container>
  );
}

export default App;
