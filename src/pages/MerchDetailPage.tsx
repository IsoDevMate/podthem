import { Link, useParams } from 'react-router-dom'
import { getMerchById, merchItems } from '@/data/merch'
import { EditorialReveal } from '@/components/shared/EditorialReveal'
import { OptimizedImage } from '@/components/shared/OptimizedImage'
import { onMorphNavigate } from '@/motion/morphNavigation'

export function MerchDetailPage() {
  const { id } = useParams()
  const item = id ? getMerchById(id) : undefined

  if (!item) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-cream px-6 pt-24">
        <h1 className="font-hand text-4xl font-semibold text-bronze">Piece not found</h1>
        <Link
          to="/merch"
          className="mt-6 text-sm uppercase tracking-widest text-bronze-muted"
          onClick={(e) => onMorphNavigate(e, 'link')}
        >
          ← Back to merch
        </Link>
      </main>
    )
  }

  const related = merchItems.filter((m) => m.id !== item.id).slice(0, 3)

  return (
    <main className="min-h-screen bg-cream pt-24 md:pt-28">
      <div className="mx-auto grid max-w-7xl gap-12 px-6 pb-24 md:px-12 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
            <OptimizedImage
              src={item.imageUrl}
              alt={item.name}
              className="h-full w-full object-cover"
            />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {item.gallery.map((src) => (
              <div key={src} className="aspect-square overflow-hidden bg-cream-dark">
                <OptimizedImage src={src} alt="" className="h-full w-full object-cover" />
              </div>
            ))}
          </div>
        </div>

        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            {item.category}
            {item.limited ? ' · Limited' : ''}
          </span>
          <EditorialReveal
            as="h1"
            className="mt-3 font-hand text-5xl font-semibold tracking-tight text-bronze md:text-6xl"
          >
            {item.name}
          </EditorialReveal>
          <p className="mt-4 font-mono text-xl text-bronze">{item.price}</p>
          <p className="mt-6 text-lg leading-relaxed text-bronze-muted">
            {item.longDescription}
          </p>

          <ul className="mt-8 space-y-2 border-t border-bronze/10 pt-6">
            {item.details.map((d) => (
              <li
                key={d}
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-bronze-muted"
              >
                — {d}
              </li>
            ))}
          </ul>

          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={`mailto:hello@podthem.com?subject=Order%20${encodeURIComponent(item.name)}`}
              className="inline-flex h-11 items-center bg-bronze px-6 text-sm text-cream transition-colors hover:bg-bronze/90"
            >
              Enquire to order
            </a>
            <Link
              to="/merch"
              onClick={(e) => onMorphNavigate(e, 'link')}
              className="inline-flex h-11 items-center border border-bronze/30 px-6 text-sm text-bronze transition-colors hover:bg-bronze/5"
            >
              All merch
            </Link>
          </div>
        </div>
      </div>

      {related.length > 0 && (
        <section className="border-t border-bronze/10 bg-[#ebe3d2]/40 px-6 py-20 md:px-12">
          <div className="mx-auto max-w-7xl">
            <h2 className="font-hand text-3xl font-semibold text-bronze">You might also like</h2>
            <div className="mt-10 grid gap-8 sm:grid-cols-3">
              {related.map((m) => (
                <Link
                  key={m.id}
                  to={`/merch/${m.id}`}
                  className="group"
                  onClick={(e) => onMorphNavigate(e, 'card', m.imageUrl)}
                >
                  <div className="aspect-[4/5] overflow-hidden bg-cream-dark">
                    <OptimizedImage
                      src={m.imageUrl}
                      alt={m.name}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                  <p className="mt-3 font-hand text-xl font-semibold text-bronze">{m.name}</p>
                  <p className="font-mono text-sm text-bronze-muted">{m.price}</p>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
