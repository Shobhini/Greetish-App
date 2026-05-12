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
    quote: 'Another year older, another reason to celebrate YOU. 🎂',
  },
  {
    id: 'birthday-2',
    category: 'Birthday',
    imagePath: '/templates/birthday-2.jpg',
    isPremium: false,
    quote: 'May today be the start of the best chapter yet. Happy Birthday! 🎉',
  },
  {
    id: 'anniversary-1',
    category: 'Anniversary',
    imagePath: '/templates/anniversary-1.jpg',
    isPremium: false,
    quote: 'Still choosing each other, every single day. ❤️',
  },
  {
    id: 'anniversary-2',
    category: 'Anniversary',
    imagePath: '/templates/anniversary-2.jpg',
    isPremium: true,
    quote: 'The best love stories never have endings. Happy Anniversary! 💫',
  },
  {
    id: 'festival-1',
    category: 'Festival',
    imagePath: '/templates/festival-1.jpg',
    isPremium: false,
    quote: 'May this celebration fill your home with light and laughter. 🪔',
  },
  {
    id: 'festival-2',
    category: 'Festival',
    imagePath: '/templates/festival-2.jpg',
    isPremium: false,
    quote: 'Wishing you a festival as bright as your smile. ✨',
  },
  {
    id: 'love-1',
    category: 'Love',
    imagePath: '/templates/love-1.jpg',
    isPremium: true,
    quote: 'In a world full of people, I would still find you. 💕',
  },
  {
    id: 'love-2',
    category: 'Love',
    imagePath: '/templates/love-2.jpg',
    isPremium: false,
    quote: 'You are my favourite notification. 💌',
  },
]

export const categories = ['Birthday', 'Anniversary', 'Festival', 'Love'] as const
export type Category = typeof categories[number]
