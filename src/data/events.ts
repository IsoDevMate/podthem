export interface PodthemEvent {
  id: string
  title: string
  type: 'meetup' | 'live' | 'workshop'
  date: string
  time: string
  city: string
  venue: string
  description: string
  imageUrl: string
  ctaLabel: string
  ctaHref: string
  spotsLeft?: number
}

export const events: PodthemEvent[] = [
  {
    id: 'cph-gang-july',
    title: 'Podthem Gang — Copenhagen',
    type: 'meetup',
    date: 'July 26, 2026',
    time: '19:00 CEST',
    city: 'Copenhagen',
    venue: 'Studio 4, Vesterbrogade',
    description:
      'An evening of headphones-off conversation: leftover tape from recent episodes, soft drinks, and faces from the Discord that finally meet in real light.',
    imageUrl:
      'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&q=80',
    ctaLabel: 'Reserve a seat',
    ctaHref: 'mailto:hello@podthem.com?subject=Copenhagen%20Meetup',
    spotsLeft: 18,
  },
  {
    id: 'live-berlin',
    title: 'Live Recording — Berlin',
    type: 'live',
    date: 'August 14, 2026',
    time: '20:30 CEST',
    city: 'Berlin',
    venue: 'Silent Green, Kuppelhalle',
    description:
      'A ticketed live episode with a special guest. You hear the cold open in the room — then the finished cut drops the following Thursday.',
    imageUrl:
      'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=1200&q=80',
    ctaLabel: 'Get tickets',
    ctaHref: 'mailto:booking@podthem.com?subject=Berlin%20Live',
    spotsLeft: 42,
  },
  {
    id: 'field-workshop',
    title: 'Field Recording Workshop',
    type: 'workshop',
    date: 'September 6, 2026',
    time: '10:00–16:00 CEST',
    city: 'Copenhagen',
    venue: 'Islands Brygge waterfront',
    description:
      'Half day outdoors with Sofia Lindström — mic technique, binaural walks, and how to edit a city into a story without crushing its breath.',
    imageUrl:
      'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=1200&q=80',
    ctaLabel: 'Join the waitlist',
    ctaHref: 'mailto:hello@podthem.com?subject=Field%20Workshop',
    spotsLeft: 8,
  },
  {
    id: 'london-gang',
    title: 'Podthem Gang — London',
    type: 'meetup',
    date: 'October 3, 2026',
    time: '18:30 BST',
    city: 'London',
    venue: 'Rough Trade East (upstairs)',
    description:
      'A listening circle and soft Q&A. Bring a favourite episode moment. We’ll bring the vinyl-adjacent playlist.',
    imageUrl:
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=1200&q=80',
    ctaLabel: 'RSVP',
    ctaHref: 'mailto:hello@podthem.com?subject=London%20Meetup',
  },
]
