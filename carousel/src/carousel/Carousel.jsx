import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";

const CarouselContext = createContext();
function Carousel({ children, width, height }) {
  const [crntIndx, setCrntIndx] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);
  const [imagesLength, setImagesLength] = useState(0);
  const imgRef = useRef();

  useEffect(() => {
    setContainerWidth(imgRef.current.offsetWidth);
    setImagesLength(React.Children.toArray(children).length);
  }, []);

  const prevBtnHandler = () => {
    if (crntIndx < 1) return;
    setCrntIndx((prev) => prev - 1);
  };
  const nextBtnHandler = () => {
    if (crntIndx + 1 >= imagesLength) return;
    setCrntIndx((prev) => prev + 1);
  };

  useEffect(() => {
    imgRef.current.scroll({
      left: crntIndx * containerWidth,
      behavior: "smooth",
    });
  }, [crntIndx, containerWidth]);

  //accessibility

  const handleKeyDown = (event) => {
    if (event.key === "ArrowRight") {
      nextBtnHandler();
    }
    if (event.key === "ArrowLeft") {
      prevBtnHandler();
    }
  };

  return (
    <CarouselContext.Provider value={{ crntIndx }}>
      <div className="relative w-[900px] h-[600px]">
        <div
          onKeyDown={handleKeyDown}
          ref={imgRef}
          className="flex overflow-x-hidden"
          role="group"
          aria-label={`Slide ${crntIndx + 1} of ${imagesLength}`}
          tabIndex="0"
        >
          {children}
        </div>
        <button
          onClick={prevBtnHandler}
          className="absolute left-0 z-50 flex items-center justify-center -translate-x-1/2 bg-green-500 rounded-full w-14 h-14 btn top-1/2"
          disabled={crntIndx < 1}
        >
          prev
        </button>
        <button
          onClick={nextBtnHandler}
          className="absolute right-0 z-50 flex items-center justify-center translate-x-1/2 bg-green-500 rounded-full w-14 h-14 btn top-1/2"
          disabled={crntIndx + 1 >= imagesLength}
        >
          next
        </button>
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselImage({ children }) {
  const { crntIndx } = useContext(CarouselContext);
  return (
    <div className="flex-shrink-0 object-cover w-full h-auto bg-red-400">
      {React.cloneElement(children, {
        className: "w-full h-full ",
      })}
    </div>
  );
}

Carousel.Image = CarouselImage;

export default Carousel;
