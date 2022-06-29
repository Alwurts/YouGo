import React, { useState } from 'react';
import styled, { keyframes, ThemeProvider } from "styled-components";
import './App.css';

const Container = styled.div`
  position: static;
  height: 100vh;
  width: 100vw;
  background: black;
  touch-action: none;
`;

interface touchPosition {
  color: String,
  identifier: Number,
  positionX: Number,
  positionY: Number
}

function App() {

  const [touches, setTouches] = useState<any>({})

  const touchStart = (event: React.TouchEvent<HTMLDivElement>) => {

    let tempTouches = {...touches}

    Object.entries(event.changedTouches).map(([, touch]) => {

      let newTouch : touchPosition = {
        color: `hsl(${Math.floor(Math.random() * 359)}, 100%, 50%)`,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    })


    
    setTouches(tempTouches)
  }

  const touchMove = (event: React.TouchEvent<HTMLDivElement>) => {
    let tempTouches = {...touches}

    Object.entries(event.changedTouches).map(([, touch]) => {

      let newTouch : touchPosition = {
        color: tempTouches[touch.identifier].color,
        identifier: touch.identifier,
        positionX: touch.clientX,
        positionY: touch.clientY,
      }

      tempTouches[touch.identifier] = newTouch
    })

    setTouches(tempTouches)
  }

  const touchEnd = (event: React.TouchEvent<HTMLDivElement>) => {

    let tempTouches = {...touches}

    Object.entries(event.changedTouches).map(([, touch]) => {
      delete tempTouches[touch.identifier]
    })

    setTouches(tempTouches);
  }

  return (
    <Container 
      className="App"
      onTouchStart={e => touchStart(e)}
      onTouchMove={e => touchMove(e)}
      onTouchEnd={e => touchEnd(e)}
      onTouchCancel={e => touchEnd(e)}
    >
      {Object.keys(touches).length !== 0 && Object.entries(touches).map(([index, element]:Array<any>)=>(
              
        <div  
          style={{
            position: "absolute", 
            top: `${parseInt(element.positionY)-60}px`, 
            left: `${parseInt(element.positionX)-60}px`,
            borderTop: "12px solid black",
            borderRight: "12px solid #d1d1d1",
            borderBottom: "12px solid black",
            borderLeft: "12px solid #d1d1d1",
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
