import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";
import { useRef, useState, useEffect } from "react";

function Drawing({ found, setFound }) {
  const myImg = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showhide, setShowhide] = useState(false);
  const [cssPos, setCssPos] = useState({ left: 0, top: 0 });
  const [positions, setPositions] = useState({ x: 0, y: 0 });

  //Effect to make sure dimensions are accurate if resized / different viewports
  useEffect(() => {
    if (myImg.current) {
      const observer = new ResizeObserver((entries) => {
        for (let entry of entries) {
          setDimensions({
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
        }
      });

      observer.observe(myImg.current);

      return () => {
        observer.disconnect();
      };
    }
  }, []);

  const showMenu = (event) => {
    setPositions({
      x: Math.round(100 * (event.clientX / dimensions.width)),
      y: Math.round(
        (100 * (event.clientY - (window.innerHeight - dimensions.height) / 2)) /
          dimensions.height
      ),
    });
    console.log("x" + positions.x + "y" + positions.y);
    setCssPos({
      left: event.clientX,
      top: event.clientY,
    });
    setShowhide(true);
  };

  const submitGuess = (name) => {
    console.log("is " + name + " at " + positions.x + " " + positions.y);

    /* is it correct? */

    //IF user guesses correctly----------//
    let temp = { ...found };
    Object.keys(temp).forEach((key) => {
      if (key == name) {
        console.log(key + " " + name);
        temp[key] = true;
      }
    });
    setFound(temp);
    //IF User guesses correctly----------//

    setShowhide(false);
    console.log(found);
  };

  return (
    <>
      <img ref={myImg} src={waldo} onClick={showMenu}></img>
      <div
        className={`${styles.popup} ${showhide ? styles.show : styles.hide}`}
        style={cssPos}
      >
        <div className={styles.option} onClick={() => submitGuess("piggy")}>
          Piggy
        </div>
        <div className={styles.option} onClick={() => submitGuess("bunbun")}>
          Bunbun
        </div>
        <div className={styles.option} onClick={() => submitGuess("whiskers")}>
          Whiskers
        </div>
        <div className={styles.option} onClick={() => submitGuess("crybear")}>
          CryBear
        </div>
        <div className={styles.option} onClick={() => submitGuess("duke")}>
          Duke
        </div>
        <div className={styles.option} onClick={() => submitGuess("")}>
          Oops..n/m
        </div>
      </div>
    </>
  );
}

export { Drawing };
