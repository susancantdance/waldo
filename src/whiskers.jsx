import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";

function Whiskers({ showMenu, handleImg, landscape }) {
  console.log(`landscape ${landscape}`);

  //   setDimensions({
  //     width: myImg.current.offsetWidth,
  //     height: myImg.current.offsetHeight,
  //   });

  return (
    <div className={styles.imgdiv}>
      <img src={waldo} onClick={showMenu} onLoad={handleImg}></img>
    </div>
  );
}

export { Whiskers };
