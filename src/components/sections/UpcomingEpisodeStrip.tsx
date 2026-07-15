import { useEffect, useState } from 'react'
import type { UpcomingEpisode } from '@/types/episode'
import { cn } from '@/lib/utils'

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

function FlipDigit({ value, urgent }: { value: string; urgent?: boolean }) {
  return (
    <span
      className={cn(
        'relative inline-flex min-w-[1.35em] items-center justify-center overflow-hidden rounded-sm border border-bronze/15 bg-[#ebe3d2] px-1.5 py-1 font-mono text-2xl tabular-nums text-bronze shadow-[inset_0_1px_0_rgba(255,255,255,0.35)] md:min-w-[1.5em] md:px-2 md:text-4xl',
        urgent && 'countdown-pulse border-amber-800/35 text-amber-950',
      )}
    >
      <span key={value} className="block animate-[digit-roll_0.35s_ease-out]">
        {value}
      </span>
    </span>
  )
}

/** Editorial strip with urgent flip-style countdown */
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

  const totalMs = Math.max(1, new Date(upcoming.startsAt).getTime() - Date.now())
  // Progress relative to a 7-day window for visual urgency
  const weekMs = 7 * 86_400_000
  const remaining = Math.min(1, Math.max(0, totalMs / weekMs))
  const drained = done ? 1 : 1 - remaining

  return (
    <section
      id="upcoming"
      className="relative border-y border-bronze/10 bg-[#f6f0e4] px-6 py-16 md:px-12 lg:px-20"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <div className="flex items-center gap-3">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-700/50 opacity-75" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-amber-800" />
            </span>
            <span className="font-mono text-xs uppercase tracking-[0.3em] text-bronze-muted">
              Who&apos;s next · Live soon
            </span>
          </div>
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

        <div className="flex w-full max-w-md flex-col items-start gap-4 lg:items-end">
          <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-bronze-muted">
            {done ? 'Recording window open' : 'Countdown'}
          </p>
          <div
            className="flex items-center gap-1.5"
            aria-live="polite"
            aria-label={`${pad(d)} days, ${pad(h)} hours, ${pad(m)} minutes, ${pad(s)} seconds`}
          >
            {[
              { v: pad(d), u: 'd', urgent: false },
              { v: pad(h), u: 'h', urgent: false },
              { v: pad(m), u: 'm', urgent: false },
              { v: pad(s), u: 's', urgent: true },
            ].map(({ v, u, urgent }, i) => (
              <span key={u} className="flex flex-col items-center gap-1">
                <span className="flex items-center gap-1">
                  {i > 0 && (
                    <span className="mx-0.5 font-mono text-xl text-bronze/35 md:text-2xl">:</span>
                  )}
                  <FlipDigit value={v} urgent={!done && urgent} />
                </span>
                <span className="text-[9px] uppercase tracking-widest text-bronze-muted">{u}</span>
              </span>
            ))}
          </div>

          {/* Draining urgency bar */}
          <div className="h-1 w-full overflow-hidden rounded-full bg-bronze/10">
            <div
              className="h-full origin-left bg-gradient-to-r from-amber-800 to-bronze transition-[transform] duration-1000 ease-linear"
              style={{ transform: `scaleX(${done ? 1 : drained})` }}
            />
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
