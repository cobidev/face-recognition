// Components
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import SignIn from "./components/SignIn/SignIn";
import Register from "./components/Register/Register";
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

// Particles config
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

// App component
class App extends Component {
  constructor() {
    super();
    this.state = {
      input: "",
      imageUrl: "",
      box: {},
      route: 'signin',
      isSignedIn: false
    };
  }

  // METHOD: When the user change from routes, check if they are SignedIn or not. And Set the state of the current route
  onRouteChange = (route) => {
    if (route === 'signin' || route === 'register') {
      this.setState({ isSignedIn: false })
    } else {
      this.setState({ isSignedIn: true })
    }
    this.setState({ route: route });
  }

  // METHOD: to get the url of the image when the user types in the input form
  onInputChange = (event) => {
    // set the input state from the input value in ImageLinkForm
    this.setState({ input: event.target.value });
  };

  // METHOD: when the user submit the face detect button
  onButtonSubmit = () => {
    // set image url from the input state
    this.setState({ imageUrl: this.state.input });
    // trigger the Clarifai API to detect face from the input (imageUrl) state an get the response (face regions)
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => {
        // get the obtained measurements of the face (object) by calculating the response on the calculateFace function
        const faceMeasurements = this.calculateFaceDetection(response);
        // set the state {box} of the given faceMeasurements to implemente later on the HTML
        this.setState({ box: faceMeasurements });
      })
      .catch(err => console.log(err));
  };

  // Function: that return an Object with the converted Face Measurements for the HTML/CSS use (in percentajes)
  calculateFaceDetection = (data) => {
    const faceRegions = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: faceRegions.left_col * width,
      topRow: faceRegions.top_row * height,
      rightCol: width - (faceRegions.right_col * width),
      bottomRow: height - (faceRegions.bottom_row * height)
    }
  };

  // Final Rendering
  render() {
    return (
      <div className="App">
        <Particles params={PARTICLE_OPTIONS} className="particles" />
        <Navigation isSignedIn={this.state.isSignedIn} onRouteChange={this.onRouteChange}/>
        { /* If the route is Home, return the app components. Otherwise if return if they are in Signin or Register route*/
          this.state.route === 'home' ?
            <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit} />
              <FaceRecognition box={this.state.box} imageUrl={this.state.imageUrl} />
            </div>
            : this.state.route === 'signin' ? <SignIn onRouteChange={this.onRouteChange} /> : <Register onRouteChange={this.onRouteChange} />
        }
      </div>
    );
  }
}

export default App;
