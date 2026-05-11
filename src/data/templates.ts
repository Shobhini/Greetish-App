export interface Template {
  id: string
  category: 'Birthday' | 'Anniversary' | 'Festival' | 'Love'
  imagePath: string
  isPremium: boolean
  quote?: string
}

export const templates: Template[] = [
  {
    id: 'birthday-1',
    category: 'Birthday',
    imagePath: '/templates/birthday-1.jpg',
    isPremium: false,
    quote: 'Wishing you a wonderful birthday!',
  },
  {
    id: 'birthday-2',
    category: 'Birthday',
    imagePath: '/templates/birthday-2.jpg',
    isPremium: false,
    quote: 'May all your dreams come true!',
  },
  {
    id: 'anniversary-1',
    category: 'Anniversary',
    imagePath: '/templates/anniversary-1.jpg',
    isPremium: false,
    quote: 'Celebrating love, today and always.',
  },
  {
    id: 'anniversary-2',
    category: 'Anniversary',
    imagePath: '/templates/anniversary-2.jpg',
    isPremium: true,
    quote: 'Every moment with you is a gift.',
  },
  {
    id: 'festival-1',
    category: 'Festival',
    imagePath: '/templates/festival-1.jpg',
    isPremium: false,
    quote: 'Wishing you joy and happiness!',
  },
  {
    id: 'festival-2',
    category: 'Festival',
    imagePath: '/templates/festival-2.jpg',
    isPremium: false,
    quote: 'May this festival bring you peace.',
  },
  {
    id: 'love-1',
    category: 'Love',
    imagePath: '/templates/love-1.jpg',
    isPremium: true,
    quote: 'You are my everything.',
  },
  {
    id: 'love-2',
    category: 'Love',
    imagePath: '/templates/love-2.jpg',
    isPremium: false,
    quote: 'Forever and always.',
  },
]

export const categories = ['Birthday', 'Anniversary', 'Festival', 'Love'] as const
export type Category = typeof categories[number]
