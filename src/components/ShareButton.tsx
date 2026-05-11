import { useState } from 'react'
import type { RefObject } from 'react'
import toast from 'react-hot-toast'
import { exportCard } from '../utils/exportCard'
import { shareCard } from '../utils/shareCard'

interface ShareButtonProps {
  cardRef: RefObject<HTMLDivElement | null>
}

export default function ShareButton({ cardRef }: ShareButtonProps) {
  const [loading, setLoading] = useState(false)

  async function handleShare() {
    if (!cardRef.current) return
    setLoading(true)
    try {
      const canvas = await exportCard(cardRef.current)
      await shareCard(canvas)
    } catch (e) {
      toast.error('Failed to share. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleShare}
      disabled={loading}
      className="w-full bg-green-500 text-white rounded-xl py-3 font-semibold text-lg hover:bg-green-600 disabled:opacity-50 flex items-center justify-center gap-2"
    >
      {loading ? (
        <>
          <span className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          Preparing...
        </>
      ) : (
        <>
          <span>📤</span> Share Card
        </>
      )}
    </button>
  )
}
