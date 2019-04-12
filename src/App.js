// Components
import React, { Component } from "react";
import Particles from "react-particles-js";
import Navigation from "./components/Navigation/Navigation";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Logo from "./components/Logo/Logo";
import Rank from "./components/Rank/Rank";
import ImageLinkForm from "./components/ImageLinkForm/ImageLinkForm";
import FaceRecognition from "./components/FaceRecognition/FaceRecognition";

// Styles
import "tachyons";
import "./App.css";

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
      route: "login",
      isLoggedIn: false,
      user: {
        _id: "",
        name: "",
        username: "",
        entries: 0,
        joined: ""
      }
    };
  }

  loadUser = userDB => {
    this.setState({
      user: {
        _id: userDB._id,
        name: userDB.name,
        username: userDB.username,
        entries: userDB.entries,
        createdAt: userDB.createdAt
      }
    });
  };

  resetState = () => {
    this.setState({
      input: "",
      imageUrl: "",
      box: {},
      route: "login",
      isLoggedIn: false,
      user: {
        _id: "",
        name: "",
        username: "",
        entries: 0,
        joined: ""
      }
    });
  };

  // METHOD: When the user change from routes, check if they are SignedIn or not. And Set the state of the current route
  onRouteChange = route => {
    if (route === "login" || route === "register") {
      // reset the current User cuz is not logged in
      this.resetState();
      this.setState({ isLoggedIn: false });
    } else {
      this.setState({ isLoggedIn: true });
    }
    this.setState({ route: route });
  };

  // METHOD: to get the url of the image when the user types in the input form
  onImageLinkChange = event => {
    // set the input state from the input value in ImageLinkForm
    this.setState({ input: event.target.value });
  };

  // METHOD: when the user submit the face detect button
  onPictureSubmit = () => {
    this.setState({ imageUrl: this.state.input });

    // Fecth API among Clarifai to detect face from the input (Image URL) an get the response (face regions)
    fetch("https://dry-lowlands-90592.herokuapp.com/image-url", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          // get the obtained measurements of the face (object) by calculating the response on the calculateFace function
          let faceMeasurements = this.calculateFaceDetection(response);
          // set the state {box} of the given faceMeasurements to implemente later on the HTML
          this.setState({ box: faceMeasurements });

          // Increase entries for the current user
          fetch("https://dry-lowlands-90592.herokuapp.com/image-entrie", {
            method: "put",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              _id: this.state.user._id
            })
          })
            .then(response => response.json())
            .then(userDB => {
              // update current user state ( only the entries propertie)
              let user = { ...this.state.jasper };
              user.entries = userDB.entries;
              this.setState({ user });
              // return the updated user
              return this.loadUser(userDB);
            })
            .catch(err => console.log(err));
        }
      })
      .catch(err => console.log(err));
  };

  // Function: that return an Object with the converted Face Measurements for the HTML/CSS use (in percentajes)
  calculateFaceDetection = data => {
    const faceRegions =
      data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputImage");
    const width = Number(image.width);
    const height = Number(image.height);

    return {
      leftCol: faceRegions.left_col * width,
      topRow: faceRegions.top_row * height,
      rightCol: width - faceRegions.right_col * width,
      bottomRow: height - faceRegions.bottom_row * height
    };
  };

  // Final Rendering
  render() {
    return (
      <div className="App">
        <Particles params={PARTICLE_OPTIONS} className="particles" />
        <Navigation
          resetState={this.resetState}
          isLoggedIn={this.state.isLoggedIn}
          onRouteChange={this.onRouteChange}
        />
        {/* If the route is Home, return the app components. Otherwise if return if they are in Signin or Register route*/
        this.state.route === "home" ? (
          <div>
            <Logo />
            <Rank
              name={this.state.user.name}
              entries={this.state.user.entries}
            />
            <ImageLinkForm
              onImageLinkChange={this.onImageLinkChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition
              box={this.state.box}
              imageUrl={this.state.imageUrl}
            />
          </div>
        ) : this.state.route === "login" ? (
          <Login loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        ) : (
          <Register
            loadUser={this.loadUser}
            onRouteChange={this.onRouteChange}
          />
        )}
      </div>
    );
  }
}

export default App;
