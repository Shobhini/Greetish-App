import { forwardRef } from 'react'
import type { Template } from '../data/templates'

interface CardOverlayProps {
  template: Template
  userName: string
  userPhotoURL: string
  customQuote?: string
}

const CardOverlay = forwardRef<HTMLDivElement, CardOverlayProps>(
  ({ template, userName, userPhotoURL, customQuote }, ref) => {
    return (
      <div ref={ref} className="relative w-full rounded-xl overflow-hidden aspect-square">
        <img
          src={template.imagePath}
          alt="template"
          className="w-full h-full object-cover"
          crossOrigin="anonymous"
        />
        {/* Dark gradient top */}
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-black/70 to-transparent" />
        {/* Dark gradient bottom */}
        <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-black/75 to-transparent" />

        {/* Avatar + Name row */}
        <div className="absolute top-3 left-0 w-full flex items-center gap-2 px-3">
          <img
            src={userPhotoURL}
            alt="avatar"
            crossOrigin="anonymous"
            className="w-14 h-14 rounded-full border-2 border-green-400 object-cover flex-shrink-0 shadow-lg"
          />
          <span
            className="text-white font-bold text-sm leading-tight"
            style={{ textShadow: '0 1px 4px rgba(0,0,0,0.9)' }}
          >
            {userName}
          </span>
        </div>

        {/* Quote */}
        {(customQuote || template.quote) && (
          <div className="absolute bottom-4 w-full px-4 text-center">
            <p
              className="text-white font-semibold text-sm leading-snug"
              style={{ textShadow: '0 1px 6px rgba(0,0,0,1), 0 0 12px rgba(0,0,0,0.8)' }}
            >
              {customQuote || template.quote}
            </p>
          </div>
        )}
      </div>
    )
  }
)

CardOverlay.displayName = 'CardOverlay'
export default CardOverlay
