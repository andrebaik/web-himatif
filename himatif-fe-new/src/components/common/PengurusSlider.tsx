import type { Pengurus } from '@/types'
import PengurusCard from './PengurusCard'

interface PengurusSliderProps {
  members: Pengurus[]
  title?: string
  onMemberClick?: (member: Pengurus) => void
}

export default function PengurusSlider({ members, title, onMemberClick }: PengurusSliderProps) {
  if (members.length === 0) return null

  return (
    <div>
      {title && (
        <h3 className="text-2xl font-bold text-foreground mb-6">{title}</h3>
      )}
      <div className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {members.map((member) => (
          <PengurusCard
            key={member.id}
            pengurus={member}
            onClick={() => onMemberClick?.(member)}
          />
        ))}
      </div>
      <div className="md:hidden overflow-x-auto -mx-4 px-4 pb-4 snap-x snap-mandatory scrollbar-none">
        <div className="flex gap-4 w-max">
          {members.map((member) => (
            <div key={member.id} className="snap-center w-[85vw] max-w-sm shrink-0">
              <PengurusCard
                pengurus={member}
                onClick={() => onMemberClick?.(member)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
