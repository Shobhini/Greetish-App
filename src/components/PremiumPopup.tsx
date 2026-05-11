interface PremiumPopupProps {
  onClose: () => void
}

export default function PremiumPopup({ onClose }: PremiumPopupProps) {
  return (
    <div
      className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl p-6 w-80 shadow-xl"
        onClick={e => e.stopPropagation()}
      >
        <div className="text-center mb-4">
          <span className="text-4xl">👑</span>
          <h2 className="text-xl font-bold text-gray-800 mt-2">Go Premium</h2>
          <p className="text-gray-500 text-sm mt-1">Unlock all exclusive greeting templates</p>
        </div>

        <div className="space-y-2 mb-4">
          {[
            { label: 'Monthly', price: '₹49/mo' },
            { label: 'Yearly', price: '₹399/yr', badge: 'Best Value' },
          ].map(plan => (
            <div
              key={plan.label}
              className="flex items-center justify-between border border-purple-200 rounded-lg px-4 py-3 cursor-pointer hover:bg-purple-50"
            >
              <span className="font-medium text-gray-700">{plan.label}</span>
              <div className="flex items-center gap-2">
                {plan.badge && (
                  <span className="text-xs bg-purple-100 text-purple-700 px-2 py-0.5 rounded-full">
                    {plan.badge}
                  </span>
                )}
                <span className="font-bold text-purple-700">{plan.price}</span>
              </div>
            </div>
          ))}
        </div>

        <button className="w-full bg-purple-600 text-white rounded-lg py-2 font-semibold hover:bg-purple-700 mb-2">
          Unlock Premium
        </button>
        <button
          onClick={onClose}
          className="w-full text-gray-400 text-sm hover:text-gray-600"
        >
          Maybe later
        </button>
      </div>
    </div>
  )
}
