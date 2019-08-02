import React from "react";
import FileUpload from "./components/FileUpload";
import FileViewer from "./components/FileViewer";

import "./App.css";
//main app that populates the reactfron end
const App = () => (
  <div>
    <FileUpload />
    <FileViewer />
  </div>
);

export default App;
