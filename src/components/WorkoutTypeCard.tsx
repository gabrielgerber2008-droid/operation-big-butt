import { useNavigate } from 'react-router-dom'
import type { WorkoutTemplate } from '../types'

interface Props {
  template: WorkoutTemplate
  lastSession?: string | null
}

export const WorkoutTypeCard = ({ template, lastSession }: Props) => {
  const navigate = useNavigate()

  return (
    <button
      onClick={() => navigate(`/log/${template.id}`)}
      className="card-hover w-full text-left p-5 relative overflow-hidden group"
      style={{ background: `linear-gradient(135deg, ${template.color}18 0%, transparent 100%)` }}
    >
      {/* Category color accent line */}
      <span
        className="absolute left-0 top-0 bottom-0 w-0.5 opacity-0 group-hover:opacity-100 transition-opacity rounded-l-2xl"
        style={{ backgroundColor: template.color }}
      />

      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="text-2xl mb-2 leading-none">{template.icon}</p>
          <h3 className="font-bold text-base text-white leading-tight">{template.name}</h3>
          <p className="text-xs text-white/40 mt-1 leading-relaxed">{template.description}</p>
          {lastSession && (
            <p className="text-xs mt-2" style={{ color: `${template.color}99` }}>
              Last: {lastSession}
            </p>
          )}
        </div>
        <div className="text-white/20 group-hover:text-white/50 transition-colors mt-1 shrink-0">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </div>
      </div>
    </button>
  )
}
