import React from "react";

const Navigation = ({ onRouteChange, isLoggedIn }) => {
  if (isLoggedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange('login')} className='f3 link dim black pa3 underline pointer'> Log Out </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 underline pointer'> Register </p>
        <p onClick={() => onRouteChange('login')} className='f3 link dim black pa3 underline pointer'> Log In </p>
      </nav>
    );
  }
};

export default Navigation;