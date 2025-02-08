import React from "react";
import { CiFolderOn } from "react-icons/ci";
import FileMenu from "./FileMenu/FileMenu";

const data = {
  id: "root",
  name: "root",
  type: "folder",
  children: [
    {
      id: "folder1",
      name: "folder1",
      type: "folder",
      children: [
        { id: "file1", name: "file1.txt", type: "file" },
        { id: "file2", name: "file2.txt", type: "file" },
        {
          id: "folder1.1",
          name: "folder 1.1",
          type: "folder",
          children: [
            { id: "file3", name: "file3.txt", type: "file" },
            { id: "file4", name: "file4.txt", type: "file" },
          ],
        },
      ],
    },
    {
      id: "folder2",
      name: "folder2",
      type: "folder",
      children: [
        {
          id: "subfolder",
          name: "subfolder",
          type: "folder",
          children: [{ id: "file5", name: "file3.txt", type: "file" }],
        },
        { id: "file6", name: "file4.txt", type: "file" },
      ],
    },
    { id: "file7", name: "file5.txt", type: "file" },
  ],
};

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100 ">
      <FileMenu data={data} />
    </div>
  );
}

export default App;
