import React from "react";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    };
  }

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitLogin = () => {
    fetch("http://localhost:3000/login", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user._id) {
          this.props.loadUser(user);
          return this.props.onRouteChange("home")
        }
        this.props.onRouteChange("login")
      });
  };

  render() {
    return (
      <article className="bg-white br3 center mw6 shadow-5 ba b--black-10 mv4 ">
        <main className="pa4 black-80">
          <div className="measure center">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 center fw6 ph0 mh0">Log In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email">
                  Username
                </label>
                <input
                  onChange={this.onUsernameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                  type="username"
                  name="username"
                  id="username"
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  onChange={this.onPasswordChange}
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="">
              <input
                onClick={this.onSubmitLogin}
                className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Log In"
              />
            </div>
            <div className="lh-copy mt3">
              <p
                onClick={() => this.props.onRouteChange("register")}
                href="#0"
                className="f6 pointer link dim black db"
              >
                Register
              </p>
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Login;
