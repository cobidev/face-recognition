// Components
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

// Styles
import "tachyons";
import "./App.css";

// Clarifai config
const Clarifai = require("clarifai");
const app = new Clarifai.App({
  apiKey: "f51b1b849d1041cc8dd2fd2cb149e3de"
});

// Particles configuration
const PARTICLE_OPTIONS = {
  particles: {
    number: {
      value: 30,
      density: {
        enable: true,
        value_area: 300
      }
    }
  }
};

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: ""
    };
  }

  onInputChange = event => {
    // set the input state from the input value in ImageLinkForm
    this.setState({ input: event.target.value });
  };

  onButtonSubmit = event => {
    // set image url from the input state
    this.setState({ imageUrl: this.state.input });

    // trigger the Clarifai API to detect face from the input (imageUrl) state an get the response
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input).then(
      function(response) {
        console.log(response.outputs[0].data.regions[0].region_info.bounding_box);
      },
      function(err) {
        throw err;
      }
    );
  };

  // Render the App JSX
  render() {
    return (
      <div className="App">
        <Particles params={PARTICLE_OPTIONS} className="particles" />
        <Navigation />
        <Logo />
        <Rank />
        <ImageLinkForm
          onInputChange={this.onInputChange}
          onButtonSubmit={this.onButtonSubmit}
        />
        <FaceRecognition imageUrl={this.state.imageUrl} />
      </div>
    );
  }
}

export default App;
