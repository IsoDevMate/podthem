import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { AudioPlayerProvider } from '@/motion/AudioPlayerProvider'
import { SoundProvider, SoundToggle } from '@/motion/SoundDesign'
import { CustomCursor } from '@/components/CustomCursor'
import { Preloader } from '@/components/Preloader'
import { FloatingAudioPlayer } from '@/components/FloatingAudioPlayer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SiteNav } from '@/components/layout/SiteNav'
import { Home } from '@/pages/Home'
import { EpisodePage } from '@/pages/EpisodePage'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <SoundProvider>
          <AudioPlayerProvider>
            <Preloader />
            <ScrollProgress />
            <CustomCursor />
            <SiteNav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/episode/:id" element={<EpisodePage />} />
            </Routes>
            <FloatingAudioPlayer />
            <SoundToggle />
          </AudioPlayerProvider>
        </SoundProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
