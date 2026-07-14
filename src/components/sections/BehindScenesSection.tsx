import { motion } from 'framer-motion'
import { behindScenesPhotos } from '@/data/site'
import { OptimizedImage } from '@/components/shared/OptimizedImage'

export function BehindScenesSection() {
  return (
    <section
      id="behind-the-scenes"
      className="relative overflow-hidden bg-gradient-to-b from-[#c9b89a] via-[#b8a488] to-[#2c2118] px-6 py-28 text-cream md:px-12 lg:px-20"
    >
      <div className="mx-auto max-w-7xl">
        <span className="font-mono text-xs uppercase tracking-[0.3em] text-cream/50">
          Behind the Scenes
        </span>
        <h2 className="mt-3 max-w-xl font-serif text-4xl md:text-5xl">
          Where the stories are made
        </h2>

        <div className="mt-14 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {behindScenesPhotos.map((photo, i) => (
            <motion.figure
              key={photo.id}
              initial={{ opacity: 0, scale: 0.96 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={i === 0 ? 'col-span-2 row-span-2' : ''}
            >
              <div className={`overflow-hidden ${i === 0 ? 'aspect-[16/10]' : 'aspect-square'}`}>
                <OptimizedImage
                  src={photo.imageUrl}
                  alt={photo.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <figcaption className="mt-2 font-mono text-[10px] uppercase tracking-widest text-cream/60">
                {photo.title}
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  )
}
