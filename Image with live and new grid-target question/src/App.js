import React from "react";
const data = {
  live: [
    {
      requested_position: 1,
      existing_publish_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
    },
    {
      requested_position: 2,
      existing_publish_url:
        "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885_1280.jpg",
    },
  ],
  new: [
    {
      requested_position: 1,
      existing_publish_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoFRQjM-wM_nXMA03AGDXgJK3VeX7vtD3ctA&s",
    },
    {
      requested_position: 1,
      existing_publish_url:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQJxo2NFiYcR35GzCk5T3nxA7rGlSsXvIfJwg&s",
    },
    {
      requested_position: 2,
      existing_publish_url:
        "https://cdn.pixabay.com/photo/2016/03/09/09/22/lake-1246655_1280.jpg",
    },
    {
      requested_position: 3,
      existing_publish_url:
        "https://cdn.pixabay.com/photo/2014/02/27/16/10/tree-276014_1280.jpg",
    },
  ],
};

const App = () => {
  const imageGroupById = {};
  data["live"].forEach((item) => {
    imageGroupById[item.requested_position] =
      imageGroupById[item.requested_position] || {};
    imageGroupById[item.requested_position]["live"] =
      imageGroupById[item.requested_position]["live"] || [];
    imageGroupById[item.requested_position]["live"].push(
      item.existing_publish_url
    );
  });
  data["new"].forEach((item) => {
    imageGroupById[item.requested_position] =
      imageGroupById[item.requested_position] || {};
    imageGroupById[item.requested_position]["new"] =
      imageGroupById[item.requested_position]["new"] || [];
    imageGroupById[item.requested_position]["new"].push(
      item.existing_publish_url
    );
  });

  return (
    <div className="p-8">
      <div className="flex gap-4 bg-green-400">
        {Object.keys(imageGroupById).map((key) => {
          return (
            <ImageGrid
              liveImages={imageGroupById[key].live}
              newImages={imageGroupById[key].new}
            />
          );
        })}
      </div>
    </div>
  );
};

const ImageGrid = ({ liveImages, newImages }) => {
  return (
    <div className="flex flex-col bg-yellow-500">
      {liveImages?.map((image) => (
        <div className="w-40 h-40 bg-red-100">
          <img src={image} alt="" />
        </div>
      ))}
      <div className="flex gap-2">
        {newImages?.map((image) => (
          <div className="w-40 h-40 bg-red-100">
            <img src={image} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
