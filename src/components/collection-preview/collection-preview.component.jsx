import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Slider from "react-slick";
import CollectionItem from "../collection-item/collection-item.component";

import { CollectionPreviewContainer, TitleContainer, NextArrow, PrevArrow } from "./collection-preview.styles";

const getVisibleSlides = () => {
  if (window.innerWidth <= 480) return 1;
  if (window.innerWidth <= 768) return 2;
  if (window.innerWidth <= 1024) return 3;
  return 4;
};

const CustomNextArrow = ({ onClick, currentSlide, slideCount, className }) => {
  const visibleSlides = getVisibleSlides();
  return (
    <NextArrow
      onClick={onClick}
      className={className}
      disabled={currentSlide >= slideCount - visibleSlides}
    />
  );
};

const CustomPrevArrow = ({ onClick, currentSlide, className }) => (
  <PrevArrow
    onClick={onClick}
    className={className}
    disabled={currentSlide === 0}
  />
);

const CollectionPreview = ({ title, items, routeName }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [slidesToShow, setSlidesToShow] = useState(getVisibleSlides());

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow(getVisibleSlides());
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleTitleClick = () => {
    navigate(`${location.pathname}/${routeName}`);
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow,
    slidesToScroll: 1,
    nextArrow: <CustomNextArrow />,
    prevArrow: <CustomPrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  return (
    <CollectionPreviewContainer>
      <TitleContainer onClick={handleTitleClick}>{title.toUpperCase()}</TitleContainer>
      <Slider {...settings}>
        {items.map((item) => (
          <CollectionItem
            key={item.id}
            item={item}
          />
        ))}
      </Slider>
    </CollectionPreviewContainer>
  );
};

export default CollectionPreview;
