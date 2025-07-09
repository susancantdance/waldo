import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";

function Whiskers({ myImg, showMenu, handleImg }) {
  return (
    <div className={styles.imgdiv}>
      <img ref={myImg} src={waldo} onClick={showMenu} onLoad={handleImg}></img>
    </div>
  );
}

export { Whiskers };
