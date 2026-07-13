import { useLocation } from 'react-router-dom'
import { Nav } from '@/components/sections/Nav'
import { PODCAST_NAME } from '@/data/episodes'
import { defaultNavLinks } from '@/data/site'

export function SiteNav() {
  const { pathname } = useLocation()
  const overlay = pathname === '/'

  return (
    <Nav
      logo={PODCAST_NAME.toLowerCase()}
      links={defaultNavLinks}
      overlay={overlay}
    />
  )
}
