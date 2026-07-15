import { BrowserRouter } from 'react-router-dom'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { AppReadyProvider } from '@/motion/AppReadyProvider'
import { ScrollLayoutSync } from '@/motion/ScrollLayoutSync'
import { ImageLayoutSync } from '@/motion/ImageLayoutSync'
import { PageMorphTransition } from '@/motion/PageMorphTransition'
import { AudioPlayerProvider } from '@/motion/AudioPlayerProvider'
import { SoundProvider, SoundToggle } from '@/motion/SoundDesign'
import { ScrollToTop } from '@/motion/ScrollToTop'
import { CustomCursor } from '@/components/CustomCursor'
import { Preloader } from '@/components/Preloader'
import { FloatingAudioPlayer } from '@/components/FloatingAudioPlayer'
import { ScrollProgress } from '@/components/ScrollProgress'
import { SiteNav } from '@/components/layout/SiteNav'
import { SiteFooter } from '@/components/layout/SiteFooter'

export default function App() {
  return (
    <BrowserRouter>
      <SmoothScrollProvider>
        <AppReadyProvider>
          <SoundProvider>
            <AudioPlayerProvider>
              <ScrollToTop />
              <Preloader />
              <ScrollLayoutSync />
              <ImageLayoutSync />
              <ScrollProgress />
              <CustomCursor />
              <SiteNav />
              <PageMorphTransition />
              <SiteFooter />
              <FloatingAudioPlayer />
              <SoundToggle />
            </AudioPlayerProvider>
          </SoundProvider>
        </AppReadyProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
