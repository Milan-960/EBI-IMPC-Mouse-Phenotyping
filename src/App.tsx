import { Fade } from "react-awesome-reveal";

import LandingPage from "./pages/LandingPage";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <div className="App">
      <Fade>
        <h2>Welcome to IMPC (International Mouse Phenotyping Consortium) </h2>
      </Fade>
      <LandingPage />
    </div>
  );
};

export default App;
