import Hero from '../components/Hero'
import PromosCarousel from '../components/PromosCarousel'
import AppStore from '../components/AppStore'
import Testimonios from '../components/Testimonios'
import CardTost from '../components/CardTost'

const Home = () => {

  return (
    <>
      <Hero />
      <CardTost/>
      <PromosCarousel />
      <AppStore />
      <Testimonios />
    </>
  )
}

export default Home
