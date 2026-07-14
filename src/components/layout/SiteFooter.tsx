import { PODCAST_NAME } from '@/data/episodes'
import { RevealingFooter } from '@/components/RevealingFooter'

/** Shared footer mounted once in App so every route gets it */
export function SiteFooter() {
  return (
    <RevealingFooter
      podcastName={PODCAST_NAME}
      tagline="Stories are never finished."
      newsletterHeading="Your inbox deserves slower stories."
      navLinks={[
        { label: 'About', href: '/about' },
        { label: 'Episodes', href: '/episodes' },
        { label: 'Listen', href: '/listen' },
        { label: 'Team', href: '/team' },
        { label: 'Contact', href: '/contact' },
        { label: 'Manifesto', href: '/#manifesto' },
      ]}
      socialLinks={[
        { label: 'Spotify', href: '#' },
        { label: 'Apple Podcasts', href: '#' },
        { label: 'YouTube', href: '#' },
        { label: 'Instagram', href: '#' },
      ]}
      legalLinks={[
        { label: 'Press Kit', href: '#' },
        { label: 'Terms', href: '#' },
        { label: 'Privacy', href: '#' },
      ]}
      contactEmail="hello@podthem.com"
    />
  )
}
