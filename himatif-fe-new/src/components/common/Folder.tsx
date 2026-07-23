import { useState, useEffect, useRef, type ReactNode } from 'react'
import confetti from 'canvas-confetti'

const darkenColor = (hex: string, percent: number): string => {
  let color = hex.startsWith('#') ? hex.slice(1) : hex
  if (color.length === 3) {
    color = color
      .split('')
      .map(c => c + c)
      .join('')
  }
  const num = parseInt(color.slice(0, 6), 16)
  let r = (num >> 16) & 0xff
  let g = (num >> 8) & 0xff
  let b = num & 0xff
  r = Math.max(0, Math.min(255, Math.floor(r * (1 - percent))))
  g = Math.max(0, Math.min(255, Math.floor(g * (1 - percent))))
  b = Math.max(0, Math.min(255, Math.floor(b * (1 - percent))))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase()
}

const playPaperShuffleSound = () => {
  try {
    const audio = new Audio('/sounds/1.mp3')
    audio.volume = 0.6
    audio.currentTime = 0
    audio.play().catch(() => {})
  } catch {
    console.log('Sound playback not supported or blocked')
  }
}

interface FolderProps {
  color?: string
  size?: number
  items?: ReactNode[]
  className?: string
}

export default function Folder({ color = '#f97316', size = 1, items = [], className = '' }: FolderProps) {
  const maxItems = 3
  const papers = items.slice(0, maxItems)
  while (papers.length < maxItems) {
    papers.push(null)
  }

  const [open, setOpen] = useState(false)

  interface Offset {
    x: number
    y: number
  }
  const [paperOffsets, setPaperOffsets] = useState<Offset[]>(
    Array.from({ length: maxItems }, () => ({ x: 0, y: 0 }))
  )

  const folderRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open || !folderRef.current) return

    const rect = folderRef.current.getBoundingClientRect()
    const centerX = (rect.left + rect.width / 2) / window.innerWidth
    const centerY = (rect.top + rect.height / 2) / window.innerHeight

    confetti({
      particleCount: 100,
      spread: 120,
      origin: { x: centerX, y: centerY },
      colors: ['#f97316', '#fafafa', '#fed7aa'],
    })

    setTimeout(() => {
      confetti({
        particleCount: 60,
        spread: 160,
        origin: { x: centerX, y: centerY - 0.05 },
        colors: ['#f97316', '#fed7aa', '#ffedd5'],
      })
    }, 200)

    setTimeout(() => {
      confetti({
        particleCount: 30,
        spread: 80,
        origin: { x: centerX, y: centerY - 0.1 },
        startVelocity: 30,
        colors: ['#f97316', '#fafafa'],
      })
    }, 400)
  }, [open])

  const folderBackColor = darkenColor(color, 0.08)
  const paperColors = [darkenColor('#ffffff', 0.1), darkenColor('#ffffff', 0.05), '#ffffff']

  const handleClick = () => {
    if (!open) {
      playPaperShuffleSound()
    }
    setOpen(prev => !prev)
    if (open) {
      setPaperOffsets(Array.from({ length: maxItems }, () => ({ x: 0, y: 0 })))
    }
  }

  const handlePaperMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (!open) return
    const rect = e.currentTarget.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const offsetX = (e.clientX - centerX) * 0.15
    const offsetY = (e.clientY - centerY) * 0.15
    setPaperOffsets(prev => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: offsetX, y: offsetY }
      return newOffsets
    })
  }

  const handlePaperMouseLeave = (_e: React.MouseEvent<HTMLDivElement>, index: number) => {
    setPaperOffsets(prev => {
      const newOffsets = [...prev]
      newOffsets[index] = { x: 0, y: 0 }
      return newOffsets
    })
  }

  const getOpenTransform = (index: number): string => {
    if (index === 0) return 'translate(-120%, -70%) rotate(-15deg)'
    if (index === 1) return 'translate(10%, -70%) rotate(15deg)'
    if (index === 2) return 'translate(-50%, -100%) rotate(5deg)'
    return ''
  }

  const getPaperStyle = (index: number): React.CSSProperties | undefined => {
    if (!open) return undefined
    return {
      transform: `${getOpenTransform(index)} translate(${paperOffsets[index].x}px, ${paperOffsets[index].y}px)`
    }
  }

  const sizeStyle: React.CSSProperties = {
    transform: `scale(${size})`,
    transformOrigin: 'top center',
  }

  return (
    <div ref={folderRef} style={sizeStyle} className={className}>
      <div
        className={`group relative transition-all duration-200 ease-in cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 ${
          !open ? 'hover:-translate-y-2' : ''
        }`}
        onClick={handleClick}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            handleClick()
          }
        }}
        tabIndex={0}
        role="button"
        aria-expanded={open}
        aria-label={open ? 'Close folder' : 'Open folder'}
      >
        <div
          className="relative w-[68px] h-[54px] sm:w-[80px] sm:h-[60px] md:w-[100px] md:h-[80px] rounded-tl-none rounded-tr-[10px] rounded-br-[10px] rounded-bl-[10px]"
          style={{ backgroundColor: folderBackColor }}
        >
          <div
            className="absolute z-0 bottom-[98%] left-0 w-[30px] h-[10px] rounded-tl-[5px] rounded-tr-[5px] rounded-bl-none rounded-br-none"
            style={{ backgroundColor: folderBackColor }}
          />

          {papers.map((item, i) => {
            let sizeClasses = ''
            if (i === 0) sizeClasses = 'w-[45%] h-[55%] sm:w-[50%] sm:h-[60%] md:w-[70%] md:h-[80%]'
            if (i === 1) sizeClasses = open ? 'w-[55%] h-[55%] sm:w-[60%] sm:h-[60%] md:w-[80%] md:h-[80%]' : 'w-[55%] h-[55%] sm:w-[60%] sm:h-[60%] md:w-[80%] md:h-[70%]'
            if (i === 2) sizeClasses = open ? 'w-[65%] h-[55%] sm:w-[70%] sm:h-[60%] md:w-[90%] md:h-[80%]' : 'w-[65%] h-[55%] sm:w-[70%] sm:h-[60%] md:w-[90%] md:h-[60%]'

            return (
              <div
                key={i}
                onMouseMove={e => handlePaperMouseMove(e, i)}
                onMouseLeave={e => handlePaperMouseLeave(e, i)}
                className={`absolute z-20 bottom-[10%] left-1/2 transition-all duration-300 ease-in-out ${
                  !open
                    ? '-translate-x-1/2 translate-y-[10%] group-hover:translate-y-0'
                    : 'hover:scale-110'
                } ${sizeClasses}`}
                style={{
                  ...(!open ? {} : getPaperStyle(i)),
                  backgroundColor: paperColors[i],
                  borderRadius: '10px'
                }}
              >
                {item}
              </div>
            )
          })}

          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(15deg) scaleY(0.6)' })
            }}
          />
          <div
            className={`absolute z-30 w-full h-full origin-bottom transition-all duration-300 ease-in-out ${
              !open ? 'group-hover:[transform:skew(-15deg)_scaleY(0.6)]' : ''
            }`}
            style={{
              backgroundColor: color,
              borderRadius: '5px 10px 10px 10px',
              ...(open && { transform: 'skew(-15deg) scaleY(0.6)' })
            }}
          />
        </div>
      </div>
    </div>
  )
}
