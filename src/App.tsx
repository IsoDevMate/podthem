import { BrowserRouter } from 'react-router-dom'
import { SmoothScrollProvider } from '@/motion/SmoothScrollProvider'
import { ScrollLayoutSync } from '@/motion/ScrollLayoutSync'
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
        <SoundProvider>
          <AudioPlayerProvider>
            <Preloader />
            <ScrollLayoutSync />
            <ScrollProgress />
            <CustomCursor />
            <SiteNav />
            <PageMorphTransition />
            <FloatingAudioPlayer />
            <SoundToggle />
          </AudioPlayerProvider>
        </SoundProvider>
      </SmoothScrollProvider>
    </BrowserRouter>
  )
}
