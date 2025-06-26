import { useState } from "react";
import "./App.css";
// import waldo from "./assets/waldo.jpg";
import { Drawing } from "./drawing.jsx";
import { Legend } from "./legend.jsx";
import { Footer } from "./footer.jsx";

function App() {
  const [found, setFound] = useState({
    piggy: false,
    bunbun: false,
    whiskers: false,
    crybear: false,
    duke: false,
  });
  const [headerHeight, setHeaderheight] = useState(0);

  return (
    <>
      <div className="modal"></div>
      <div className="container">
        <Legend found={found} setHeaderheight={setHeaderheight}></Legend>
        <Drawing
          found={found}
          setFound={setFound}
          headerHeight={headerHeight}
        ></Drawing>
        {/* <Footer></Footer> */}
      </div>
    </>
  );
}

export default App;
