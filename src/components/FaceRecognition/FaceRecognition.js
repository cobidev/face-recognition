import React from 'react';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, box }) => {
  return (
    <div className="flex justify-center ma">
      <div className="absolute mt2">
        <img
          id="inputImage"
          width="500px"
          height="auto"
          src={imageUrl}
          alt=""
        />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            left: box.leftCol,
            bottom: box.bottomRow,
            right: box.rightCol
          }}
        />
      </div>
    </div>
  );
};

export default FaceRecognition;
