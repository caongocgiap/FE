import React, { useState } from "react";
import axios from "../../utils/axiosCustomize";

const FileUpload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    console.log(file);
    const formData = new FormData();
    formData.append("file", file);

    axios
      .post("/api/upload", formData)
      .then((response) => {
        // Handle response from backend
      })
      .catch((error) => {
        // Handle error
      });
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
};

export default FileUpload;
