export interface MerchItem {
  id: string
  name: string
  price: string
  description: string
  longDescription: string
  imageUrl: string
  gallery: string[]
  category: 'wear' | 'studio' | 'print'
  limited?: boolean
  details: string[]
}

export const merchItems: MerchItem[] = [
  {
    id: 'slow-stories-tee',
    name: 'Slow Stories Tee',
    price: '$48',
    description: 'Heavyweight cotton. Wordmark on the chest, manifesto on the back.',
    longDescription:
      'Cut from 240gsm organic cotton and dyed the colour of midnight studio walls. The front carries the Podthem wordmark; the back prints a line from the manifesto — a soft reminder to leave noise at the door.',
    imageUrl:
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=1200&q=80',
      'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80',
    ],
    category: 'wear',
    details: ['Unisex fit', '240gsm organic cotton', 'Screen-printed in Copenhagen'],
  },
  {
    id: 'field-recording-tote',
    name: 'Field Recording Tote',
    price: '$36',
    description: 'Canvas tote for notebooks, mics, and the long walk home.',
    longDescription:
      'A reinforced canvas tote sized for a field recorder, notebooks, and whichever city you happen to be listening to. Brass rivets, cream stitching, and a quiet interior pocket for headphones.',
    imageUrl:
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?w=1200&q=80',
      'https://images.unsplash.com/photo-1544816155-12df9643f363?w=1200&q=80',
    ],
    category: 'wear',
    details: ['Heavy canvas', 'Interior pocket', 'Brass rivets'],
  },
  {
    id: 'studio-candle',
    name: 'Studio Hour Candle',
    price: '$42',
    description: 'Cedar, tape hiss, and late coffee — poured for deep listens.',
    longDescription:
      'A soy candle blended for long editing sessions: cedarwood, faint tobacco leaf, and the warmth of a roasting pot still humming. Burns through a full episode and then some.',
    imageUrl:
      'https://images.unsplash.com/photo-1602607387532-8ece646d0641?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1602607387532-8ece646d0641?w=1200&q=80',
      'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=1200&q=80',
    ],
    category: 'studio',
    limited: true,
    details: ['~55 hour burn', 'Soy wax', 'Hand-poured'],
  },
  {
    id: 'manifesto-print',
    name: 'Manifesto Letterpress Print',
    price: '$64',
    description: 'Letterpress on cotton rag. Numbered edition of 200.',
    longDescription:
      'The Podthem manifesto, letterpressed into cotton rag paper on a Heidelberg platen. Each print is signed and numbered — one of two hundred. Ships flat in archival sleeve.',
    imageUrl:
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=1200&q=80',
      'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200&q=80',
    ],
    category: 'print',
    limited: true,
    details: ['A2 cotton rag', 'Letterpress', 'Edition of 200'],
  },
  {
    id: 'listen-hoodie',
    name: 'Listen Hoodie',
    price: '$98',
    description: 'Brushed fleece. Soft enough for editing marathons.',
    longDescription:
      'Oversized hoodie in washed cream with a small embroidered waveform on the cuff. Made for the hours between takes — pockets deep enough for a phone and a half-written script.',
    imageUrl:
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80',
      'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80',
    ],
    category: 'wear',
    details: ['Brushed fleece', 'Oversized cut', 'Embroidered cuff'],
  },
  {
    id: 'waveform-mug',
    name: 'Waveform Mug',
    price: '$28',
    description: 'Ceramic mug with a hand-drawn episode waveform.',
    longDescription:
      'Stoneware mug glazed in cream, stamped with a waveform taken from episode one — Architecture of Silence. Holds enough coffee for one honest rewrite.',
    imageUrl:
      'https://images.unsplash.com/photo-1514228742587-6b1558fcc36f?w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1514228742587-6b1558fcc36f?w=1200&q=80',
    ],
    category: 'studio',
    details: ['Stoneware', 'Dishwasher safe', '350ml'],
  },
]

export function getMerchById(id: string) {
  return merchItems.find((item) => item.id === id)
}
