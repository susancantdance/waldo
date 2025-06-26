import waldo from "./assets/waldo.jpg";
import styles from "./drawing.module.css";
import { useRef, useState, useEffect } from "react";

function Drawing({ found, setFound, headerHeight }) {
  const myImg = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [showhide, setShowhide] = useState(false);
  const [cssPos, setCssPos] = useState({ left: 0, top: 0 });
  const [positions, setPositions] = useState({ x: 0, y: 0 });
  const [leader, setLeader] = useState(false);
  const [modal, setModal] = useState(true);
  const [userId, setUserid] = useState(0);
  const [top, setTop] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/delete`, {
      method: "DELETE",
    }).then((response) => response.json());
  }, []);

  //Effect to make sure dimensions are accurate if resized / different viewports
  //   useEffect(() => {
  //     if (myImg.current) {
  //       const observer = new ResizeObserver((entries) => {
  //         for (let entry of entries) {
  //           setDimensions({
  //             width: entry.contentRect.width,
  //             height: entry.contentRect.height,
  //           });
  //           console.log("img width " + entry.contentRect.width);
  //           console.log("img height " + entry.contentRect.height);
  //         }
  //       });

  //       observer.observe(myImg.current);

  //       return () => {
  //         observer.disconnect();
  //       };
  //     }
  //   }, []);

  const handleImg = (event) => {
    setDimensions({
      width: event.target.clientWidth,
      height: event.target.clientHeight,
    });
    console.log("img width " + event.target.clientWidth);
    console.log("img height " + event.target.clientHeight);
  };

  const startGame = async () => {
    //if start game is open or leaderboard is open
    if (modal == true || leader == true) {
      // send start time to backend

      try {
        const response = await fetch(`http://localhost:3000`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ start: Date.now() }),
        });
        setUserid(await response.json());
        console.log(userId);
        setModal(false);
        setLeader(false);
        setFound({
          piggy: false,
          bunbun: false,
          whiskers: false,
          crybear: false,
          duke: false,
        });
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
      console.log("client-x " + event.clientX);
      console.log("client-y " + event.clientY);

      console.log("header height " + headerHeight);

      setPositions({
        x: Math.round(100 * (event.clientX / dimensions.width)),
        y: Math.round(
          (100 * (event.clientY - headerHeight)) / dimensions.height
        ),
      });
      console.log("position-x" + positions.x + "position-y" + positions.y);
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
          let winner = prompt("congrats! you found em all!", "enter name");
          //send userinput to backend
          sendWinner(winner);
          setLeader(true);
        }
      } else {
        console.log("SORRY TRY AGAIN");
        alert("Nope! Try again!");
      }
    } catch (err) {
      console.log(JSON.stringify(err));
      alert("theres been an error");
    }

    //close menu after guess
    setShowhide(false);
  };

  const sendWinner = async (winner) => {
    console.log(`winner ${winner} and id : ${userId}`);
    try {
      const response = await fetch(`http://localhost:3000/winner`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: userId, name: winner }),
      });
      //   let data = await response.json();
      console.log(response.status);
      getTop();
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  const getTop = async () => {
    try {
      const response = await fetch(`http://localhost:3000/leader`, {
        method: "GET",
      });
      let data = await response.json();
      data.leaders.forEach((leader) => {
        leader.time = Math.floor(
          (new Date(leader.end) - new Date(leader.start)) / 1000
        );
      });
      data.leaders.sort((a, b) => a.time - b.time);
      data.leaders.splice(10);
      setTop(data.leaders);
      console.log(data.leaders);
    } catch (err) {
      console.log(JSON.stringify(err));
    }
  };

  return (
    <>
      {/* where's whiskers image */}
      <img ref={myImg} src={waldo} onClick={showMenu} onLoad={handleImg}></img>

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
        <div className={styles.leadertop}>
          <div className={styles.leadertitle}>🐈 Whiskers Leaderboard 🐈</div>
          {/* grab leaderboard from backend */}
          <div className={styles.leaderlist}>
            <div className={styles.leadercolumn}>
              <span>Player</span>
              <span>Seconds</span>
            </div>
            {top.map((player) => {
              return (
                <div className={styles.leaderline} key={player.id}>
                  <span>{player.name}</span>
                  <span>{player.time}</span>
                </div>
              );
            })}
          </div>
        </div>
        <div className={styles.playagain} onClick={startGame}>
          Play Again!
        </div>
      </div>

      {/* start modal */}
      <div
        className={`${styles.welcome} ${modal ? styles.show : styles.hide}`}
        onClick={startGame}
      >
        <span className={styles.start}>Start Game</span>
      </div>
    </>
  );
}

export { Drawing };
