import { Fade } from "react-awesome-reveal";
import { Button } from "react-bootstrap";

import LandingPage from "./pages/LandingPage";
import Heatmap from "./pages/Heatmap";

import Logo from "./assets/img/IMPC-logo.png";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  const handleShowHeatmap = () => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
  };

  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light app-logo">
        <a className="navbar-brand" href="/">
          <Fade>
            <img src={Logo} alt={Logo} />
          </Fade>
        </a>
        <Button variant="outline-primary" onClick={handleShowHeatmap}>
          Show Heatmap
        </Button>
      </nav>

      <LandingPage />

      <section>
        <Heatmap />
      </section>
    </div>
  );
};

export default App;
