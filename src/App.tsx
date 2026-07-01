import Hero from "./components/Hero"
import Countdown from "./components/Countdown"
import Story from "./components/Story"
import Gallery from "./components/Gallery"
import Details from "./components/Details"
import GiftList from "./components/GiftList"
import PlaylistSuggestions from "./components/PlaylistSuggestions"
import Rsvp from "./components/Rsvp"
import Footer from "./components/Footer"
import ToastAlert from "./components/ToastAlert"
import FloatingParticles from "./components/FloatingParticles"

export default function App() {
  return (
    <main className="relative min-h-screen bg-cream overflow-hidden">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-rose/40 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-gold/20 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-rose/20 rounded-full blur-3xl" />
      </div>

      <FloatingParticles count={15} />

      <div className="relative z-10">
        <Hero />
        <Countdown />
        <Story />
        <Gallery />
        <Details />
        <GiftList />
        <PlaylistSuggestions />
        <Rsvp />
        <Footer />
      </div>

      <ToastAlert />
    </main>
  )
}
