import React from "react";
import './ImageLinkForm.css';

const ImageLinkForm = ({ onInputChange, onButtonSubmit }) => {
  return (
    <div>
      <p className='f3'>
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className='flex justify-center'>
        <div className='bg-pattern pa4 br3 shadow-5'>
          <input onChange={onInputChange} className='w-70 f4 pa2' type="text" />
          <button onClick={onButtonSubmit} className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer'>Detect</button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;