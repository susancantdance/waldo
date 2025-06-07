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

  return (
    <>
      <div className="container">
        <Legend found={found} setFound={setFound}></Legend>
        <Drawing found={found} setFound={setFound}></Drawing>
        {/* <Footer></Footer> */}
      </div>
    </>
  );
}

export default App;
