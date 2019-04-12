import './ImageLinkForm.css';

const ImageLinkForm = ({ onImageLinkChange, onPictureSubmit }) => {
  return (
    <div>
      <p className="f3">
        {'This Magic Brain will detect faces in your pictures. Give it a try!'}
      </p>
      <div className="flex justify-center">
        <div className="w-50 bg-pattern pa4 br3 shadow-5">
          <input
            onChange={onImageLinkChange}
            className="w-70 f5 pa2"
            type="text"
          />
          <button
            onClick={onPictureSubmit}
            className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple pointer">
            Detect
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageLinkForm;
