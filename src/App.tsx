import React, { useRef } from "react";
import { Fade } from "react-awesome-reveal";
import { Button } from "react-bootstrap";

import LandingPage from "./pages/LandingPage";
import Heatmap from "./pages/Heatmap";

import Logo from "./assets/img/IMPC-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  // Add a new ref for the heatmap section
  const heatmapRef = useRef<HTMLDivElement>(null);

  // Update the handleShowHeatmap function to use the heatmapRef
  const handleShowHeatmap = () => {
    if (heatmapRef.current) {
      heatmapRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="App">
      <div className="container">
        <nav className="app-logo">
          <Fade>
            <img src={Logo} alt={Logo} />
          </Fade>

          <Button variant="outline-primary" onClick={handleShowHeatmap}>
            Show Heatmap
          </Button>
        </nav>
      </div>

      <LandingPage />

      <section ref={heatmapRef}>
        <Heatmap />
      </section>
    </div>
  );
};

export default App;
