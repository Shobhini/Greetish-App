import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Template } from '../data/templates'
import type { UserProfile } from '../context/AuthContext'
import CardOverlay from './CardOverlay'
import PremiumPopup from './PremiumPopup'

interface TemplateCardProps {
  template: Template
  profile: UserProfile
}

export default function TemplateCard({ template, profile }: TemplateCardProps) {
  const navigate = useNavigate()
  const [showPremium, setShowPremium] = useState(false)

  function handleClick() {
    if (template.isPremium && !profile.isPremium) {
      setShowPremium(true)
    } else {
      navigate(`/preview/${template.id}`)
    }
  }

  return (
    <>
      <div
        onClick={handleClick}
        className="cursor-pointer rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow relative"
      >
        <CardOverlay
          template={template}
          userName={profile.name}
          userPhotoURL={profile.photoURL}
        />
        {template.isPremium && (
          <div className="absolute top-2 right-2 bg-yellow-400 text-yellow-900 text-xs font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
            👑 Premium
          </div>
        )}
      </div>

      {showPremium && <PremiumPopup onClose={() => setShowPremium(false)} />}
    </>
  )
}
