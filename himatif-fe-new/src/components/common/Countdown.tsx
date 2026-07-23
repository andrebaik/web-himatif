import { useState, useEffect, useCallback } from 'react'

interface CountdownProps {
  targetDate: string | Date
  onEnd?: () => void
}

export default function Countdown({ targetDate, onEnd }: CountdownProps) {
  const calculateTimeLeft = useCallback(() => {
    const difference = new Date(targetDate).getTime() - new Date().getTime()
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 }
    }
    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / (1000 * 60)) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    }
  }, [targetDate])

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft)

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)
    return () => clearInterval(timer)
  }, [calculateTimeLeft])

  useEffect(() => {
    if (timeLeft.days === 0 && timeLeft.hours === 0 && timeLeft.minutes === 0 && timeLeft.seconds === 0) {
      onEnd?.()
    }
  }, [timeLeft, onEnd])

  const units = [
    { label: 'Hari', value: timeLeft.days },
    { label: 'Jam', value: timeLeft.hours },
    { label: 'Menit', value: timeLeft.minutes },
    { label: 'Detik', value: timeLeft.seconds },
  ]

  return (
    <div className="flex gap-4 md:gap-6 justify-center">
      {units.map((unit) => (
        <div key={unit.label} className="text-center">
          <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-white/10 backdrop-blur-xl border border-white/20 flex items-center justify-center">
            <span className="text-2xl md:text-3xl font-bold text-primary">
              {String(unit.value).padStart(2, '0')}
            </span>
          </div>
          <span className="text-xs text-white/70 mt-1 block">{unit.label}</span>
        </div>
      ))}
    </div>
  )
}
