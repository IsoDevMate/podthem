import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { AudioPlayerProvider } from '@/motion/AudioPlayerProvider'
import { CustomCursor } from '@/components/CustomCursor'
import { Preloader } from '@/components/Preloader'
import { FloatingAudioPlayer } from '@/components/FloatingAudioPlayer'
import { SiteNav } from '@/components/layout/SiteNav'
import { Home } from '@/pages/Home'
import { EpisodePage } from '@/pages/EpisodePage'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AudioPlayerProvider>
          <Preloader />
          <CustomCursor />
          <SiteNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/episode/:id" element={<EpisodePage />} />
          </Routes>
          <FloatingAudioPlayer />
        </AudioPlayerProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
