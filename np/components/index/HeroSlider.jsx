import { useState, useEffect } from "react";
import styles from "./HeroSlider.module.css";
import { useSwipeable } from "react-swipeable";

const HeroSlider = () => {
  const [slideIndex, setSlideIndex] = useState(0);
  const sliders = ["1.png", "2.png", "3.png", "4.png", "6.png"];
  const slideCount = sliders.length;
  // 只要索引值改變，觸發這個函數
  useEffect(() => {
    const slideWidth = document.getElementById("Hero").offsetWidth;
    const slideImage = document.getElementById("slideImage");
    const handleSlideGo = () => {
      const slideMove = `-${slideWidth * slideIndex}px`;
      slideImage.style.left = slideMove;
    };
    handleSlideGo();
    // 確保索引值在一定範圍內循環
    // 公式：下一張投影片的索引值 = (這張的索引值 + 1）％（總投影片數量）
    // 上一張投影片的索引值：若這張是第一張投影片，上一張則顯示最後一張
    const autoSlide = setInterval(() => {
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideCount);
    }, 8000);
    return () => {
      clearInterval(autoSlide);
    };
  }, [slideIndex]);

  // 用來控制手機版滑動換頁行為
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setSlideIndex((prevIndex) => (prevIndex + 1) % slideCount),
    onSwipedRight: () =>
      setSlideIndex((prevIndex) =>
        prevIndex === 0 ? slideCount - 1 : prevIndex - 1
      ),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <div className={styles.Hero} id="Hero" {...swipeHandlers}>
      <div className={`${styles.slider} position-relative`} id="slider">
        {/* 輪播圖片 */}
        <ul
          className={`list-unstyled position-absolute ${styles.slideImage} d-flex`}
          id="slideImage"
        >
          {sliders.map((slider, index) => (
            <li key={index}>
              <img src={`/index-images/${slider}`} alt="" />
            </li>
          ))}
        </ul>
        {/* 下方點狀控制區 */}
        <ul
          className={`list-unstyled ${styles.pages} position-absolute d-flex justify-content-center w-100`}
          id="pages"
        >
          {/* 用 Array.from 來依投影片數量生成圓點，點擊時顯示對應照片，並改變圓點外觀以指引目前投影片播放狀況 */}
          {Array.from({ length: slideCount }, (_, index) => (
            <li
              key={index}
              onClick={() => setSlideIndex(index)}
              className={slideIndex === index ? `${styles.current}` : ""}
            ></li>
          ))}
        </ul>
        {/* 兩側箭頭換頁功能 */}
        <a
          className={`${styles.slideBtnLeft} ${styles.slideBtn} position-absolute slide-prev`}
          role="button"
          onClick={() =>
            setSlideIndex((prevIndex) =>
              prevIndex === 0 ? slideCount - 1 : prevIndex - 1
            )
          }
        >
          <i className="fa-solid fa-chevron-left"></i>
        </a>
        <a
          className={`${styles.slideBtnRight} ${styles.slideBtn} position-absolute slide-next`}
          role="button"
          onClick={() =>
            setSlideIndex((prevIndex) => (prevIndex + 1) % slideCount)
          }
        >
          <i className="fa-solid fa-chevron-right"></i>
        </a>
      </div>
    </div>
  );
};

export default HeroSlider;
