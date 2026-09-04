import React, { createContext, useContext, useState } from "react";

const FileManagerContext = createContext({});

function Folder({ file }) {
  const [open, setOpen] = useState(false);
  const { deleteNode, addNode } = useContext(FileManagerContext);

  const getNode = () => {
    return {
      type: "file",
      id: new Date().getMilliseconds(),
      name: new Date().getMilliseconds(),
    };
  };

  return (
    <div>
      <div className="flex gap-4">
        <div>{file?.name}</div>
        <button onClick={() => deleteNode(file.id)}>delete</button>
        {file.type === "folder" && (
          <>
            <button onClick={() => setOpen((prev) => !prev)}>^</button>
            <button onClick={() => addNode(file.id, getNode())}>add</button>
          </>
        )}
      </div>
      {open &&
        file?.children?.map((childFile) => (
          <div className="ml-8" key={childFile.id}>
            <Folder file={childFile} />
          </div>
        ))}
    </div>
  );
}

function FileManager({ files }) {
  const [filesData, setFilesData] = useState(files);

  const deleteFile = (id, data) => {
    const filteredData = data
      .filter((file) => file.id !== id)
      .map((file) => {
        if (file.type === "folder" && file.children) {
          return {
            ...file,
            children: deleteFile(id, file.children),
          };
        } else return file;
      });
    return filteredData;
  };

  const addNodeHelper = (folderId, node, data = filesData) => {
    const filteredData = data.map((file) => {
      if (file.type === "folder") {
        if (file.id === folderId) {
          return {
            ...file,
            children: [...(file.children || []), node],
          };
        }
        return {
          ...file,
          children: addNodeHelper(folderId, node, file.children),
        };
      } else return file;
    });
    return filteredData;
  };

  const addNode = (folderId, node) => {
    setFilesData(addNodeHelper(folderId, node, filesData));
  };

  const deleteNode = (id) => {
    setFilesData(deleteFile(id, filesData));
  };
  //   debugger;
  return (
    <FileManagerContext.Provider value={{ deleteNode, addNode }}>
      {filesData.map((file) => (
        <Folder file={file} key={file.id} />
      ))}
    </FileManagerContext.Provider>
  );
}

export default FileManager;
