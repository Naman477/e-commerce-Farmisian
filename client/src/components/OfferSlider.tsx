import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './OfferSlider.css';

const OfferSlider: React.FC = () => {
  // Sample offer data - in a real app, this would come from props or API
  const offers = [
    {
      id: 1,
      title: "Summer Sale",
      subtitle: "Up to 50% off on selected items",
      image: "/images/farm12.jpg",
      ctaText: "Shop Now"
    },
    {
      id: 2,
      title: "Organic Specials",
      subtitle: "Fresh organic produce at great prices",
      image: "/images/farm25.jpg",
      ctaText: "View Offers"
    },
    {
      id: 3,
      title: "New Arrivals",
      subtitle: "Fresh seasonal produce now available",
      image: "/images/farm39.jpg",
      ctaText: "Explore"
    },
    {
      id: 4,
      title: "Free Delivery",
      subtitle: "On orders over ₹500",
      image: "/images/groceries-offers.jpg",
      ctaText: "Order Now"
    }
  ];

  return (
    <section className="offer-slider-section">
      <div className="container">
        <div className="section-header text-center mb-4">
          <h2 className="section-title">Special Offers</h2>
          <p className="section-subtitle">Don't miss out on our latest deals</p>
        </div>
        
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={30}
          slidesPerView={1}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 4000 }}
          loop={true}
          className="offer-slider"
        >
          {offers.map((offer) => (
            <SwiperSlide key={offer.id}>
              <div className="offer-slide">
                <div 
                  className="offer-image"
                  style={{ backgroundImage: `url(${offer.image})` }}
                >
                  <div className="offer-content">
                    <h3 className="offer-title">{offer.title}</h3>
                    <p className="offer-subtitle">{offer.subtitle}</p>
                    <button className="btn btn-primary offer-cta">
                      {offer.ctaText}
                    </button>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default OfferSlider;