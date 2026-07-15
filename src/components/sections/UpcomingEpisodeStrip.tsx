import { useEffect, useState } from 'react'
import type { UpcomingEpisode } from '@/types/episode'

interface UpcomingEpisodeStripProps {
  upcoming: UpcomingEpisode
}

function pad(n: number) {
  return String(Math.max(0, n)).padStart(2, '0')
}

function useCountdown(iso: string) {
  const [parts, setParts] = useState({ d: 0, h: 0, m: 0, s: 0, done: false })

  useEffect(() => {
    const target = new Date(iso).getTime()
    const tick = () => {
      const diff = target - Date.now()
      if (diff <= 0) {
        setParts({ d: 0, h: 0, m: 0, s: 0, done: true })
        return
      }
      setParts({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1000),
        done: false,
      })
    }
    tick()
    const id = window.setInterval(tick, 1000)
    return () => window.clearInterval(id)
  }, [iso])

  return parts
}

/** Editorial strip — matches existing cream/bronze language */
export function UpcomingEpisodeStrip({ upcoming }: UpcomingEpisodeStripProps) {
  const { d, h, m, s, done } = useCountdown(upcoming.startsAt)
  const when = new Date(upcoming.startsAt)
  const dayLabel = when.toLocaleDateString(undefined, {
    weekday: 'long',
    month: 'short',
    day: 'numeric',
  })
  const timeLabel = when.toLocaleTimeString(undefined, {
    hour: 'numeric',
    minute: '2-digit',
  })

  return (
    <section
      id="upcoming"
      className="relative border-y border-bronze/10 bg-[#f6f0e4] px-6 py-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
            Who's next
          </span>
          <h2 className="mt-3 font-hand text-3xl font-semibold tracking-tight text-bronze md:text-4xl">
            Upcoming episode
          </h2>

          <div className="mt-8 grid gap-8 sm:grid-cols-3">
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bronze-muted">
                Recording
              </p>
              <p className="mt-2 font-serif text-xl text-bronze">{dayLabel}</p>
              <p className="mt-1 text-sm text-bronze-muted">
                {timeLabel} {upcoming.timezoneLabel}
              </p>
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bronze-muted">
                Guest
              </p>
              <p className="mt-2 font-serif text-xl text-bronze">{upcoming.guest}</p>
              {upcoming.guestTitle && (
                <p className="mt-1 text-sm text-bronze-muted">{upcoming.guestTitle}</p>
              )}
            </div>
            <div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-bronze-muted">
                Topic
              </p>
              <p className="mt-2 font-serif text-xl text-bronze">{upcoming.topic}</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-start gap-4 lg:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bronze-muted">
            {done ? 'Recording window open' : 'Countdown'}
          </p>
          {/* Single row — digits never wrap */}
          <div
            className="flex items-baseline gap-1 font-mono tracking-[0.08em] text-bronze"
            aria-live="polite"
            aria-label={`${pad(d)} days, ${pad(h)} hours, ${pad(m)} minutes, ${pad(s)} seconds`}
          >
            {[
              { v: pad(d), u: 'd' },
              { v: pad(h), u: 'h' },
              { v: pad(m), u: 'm' },
              { v: pad(s), u: 's' },
            ].map(({ v, u }, i) => (
              <span key={u} className="flex items-baseline gap-0.5">
                {i > 0 && <span className="mx-0.5 text-xl text-bronze/40 md:text-2xl">:</span>}
                <span className="tabular-nums text-2xl md:text-4xl">{v}</span>
                <span className="text-[9px] uppercase tracking-widest text-bronze-muted md:text-[10px]">{u}</span>
              </span>
            ))}
          </div>
          <a
            href={upcoming.notifyHref ?? '#community'}
            className="inline-flex h-11 items-center border border-bronze/25 px-6 text-xs uppercase tracking-[0.22em] text-bronze transition-colors hover:bg-bronze hover:text-cream"
          >
            Notify me
          </a>
        </div>
      </div>
    </section>
  )
}
