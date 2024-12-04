import React from "react";
import Carousel from "./carousel/Carousel";
import img1 from "./assets/img1.jpeg";
import img2 from "./assets/img2.jpeg";
import img3 from "./assets/img3.jpeg";
import img4 from "./assets/img4.jpeg";

function App() {
  return (
    <div className="flex items-center justify-center w-screen h-screen bg-blue-100 ">
      <Carousel>
        <Carousel.Image>
          <img src={img1} alt="img1" />
        </Carousel.Image>
        <Carousel.Image>
          <img src={img2} alt="img1" />
        </Carousel.Image>
        <Carousel.Image>
          <img src={img3} alt="img1" />
        </Carousel.Image>
        <Carousel.Image>
          <img src={img4} alt="img1" />
        </Carousel.Image>
      </Carousel>
    </div>
  );
}

export default App;
