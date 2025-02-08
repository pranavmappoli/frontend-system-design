import React, { useState } from "react";
import { FaFolderMinus } from "react-icons/fa6";
import { FaFolderOpen } from "react-icons/fa6";
import { CiFolderOn } from "react-icons/ci";
function FileMenu({ data }) {
  return (
    <div className="flex flex-col gap-4 p-4 bg-green-500 rounded-lg">
      {data.children?.map((item) => (
        <MenuItem item={item} key={item.id} />
      ))}
    </div>
  );
}

function MenuItem({ item }) {
  const [expand, setExpand] = useState(false);
  return (
    <div className="ml-4 text-white">
      {item.type === "folder" ? (
        <div className="flex gap-2">
          <button onClick={() => setExpand((prev) => !prev)}>
            {expand ? "^" : ">"} {item.name}
          </button>
        </div>
      ) : (
        <div>{item.name}</div>
      )}
      {expand &&
        item.children?.map((data) => <MenuItem item={data} key={data.id} />)}
    </div>
  );
}

export default FileMenu;
