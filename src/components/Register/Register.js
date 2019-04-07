import React from "react";

const Register = ({ onRouteChange }) => {
  return (
    <article className="bg-white br3 center mw6 shadow-5 ba b--black-10 mv4 ">
      <main className="pa4 black-80">
        <form className="measure center">
          <div id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f1 center fw6 ph0 mh0">Register</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                type="text"
                name="name"
                id="name"
              />
            </div>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="email-address">
                Email
              </label>
              <input
                className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                type="email"
                name="email-address"
                id="email-address"
              />
            </div>
            <div className="mv3">
              <label className="db fw6 lh-copy f6" htmlFor="password">
                Password
              </label>
              <input
                className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-60"
                type="password"
                name="password"
                id="password"
              />
            </div>
          </div>
          <div className="">
            <input
              onClick={() => onRouteChange('home')}
              className="b br2 ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib"
              type="submit"
              value="Register"
            />
          </div>
        </form>
      </main>
    </article>
  );
};

export default Register;
