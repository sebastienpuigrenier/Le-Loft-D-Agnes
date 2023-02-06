import React, { useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { MdDeleteForever } from "react-icons/md";
import photoSample from '../../../img/sample.png';

export const UploadImageForm = ({ imageFile, setImageFile, defaultPhoto }) => {

  const photo = defaultPhoto ? defaultPhoto : photoSample;
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    multiple: false,
    accept: { "image/*": [] },
    onDrop: (acceptedFiles) => {
      setImageFile(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = () => {
    if (imageFile.length > 0) {
      return imageFile.map((file, index) => (
        <img
          key={index}
          alt="nouvelle photo"
          src={file.preview}
          // Revoke data url after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      ));
    }
    return "";
  };

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => imageFile.forEach((file) => URL.revokeObjectURL(file.preview));
  }, []);

  const resetForm = () => {
    setImageFile([]);
  };

  const insideSection = () => {
    switch (true) {
    case isDragActive && imageFile.length < 1:
      return (
        <div className="dropzone-content">
          <div>
            <img src={photo}/>
            <p>lachez ici</p>
          </div>
        </div>
      );
    case !isDragActive && imageFile.length < 1:
      return (
        <div className="dropzone-content">
          <div>
            <img src={photo}/>
            <p>Déposer votre photo ici</p>
          </div>
        </div>
      );
    case imageFile.length > 0:
      return <div className="dropzone-content">{thumbs()}</div>;
    default:
      return "";
    }
  };

  return (
    <>
      {/* eslint-disable */}
      <div {...getRootProps({ className: 'dropzone' })}>
        <input className="input-zone" name="input-zone" {...getInputProps()} />
        {/* eslint-enable */}
        {insideSection()}
      </div>
      <button
        type="button"
        className="dropzone-reset_button"
        onClick={resetForm}
        style={{ float: "right" }}
      >
        <MdDeleteForever />
      </button>
    </>
  );
};

export default UploadImageForm;
