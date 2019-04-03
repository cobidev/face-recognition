import React from "react";
import Tilt from "react-tilt";
import brain from './brain.png';
import './Logo.css';

const Logo = () => {
  return (
    <div className="flex justify-center ma4 mt0">
      <Tilt className="Tilt br2 shadow-2" options={{ max: 25 }} style={{ height: 150, width: 150 }}>
        <div className="Tilt-inner pa3">
          <img style={{ paddingTop: '10px' }} src={brain} alt="Logo"/>
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;