import styles from '../styles/home.module.css'
import Hero from '../components/Hero'
import PromosCarousel from '../components/PromosCarousel'
import AppStore from '../components/AppStore'
import Testimonios from '../components/Testimonios'
import Header from '../components/Header'
import Footer from '../components/Footer'

const Home = () => {
  return (
    <>
      <Header />
      <Hero />
      <PromosCarousel />
      <AppStore />
      <Testimonios />
      <Footer />
    </>
  )
}

export default Home;
