import styles from '../styles/testimonios.module.css'
import Carousel from "react-multi-carousel"
import "react-multi-carousel/lib/styles.css"

const Testimonios = () => {
    const testimonies = [
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
        },
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
        },
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
        },
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
        },
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
        },
        {
            userImg: 'https://i.ytimg.com/vi/xnoummdS3DA/maxresdefault.jpg',
            name: 'Cosme Fulanito',
            description: 'Tremendas las hamburguesa!! Mejores que las de Krusty',
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
                className="carouselTestimony"
                containerClass="container-with-dots"
                dotListClass=""
                draggable
                focusOnSelect={false}
                infinite
                itemClass="carouselTestimonies"
                keyBoardControl
                minimumTouchDrag={80}
                renderButtonGroupOutside={false}
                renderDotsOutside={false}
                responsive={{
                    desktop: {
                        breakpoint: {
                            max: 3000,
                            min: 1024
                        },
                        items: 2,
                        partialVisibilityGutter: 40
                    },
                    mobile: {
                        breakpoint: {
                            max: 464,
                            min: 0
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    },
                    tablet: {
                        breakpoint: {
                            max: 1024,
                            min: 464
                        },
                        items: 1,
                        partialVisibilityGutter: 30
                    }
                }}
                showDots={false}
                sliderClass="chao"
                slidesToSlide={1}
                swipeable
            >
                {testimonies.map((testimony, index) => {
                    return (
                        <div className={styles.cardTestimony} key={index}>
                            <div className={styles.boxTestimony}>
                                <hr className={styles.line}></hr>
                                <div className={styles.circle} style={{ backgroundImage: `url("${testimony.userImg}")` }}></div>
                                <hr className={styles.line}></hr>
                            </div>
                            <p className={styles.descriptionTestimony}>{testimony.description}</p>
                            <p className={styles.nameTestimony}>{testimony.name}</p>
                        </div>)
                })}
            </Carousel>
        </>
    )
}

export default Testimonios