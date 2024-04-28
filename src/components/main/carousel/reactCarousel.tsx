import axios from "axios";
import { useEffect, useState } from "react";
import Slider from "react-slick";
import './reactCarousel.css'

function ReactSlick() {
  const [isImage, setImage] = useState<any>([]);
  const fetchImageData = async () => {
    const url = "/banner.do";
    try {
      const response = await axios.get(url);
      setImage(response.data);
    } catch (error) {
    }
  };

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToScroll: 4,
    slidesToShow: 4,
  };

  useEffect(() => {
    fetchImageData();
  }, []);
  return (
    <div className="slider-container">
        <Slider {...settings} >
        {isImage?.map((value: any, index: any) => {

          <div key={index}>
            <img src={value.titleImg} alt={`Slide ${index + 1}`} />
          </div>
        })}
        </Slider>;


    </div>
  );
}

export default ReactSlick;
