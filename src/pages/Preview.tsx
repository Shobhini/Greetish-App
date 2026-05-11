import { useRef } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { templates } from '../data/templates'
import CardOverlay from '../components/CardOverlay'
import ShareButton from '../components/ShareButton'

export default function Preview() {
  const { id } = useParams<{ id: string }>()
  const { profile } = useAuth()
  const navigate = useNavigate()
  const cardRef = useRef<HTMLDivElement>(null)

  const template = templates.find(t => t.id === id)

  if (!template || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Template not found.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <button onClick={() => navigate('/home')} className="text-purple-600 font-medium">
          ← Back
        </button>
        <span className="font-semibold text-gray-700">Preview</span>
      </div>

      {/* Card */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-6 gap-6">
        <div className="w-full max-w-sm">
          <CardOverlay
            ref={cardRef}
            template={template}
            userName={profile.name}
            userPhotoURL={profile.photoURL}
          />
        </div>

        <div className="w-full max-w-sm">
          <ShareButton cardRef={cardRef} />
        </div>
      </div>
    </div>
  )
}
