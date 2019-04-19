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
        {box.length
          ? box.map((item, i) => {
              return (
                <div
                  key={i}
                  className="bounding-box"
                  style={{
                    top: item.topRow,
                    left: item.leftCol,
                    bottom: item.bottomRow,
                    right: item.rightCol
                  }}
                />
              )
            })
          : ''}
      </div>
    </div>
  );
};

export default FaceRecognition;
