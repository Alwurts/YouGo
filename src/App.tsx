import React, { useRef, useState } from 'react';
import styled from "styled-components";
import TouchCircle from './components/TouchCircle';
interface TouchPadProps {
  colorWinner: String | undefined,
}

const TouchPad = styled.div<TouchPadProps>`
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
  text-align: center;
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

  const SELECT_HOW_MANY = 1;
  const SECONDS_TO_SELECT = 4;
  const TOUCH_COLORS : any = {
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

    let tempTouches = {...touches}

    for (let [, touch] of Object.entries(event.changedTouches)) {
      let newTouch : touchPosition = {
        color: `${TOUCH_COLORS[touch.identifier]}`,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    }

    setTouches(tempTouches)

    if (whoIsSelected && event.touches.length === 1) {
      resetCountDown();
      setWhoIsSelected(null);
    }

    if (event.touches.length >= SELECT_HOW_MANY + 1) {
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

    for (let [, touch] of Object.entries(event.touches)) {
      let newTouch : touchPosition = {
        color: `${TOUCH_COLORS[touch.identifier]}`,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    }

    setTouches(tempTouches);

    if (event.touches.length <= 1) {
      resetCountDown();
    } 
    
    if (event.touches.length > 1 && !whoIsSelected) {
      startCountDown(tempTouches);
    }

  }

  const onCountDownFinish = (participantTouches: any) => {
    const randomNumberTotalTouches = Math.floor(Math.random() * Object.keys(participantTouches).length)
    const indexOfSelected = Object.keys(participantTouches)[randomNumberTotalTouches]
    setWhoIsSelected(participantTouches[indexOfSelected])
  }

  const onCountDownCycle = (participantTouches: any) => {
    if (countToSelectWhoRef.current === SECONDS_TO_SELECT - 1) {
      onCountDownFinish(participantTouches);
      resetCountDown();
      return
    } 

    setCountToSelectWho(prevCount => prevCount + 1)
  }
  
  const startCountDown = (participantTouches: any) => {
    resetCountDown();
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
    <TouchPad 
      className="App"
      colorWinner={whoIsSelected?.color}
      onTouchStart={e => touchStart(e)}
      onTouchMove={e => touchMove(e)}
      onTouchEnd={e => touchEnd(e)}
      onTouchCancel={e => touchEnd(e)}
    >
      {
        (!whoIsSelected && !oneSecondIntervalTimer.current) && 
        <StartMessage>Place 2 or more fingers to select between them</StartMessage>
      }

      {(!whoIsSelected && oneSecondIntervalTimer.current) && <TimerMessage>{countToSelectWho}</TimerMessage>}

      {
        (!whoIsSelected && Object.keys(touches).length !== 0) && 
        Object.entries(touches).map(([, element]:Array<any>)=>(
          <TouchCircle
            color={element.color} 
            allBlack={whoIsSelected}
            positionX={element.positionX}
            positionY={element.positionY}
            key={element.identifier}
          />
          
        ))
      }

      {
        (whoIsSelected && touches[whoIsSelected.identifier]) && 
        <TouchCircle
          color={touches[whoIsSelected.identifier].color} 
          allBlack={true}
          positionX={touches[whoIsSelected.identifier].positionX}
          positionY={touches[whoIsSelected.identifier].positionY}
        />     
      }
    
    </TouchPad>
  );
}

export default App;
