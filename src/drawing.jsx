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
  let userId;

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

  //

  const startGame = async () => {
    if (modal == true) {
      // send start time to backend
      try {
        const response = await fetch(`http://localhost:3000`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: Date.now() }),
        });
        userId = await response.json();
        console.log(userId);
        setModal(false);
      } catch (err) {
        console.error(JSON.stringify(err));
        alert("there has been an error!");
      }
    }
  };

  const showMenu = (event) => {
    if (showhide == true || leader == true) {
      //if they're clicking away when menu is already open OR leaderboard is open
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

  const submitGuess = async (name) => {
    console.log("is " + name + " at " + positions.x + " " + positions.y + "?");
    let coords;
    /* is it correct? get the coordinates of friend in question */
    try {
      const response = await fetch(`http://localhost:3000/guess`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name }),
      });
      console.log(response);
      coords = await response.json();
      console.log(coords);

      if (
        positions.x <= coords.x2 &&
        positions.x >= coords.x1 &&
        positions.y >= coords.y1 &&
        positions.y <= coords.y2
      ) {
        console.log("YOU FOUND " + name + "!!!!");
        //IF user guesses correctly, update who's been found----------//
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
          //   let userinput =
          prompt("congrats! you found em all!", "enter name");
          //send userinput to backend
          setLeader(true);
        }
      } else {
        console.log("SORRY TRY AGAIN");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      alert("theres been an error");
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
