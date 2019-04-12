import React from "react";

class Navigation extends React.Component {
  onLogoutSubmit = () => {
    fetch("https://face-recognition-api-cobimr.herokuapp.com/logout", {
      method: "post"
    })
      .then(res => res.json())
      .then(status => {
        if (status === "success") {
          this.props.resetState();
          return this.props.onRouteChange("login");
        }
      })
      .catch(err => console.log(err.message));
  };

  render() {
    if (this.props.isLoggedIn) {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={this.onLogoutSubmit}
            className="f3 link dim black pa3 underline pointer">
            Log Out
          </p>
        </nav>
      );
    } else {
      return (
        <nav style={{ display: "flex", justifyContent: "flex-end" }}>
          <p
            onClick={() => this.props.onRouteChange("register")}
            className="f3 link dim black pa3 underline pointer">
            Register
          </p>
          <p
            onClick={() => this.props.onRouteChange("login")}
            className="f3 link dim black pa3 underline pointer">
            Log In
          </p>
        </nav>
      );
    }
  }
}

export default Navigation;
