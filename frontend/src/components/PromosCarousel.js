import styles from '../styles/carousel.module.css'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const PromosCarousel = () => {
  const promos = ['https://i.postimg.cc/sfBT4rfs/publicidad.png', 'https://i.postimg.cc/4x37pJZ1/publicidad2.png', 'https://i.postimg.cc/wTw3qSJR/publicidad3.png', 'https://i.postimg.cc/kGfM5bVP/publicidad4.jpg', 'https://i.postimg.cc/QM1XTPBb/publicidad5.png', 'https://i.postimg.cc/25RYrwHB/publicidad6.png']

  return (
    <>
      <p className={styles.textPromos}>¡Las mejores Promos!</p>
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
        itemClass='imgCarousel'
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
          <div className={styles.carouselBox} key={index.toString()}>
            <div className={styles.carousel} style={{ backgroundImage: `url("${promo}")` }} key={index}></div>
          </div>
        ))}
      </Carousel>
    </>
  )
}

export default PromosCarousel
