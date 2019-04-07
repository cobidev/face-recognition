import React from "react";

const Navigation = ({ onRouteChange, isSignedIn }) => {
  if (isSignedIn) {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 underline pointer'> Log Out </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: "flex", justifyContent: "flex-end" }}>
        <p onClick={() => onRouteChange('register')} className='f3 link dim black pa3 underline pointer'> Register </p>
        <p onClick={() => onRouteChange('signin')} className='f3 link dim black pa3 underline pointer'> Sign In </p>
      </nav>
    );
  }
};

export default Navigation;