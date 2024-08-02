import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import styles from "./HeroSlider.module.css";

const DemoCarousel = () => {
  const sliders = ["1.png", "2.png", "3.png", "4.png", "6.png"];

  return (
    <div className={styles.Hero} id="Hero">
      <Carousel
        autoPlay={true}
        interval={8000}
        infiniteLoop={true}
        showThumbs={false}
        className={styles.slider}
      >
        {sliders.map((slider, index) => (
          <div key={index}>
            <img src={`/index-images/${slider}`} alt={`Slide ${index + 1}`} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default DemoCarousel;
