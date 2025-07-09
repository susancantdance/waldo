import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";
import { useRef } from "react";

function Whiskers({ showMenu, handleImg, landscape, setDimensions }) {
  const myImg = useRef(null);
  console.log(`landscape ${landscape}`);

  setDimensions({
    width: myImg.current.offsetWidth,
    height: myImg.current.offsetHeight,
  });

  return (
    <div className={styles.imgdiv}>
      <img ref={myImg} src={waldo} onClick={showMenu} onLoad={handleImg}></img>
    </div>
  );
}

export { Whiskers };
