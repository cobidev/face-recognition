import React from "react";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      username: "",
      password: ""
    };
  }

  onNameChange = event => {
    this.setState({ name: event.target.value });
  };

  onUsernameChange = event => {
    this.setState({ username: event.target.value });
  };

  onPasswordChange = event => {
    this.setState({ password: event.target.value });
  };

  onSubmitRegister = () => {
    fetch("https://face-recognition-api-cobimr.herokuapp.com/register", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: this.state.name,
        username: this.state.username,
        password: this.state.password
      })
    })
      .then(res => res.json())
      .then(user => {
        if (user._id) {
          this.props.loadUser(user);
          this.props.onRouteChange("home")
        }
      }).catch(err => console.log(err));
  };

  render() {
    return (
      <article className="bg-white br3 center mw6 shadow-5 ba b--black-10 mv4 ">
        <main className="pa4 black-80">
          <div className="measure center">
            <div id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f1 center fw6 ph0 mh0">Register</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  onChange={this.onNameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                  type="text"
                  name="name"
                  id="name"
                />
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="username">
                  Username
                </label>
                <input
                  onChange={this.onUsernameChange}
                  className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                  type="text"
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
                  className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                  type="password"
                  name="password"
                  id="password"
                />
              </div>
            </div>
            <div className="">
              <input
                onClick={this.onSubmitRegister}
                className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
                type="submit"
                value="Register"
              />
            </div>
          </div>
        </main>
      </article>
    );
  }
}

export default Register;
