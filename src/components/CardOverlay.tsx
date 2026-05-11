import { forwardRef } from 'react'
import type { Template } from '../data/templates'

interface CardOverlayProps {
  template: Template
  userName: string
  userPhotoURL: string
}

const CardOverlay = forwardRef<HTMLDivElement, CardOverlayProps>(
  ({ template, userName, userPhotoURL }, ref) => {
    return (
      <div ref={ref} className="relative w-full rounded-xl overflow-hidden">
        <img
          src={template.imagePath}
          alt="template"
          className="w-full object-cover"
          crossOrigin="anonymous"
        />
        {/* Name bar */}
        <div className="absolute top-0 left-0 w-full bg-black/60 text-white text-center py-2 font-semibold text-sm">
          {userName}
        </div>
        {/* Avatar */}
        <img
          src={userPhotoURL}
          alt="avatar"
          crossOrigin="anonymous"
          className="absolute top-6 left-3 w-14 h-14 rounded-full border-2 border-green-400 object-cover"
        />
        {/* Quote */}
        {template.quote && (
          <div className="absolute bottom-1/4 w-full px-4 text-center">
            <p className="text-white font-bold text-sm drop-shadow-lg">{template.quote}</p>
          </div>
        )}
      </div>
    )
  }
)

CardOverlay.displayName = 'CardOverlay'
export default CardOverlay
