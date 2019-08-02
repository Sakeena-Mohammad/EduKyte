import React, { Fragment, useState } from "react";
import Message from "./Message";
import Progress from "./Progress";
import axios from "axios";

const FileUpload = () => {
  //hooks used to store data regarding file
  const [file, setFile] = useState("");
  const [filename, setFilename] = useState("Choose File");
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState("");
  const [uploadPercentage, setUploadPercentage] = useState(0);

  //function to set the filename and file to variables when chosen
  const onChange = e => {
    setFile(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  //when file is submitted to upload
  const onSubmit = async e => {
    e.preventDefault();
    //adding file to form data to send to the server
    const formData = new FormData();
    formData.append("file", file);

    try {
      //post request made to the server with the file as request
      const res = await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        },
        //code to show the percentage animation
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );

          // Clear percentage
          setTimeout(() => setUploadPercentage(0), 10000);
        }
      });

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });
      setMessage("File Uploaded");
    } catch (err) {
      if (err.response.status === 500) {
        setMessage("There was a problem with the server");
      } else {
        setMessage(err.response.data.msg);
      }
    }
  };
  //returning html to app.js to be displayed on the browser
  return (
    <Fragment>
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react" /> React File Upload
        </h4>
        {message ? <Message msg={message} /> : null}
        <form onSubmit={onSubmit}>
          <div className="custom-file mb-4">
            <input
              type="file"
              className="custom-file-input"
              id="customFile"
              onChange={onChange}
            />
            <label className="custom-file-label" htmlFor="customFile">
              {filename}
            </label>
          </div>

          <Progress percentage={uploadPercentage} />

          <input
            type="submit"
            value="Upload"
            className="btn btn-primary btn-block mt-4"
          />
        </form>
      </div>
      {uploadedFile ? (
        <div className="row mt-5">
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{uploadedFile.fileName}</h3>
            <embed
              src={uploadedFile.filePath}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
