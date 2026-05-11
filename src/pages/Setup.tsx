import { useState, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'
import { useProfile } from '../hooks/useProfile'

export default function Setup() {
  const { user, refreshProfile } = useAuth()
  const { uploadPhoto, saveProfile } = useProfile()
  const navigate = useNavigate()
  const [name, setName] = useState('')
  const [photoFile, setPhotoFile] = useState<File | null>(null)
  const [preview, setPreview] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const fileRef = useRef<HTMLInputElement>(null)

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    setPhotoFile(file)
    setPreview(URL.createObjectURL(file))
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!user || !photoFile) {
      setError('Please provide a name and profile photo.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const photoURL = await uploadPhoto(user.uid, photoFile)
      await saveProfile(user.uid, name.trim(), photoURL)
      await refreshProfile()
      navigate('/home', { replace: true })
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-pink-50">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-2xl font-bold text-center text-purple-700 mb-2">Set Up Profile</h1>
        <p className="text-center text-gray-500 text-sm mb-6">This is shown on your greeting cards</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col items-center gap-2">
            <div
              onClick={() => fileRef.current?.click()}
              className="w-24 h-24 rounded-full bg-gray-100 border-2 border-dashed border-purple-300 flex items-center justify-center cursor-pointer overflow-hidden"
            >
              {preview
                ? <img src={preview} className="w-full h-full object-cover" alt="preview" />
                : <span className="text-gray-400 text-xs text-center px-2">Tap to upload photo</span>
              }
            </div>
            <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleFileChange} />
          </div>

          <input
            type="text"
            placeholder="Your display name"
            value={name}
            onChange={e => setName(e.target.value)}
            required
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-400"
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 disabled:opacity-50"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Uploading...
              </span>
            ) : 'Continue'}
          </button>
        </form>
      </div>
    </div>
  )
}
