export interface Product {
  id: string;
  title: string;
  category: string;
  price: string;
  image: string;
  description?: string;
}

export interface WardrobeItem {
  id: string;
  title: string;
  category: string;
  image: string;
  lastWorn?: string;
  wearCount?: number;
}

export const IMAGES = {
  intro1: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=800',
  intro2: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800',
  intro3: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=800',
  loginBg: 'https://images.unsplash.com/photo-1485230895905-ec40ba36b9bc?q=80&w=800',
  avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=400',
  fabricBg: 'https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=800', // Premium fabric weave texture
  abstractWardrobe: 'https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=600', // Luxury aesthetic abstract fashion background
};

export const TRENDING_PRODUCTS: Product[] = [
  {
    id: 't1',
    title: 'Double-Breasted Wool Trench',
    category: 'Outerwear',
    price: '$1,290',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600',
  },
  {
    id: 't2',
    title: 'Silk Draped Evening Gown',
    category: 'Dresses',
    price: '$1,850',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600',
  },
  {
    id: 't3',
    title: 'Oversized Wool Tailored Blazer',
    category: 'Blazers',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600',
  }
];

export const EXPLORE_PRODUCTS: Product[] = [
  {
    id: 'e1',
    title: 'Silk Draped Evening Gown',
    category: 'Dresses',
    price: '$1,850',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600',
    description: '100% organic mulberry silk gown with fluid drape back detail.'
  },
  {
    id: 'e2',
    title: 'Structured Leather Tote',
    category: 'Accessories',
    price: '$1,100',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600',
    description: 'Italian full-grain calfskin leather bag with architectural metallic handles.'
  },
  {
    id: 'e3',
    title: 'Oversized Wool Blazer',
    category: 'Blazers',
    price: '$890',
    image: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=600',
    description: 'Structured tailoring with double-vented back in premium merino wool.'
  },
  {
    id: 'e4',
    title: 'Minimalist Gold Chain',
    category: 'Jewelry',
    price: '$450',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600',
    description: '18k solid gold chunky interlocking chain necklace.'
  },
  {
    id: 'e5',
    title: 'Cashmere Ribbed Knit',
    category: 'Knitwear',
    price: '$620',
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600',
    description: 'Ultrasoft pure Mongolian cashmere sweater in warm ivory tone.'
  },
  {
    id: 'e6',
    title: 'Pleated Wool Trousers',
    category: 'Pants',
    price: '$580',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600',
    description: 'High-waisted pleated wool blend trousers with tailored straight leg.'
  }
];

export const MY_WARDROBE: WardrobeItem[] = [
  {
    id: 'w1',
    title: 'Classic Trench Coat',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=600',
    lastWorn: 'Yesterday',
    wearCount: 18,
  },
  {
    id: 'w2',
    title: 'Pleated Wool Trousers',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1624378439575-d8705ad7ae80?q=80&w=600',
    lastWorn: '3 days ago',
    wearCount: 22,
  },
  {
    id: 'w3',
    title: 'Cashmere Knit Sweater',
    category: 'Knitwear',
    image: 'https://images.unsplash.com/photo-1614975058789-41316d0e2e9c?q=80&w=600',
    lastWorn: 'Last week',
    wearCount: 14,
  },
  {
    id: 'w4',
    title: 'Silk Draped Blouse',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600',
    lastWorn: 'May 20',
    wearCount: 8,
  }
];

export const AI_RECOMMENDED_LOOK = {
  name: 'Minimalist Chic Ensemble',
  description: 'A sophisticated combination curated for the mild, breezy weather in Bangalore today.',
  items: [
    {
      id: 'look-1',
      title: 'Silk Draped Blouse',
      category: 'Top',
      brand: 'Serene Atelier',
      image: 'https://images.unsplash.com/photo-1566174053879-31528523f8ae?q=80&w=600'
    },
    {
      id: 'look-2',
      title: 'Minimalist Gold Chain',
      category: 'Jewelry',
      brand: 'Serene Fine',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?q=80&w=600'
    },
    {
      id: 'look-3',
      title: 'Structured Leather Tote',
      category: 'Bag',
      brand: 'Maison Serene',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?q=80&w=600'
    }
  ]
};

export const CHAT_HISTORY = [
  {
    id: 'm1',
    sender: 'stylist',
    text: 'Good morning, Sarswati. I noticed the weather is breezy & mild in Bangalore today (24°C). I suggest pairing the Pure Cashmere knit sweater with your Structured Leather Tote for an effortless day-look.'
  },
  {
    id: 'm2',
    sender: 'user',
    text: 'That sounds perfect! Can you suggest something for a board meeting later this afternoon?'
  },
  {
    id: 'm3',
    sender: 'stylist',
    text: 'Certainly. For a powerful boardroom presence, I recommend layering our Double-Breasted Wool Trench over a sharp tailored silk blouse, complete with the Minimalist Gold Chain.'
  }
];
