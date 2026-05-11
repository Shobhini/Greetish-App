import { useState } from 'react'
import { useAuth } from '../hooks/useAuth'
import { useNavigate } from 'react-router-dom'
import { templates, categories } from '../data/templates'
import type { Category } from '../data/templates'
import TemplateCard from '../components/TemplateCard'
import { signOut } from '../services/auth'

export default function Home() {
  const { profile } = useAuth()
  const navigate = useNavigate()
  const [activeCategory, setActiveCategory] = useState<Category>('Birthday')

  const filtered = templates.filter(t => t.category === activeCategory)

  async function handleSignOut() {
    await signOut()
    navigate('/login', { replace: true })
  }

  if (!profile) return null

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img src={profile.photoURL} className="w-8 h-8 rounded-full object-cover" alt="avatar" />
          <span className="font-semibold text-gray-700">Hi, {profile.name}</span>
        </div>
        <button onClick={handleSignOut} className="text-sm text-gray-400 hover:text-gray-600">
          Sign out
        </button>
      </div>

      {/* Category Tabs */}
      <div className="flex gap-2 px-4 py-3 overflow-x-auto">
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${
              activeCategory === cat
                ? 'bg-purple-600 text-white'
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Template Grid */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-8">
        {filtered.map(template => (
          <TemplateCard key={template.id} template={template} profile={profile} />
        ))}
      </div>
    </div>
  )
}
