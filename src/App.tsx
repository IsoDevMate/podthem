import { BrowserRouter } from 'react-router-dom'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { AppReadyProvider } from '@/motion/AppReadyProvider'
import { ScrollLayoutSync } from '@/motion/ScrollLayoutSync'
import { ImageLayoutSync } from '@/motion/ImageLayoutSync'
import { PageMorphTransition } from '@/motion/PageMorphTransition'
import { AudioPlayerProvider } from '@/motion/AudioPlayerProvider'
import { SoundProvider, SoundToggle } from '@/motion/SoundDesign'
import { CustomCursor } from '@/components/CustomCursor'
import { Preloader } from '@/components/Preloader'
import { FloatingAudioPlayer } from '@/components/FloatingAudioPlayer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SiteNav } from '@/components/layout/SiteNav'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppReadyProvider>
          <SoundProvider>
            <AudioPlayerProvider>
              <Preloader />
              <ScrollLayoutSync />
              <ImageLayoutSync />
              <ScrollProgress />
              <CustomCursor />
              <SiteNav />
              <PageMorphTransition />
              <FloatingAudioPlayer />
              <SoundToggle />
            </AudioPlayerProvider>
          </SoundProvider>
        </AppReadyProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
