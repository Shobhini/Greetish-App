import { useRef, useState } from 'react'
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

  const [customName, setCustomName] = useState('')
  const [customQuote, setCustomQuote] = useState('')
  const [photoPreview, setPhotoPreview] = useState('')

  if (!template || !profile) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Template not found.</p>
      </div>
    )
  }

  const displayName = customName.trim() || profile.name
  const displayPhoto = photoPreview || profile.photoURL

  function handlePhotoChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => setPhotoPreview(reader.result as string)
    reader.readAsDataURL(file)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center gap-3">
        <button
          onClick={() => navigate('/home')}
          className="flex items-center gap-1 text-purple-600 font-medium px-3 py-1.5 rounded-lg hover:bg-purple-50 active:bg-purple-100 transition-colors"
        >
          ← Back
        </button>
        <span className="font-semibold text-gray-700">Personalize & Share</span>
      </div>

      <div className="flex-1 flex flex-col items-center px-4 py-5 gap-5">

        {/* Live card preview */}
        <div className="w-full max-w-sm">
          <CardOverlay
            ref={cardRef}
            template={template}
            userName={displayName}
            userPhotoURL={displayPhoto}
            customQuote={customQuote}
          />
        </div>

        {/* Personalization controls */}
        <div className="w-full max-w-sm bg-white rounded-2xl shadow-sm border border-gray-100 p-4 flex flex-col gap-4">
          <p className="text-xs font-semibold text-gray-400 uppercase tracking-wide">Personalize your card</p>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Name on card</label>
            <input
              type="text"
              value={customName}
              onChange={e => setCustomName(e.target.value)}
              placeholder={profile.name}
              maxLength={30}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400"
            />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-sm font-medium text-gray-600">Quote on card</label>
            <textarea
              value={customQuote}
              onChange={e => setCustomQuote(e.target.value)}
              placeholder={template.quote ?? 'Write a message...'}
              maxLength={120}
              rows={2}
              className="border border-gray-200 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-400 resize-none"
            />
          </div>

          <div className="flex items-center gap-3">
            <img
              src={displayPhoto}
              alt="current avatar"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
            />
            <div className="flex flex-col gap-0.5">
              <label className="text-sm font-medium text-gray-600">Profile photo</label>
              <label className="text-xs text-purple-600 font-medium cursor-pointer hover:underline">
                Tap to change photo
                <input type="file" accept="image/*" className="hidden" onChange={handlePhotoChange} />
              </label>
            </div>
          </div>
        </div>

        {/* Share / Download */}
        <div className="w-full max-w-sm">
          <ShareButton
            templateSrc={template.imagePath}
            avatarSrc={displayPhoto}
            userName={displayName}
            quote={customQuote || template.quote || ''}
          />
        </div>

      </div>
    </div>
  )
}
