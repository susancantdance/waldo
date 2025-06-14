import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";
import { useRef, useState, useEffect } from "react";

function Drawing({ found, setFound }) {
  const myImg = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showhide, setShowhide] = useState(false);
  const [cssPos, setCssPos] = useState({ left: 0, top: 0 });
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  const [leader, setLeader] = useState(false);
  const [modal, setModal] = useState(true);

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

  const startGame = () => {
    if (modal == true) {
      setModal(false);
    }
    // send start time to backend
  };

  const showMenu = (event) => {
    if (showhide == true) {
      //if they're clicking away when menu is already open
      setShowhide(false);
    } else if (modal == false) {
      //otherwise show the menu
      //setPositions calculates where click is in image based on viewport
      setPositions({
        x: Math.round(100 * (event.clientX / dimensions.width)),
        y: Math.round(
          (100 *
            (event.clientY - (window.innerHeight - dimensions.height) / 2)) /
            dimensions.height
        ),
      });
      console.log("x" + positions.x + "y" + positions.y);
      //setCssPos sets where the user clicks so menu appears at same point
      setCssPos({
        left: event.clientX,
        top: event.clientY,
      });
      setShowhide(true);
    }
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

    //if all are true and game is over
    if (Object.values(temp).reduce((acc, curr) => acc * curr) == 1) {
      let userinput = prompt("congrats! you found em all!", "enter name");
      //send userinput to backend
      setLeader(true);
    }

    //close menu after guess
    setShowhide(false);
  };

  return (
    <>
      {/* where's whiskers image */}
      <img ref={myImg} src={waldo} onClick={showMenu}></img>

      {/* Pop-up menu */}
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
      </div>

      {/* leaderboard */}
      <div className={`${styles.leader} ${leader ? styles.show : styles.hide}`}>
        <div className={styles.leadertitle}>🐈 Whiskers Leaderboard 🐈</div>
        {/* grab leaderboard from backend */}
      </div>

      {/* start modal */}
      <div
        className={`${styles.welcome} ${modal ? styles.show : styles.hide}`}
        onClick={startGame}
      >
        <h1>Start Game</h1>
      </div>
    </>
  );
}

export { Drawing };
