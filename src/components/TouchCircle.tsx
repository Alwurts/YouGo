  interface TouchProps {
    color: String,
    positionX: string,
    positionY: string,
    allBlack: boolean
  }
  
  const TouchCircle: React.FC<TouchProps> = ({ color, allBlack, positionX, positionY }) => {
  
    return (
      <div  
        style={{
          position: "absolute", 
          top: `${parseInt(positionY)-60}px`, 
          left: `${parseInt(positionX)-60}px`,
          borderTop: "12px solid black",
          borderRight: `12px solid ${allBlack ? "black" : "#d1d1d1"}`,
          borderBottom: "12px solid black",
          borderLeft: `12px solid ${allBlack ? "black" : "#d1d1d1"}`,
          background: `${color}`,
          width: "120px",
          height: "120px",
          borderRadius: "60%",
        }} 
      />
    );
  };
  
  export default TouchCircle;