import styles from '../styles/carousel.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const PromosCarousel = () => {
  const promos = [
    {
      img: 'https://i.postimg.cc/yWq5xyLZ/hamburguesas.png',
      title: 'PROMO 1',
      description: 'Hamburguesa completa + porcion de papas',
      price: '$550',
    },
    {
      img: 'https://i.postimg.cc/yWq5xyLZ/hamburguesas.png',
      title: 'PROMO 1',
      description: 'Hamburguesa completa + porcion de papas',
      price: '$550',
    },
    {
      img: 'https://i.postimg.cc/yWq5xyLZ/hamburguesas.png',
      title: 'PROMO 1',
      description: 'Hamburguesa completa + porcion de papas',
      price: '$550',
    },
    {
      img: 'https://i.postimg.cc/yWq5xyLZ/hamburguesas.png',
      title: 'PROMO 1',
      description: 'Hamburguesa completa + porcion de papas',
      price: '$550',
    },
  ]

  return (
    <>
      <Carousel
        className={styles.carouselContainer}
        additionalTransfrom={0}
        arrows
        autoPlaySpeed={3000}
        centerMode={false}
        className='promosCarousel'
        containerClass='container-with-dots'
        dotListClass=''
        draggable
        focusOnSelect={false}
        infinite
        itemClass=''
        keyBoardControl
        minimumTouchDrag={80}
        renderButtonGroupOutside={false}
        renderDotsOutside={false}
        responsive={{
          desktop: {
            breakpoint: {
              max: 3000,
              min: 1024,
            },
            items: 1,
            partialVisibilityGutter: 40,
          },
          mobile: {
            breakpoint: {
              max: 464,
              min: 0,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
          tablet: {
            breakpoint: {
              max: 1024,
              min: 464,
            },
            items: 1,
            partialVisibilityGutter: 30,
          },
        }}
        showDots={false}
        sliderClass=''
        slidesToSlide={1}
        swipeable
      >
        {promos.map((promo, index) => (
          <div className={styles.carouselBox} key={promo.title + index.toString()}>
            <div className={styles.carousel} style={{ backgroundImage: `url("${promo.img}")` }} key={index}></div>
            <div className={styles.promo}>
              <h3 className={styles.promoH3}>{promo.title}</h3>
              <p className={styles.promoDesc}>{promo.description}</p>
              <h4 className={styles.promoPrice}>{promo.price}</h4>
            </div>
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default PromosCarousel
