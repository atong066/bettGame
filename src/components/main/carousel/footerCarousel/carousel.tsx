import '../swipe.css'
import React from "react";
import Slider from "react-slick";

function MultipleItems() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    autoPlay: true
  };
  return (
    <div className="slider-container">
      <Slider {...settings}>
        <div>
        <img src="carouselImage/1.png" alt="Slide 5" />
        </div>
        <div>
        <img src="carouselImage/2.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/3.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/4.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/5.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/6.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/7.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/8.png" alt="Slide 5" />        </div>
        <div>
        <img src="carouselImage/9.png" alt="Slide 5" />        </div>
      </Slider>
    </div>
  );
}

export default MultipleItems;

