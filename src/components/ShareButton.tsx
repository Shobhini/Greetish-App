import { useState } from 'react'
import toast from 'react-hot-toast'
import { exportCard } from '../utils/exportCard'
import { shareCard } from '../utils/shareCard'
import { downloadCard } from '../utils/downloadCard'

interface ShareButtonProps {
  templateSrc: string
  avatarSrc: string
  userName: string
  quote: string
}

const canNativeShare = typeof navigator !== 'undefined' && !!navigator.share

export default function ShareButton({ templateSrc, avatarSrc, userName, quote }: ShareButtonProps) {
  const [sharing, setSharing] = useState(false)
  const [downloading, setDownloading] = useState(false)

  async function getCanvas() {
    return exportCard(templateSrc, avatarSrc, userName, quote)
  }

  async function handleShare() {
    setSharing(true)
    try {
      const canvas = await getCanvas()
      await shareCard(canvas)
      toast.success('Shared!')
    } catch {
      toast.error('Failed to share. Try downloading instead.')
    } finally {
      setSharing(false)
    }
  }

  async function handleDownload() {
    setDownloading(true)
    try {
      const canvas = await getCanvas()
      await downloadCard(canvas)
      toast.success('Card saved to your device!')
    } catch {
      toast.error('Download failed. Please try again.')
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex gap-3 justify-center">
        {canNativeShare && (
          <button
            onClick={handleShare}
            disabled={sharing || downloading}
            className="bg-green-500 text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-green-600 active:bg-green-700 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-md"
          >
            {sharing ? (
              <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <><span>📤</span> Share</>
            )}
          </button>
        )}

        <button
          onClick={handleDownload}
          disabled={sharing || downloading}
          className="bg-purple-600 text-white rounded-full px-6 py-2.5 font-semibold text-sm hover:bg-purple-700 active:bg-purple-800 disabled:opacity-50 transition-colors flex items-center gap-2 shadow-md"
        >
          {downloading ? (
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : (
            <><span>⬇️</span> Download</>
          )}
        </button>
      </div>

      {!sharing && !downloading && canNativeShare && (
        <div className="flex items-center justify-center gap-3 text-gray-400 text-xs">
          <span>🟢 WhatsApp</span>
          <span>·</span>
          <span>📸 Instagram</span>
          <span>·</span>
          <span>✉️ Email</span>
        </div>
      )}
    </div>
  )
}
