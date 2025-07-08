import { useState, useEffect } from "react";
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

  useEffect(() => {
    const handleOrientationChange = () => {
      // Reload the page when orientation changes
      window.location.reload();
    };

    // Add event listener for orientation changes
    // Alternatively, you could use 'resize' event for broader compatibility
    window.addEventListener("orientationchange", handleOrientationChange);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("orientationchange", handleOrientationChange);
    };
  }, []); // Empty dependency array ensures this effect runs only once on mount

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
