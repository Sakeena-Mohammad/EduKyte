import axios from "axios";

import React, { Fragment, useState } from "react";
const FileView = () => {
  const [retrivedFileData, setRetrivedFile] = useState({});
  const [filename, setFilename] = useState("");

  const onChange = e => {
    setFilename(e.target.value);
  };

  const onSubmit = async e => {
    e.preventDefault();

    let res = await axios.post("/retrive", { filename });
    if (res) {
      setRetrivedFile(res.data);
    } else {
      console.log("error");
    }
    retrivedFileData.path = "/uploads/" + filename;
  };
  return (
    <Fragment>
      <div className="container mt-4">
        <h4 className="display-4 text-center mb-4">
          <i className="fab fa-react" /> File viewer
        </h4>
        <form onSubmit={onSubmit}>
          First name:
          <br />
          <input type="text" placeholder="File name" onChange={onChange} />
          <br />
          <input type="submit" />
          <div className="col-md-6 m-auto">
            <h3 className="text-center">{retrivedFileData.name}</h3>
            <embed
              src={retrivedFileData.path}
              type="application/pdf"
              width="100%"
              height="600px"
            />
          </div>
        </form>
      </div>
    </Fragment>
  );
};

export default FileView;
