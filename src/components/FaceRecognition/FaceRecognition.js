import React from 'react';

const FaceRecognition = ({ imageUrl }) => {
  return (
    <div className='flex justify-center ma'>
      <div className='absolute mt2'>
        <img width='500px' height='auto' src={ imageUrl } alt='' />
      </div>
      
    </div>
  );
};

export default FaceRecognition;
