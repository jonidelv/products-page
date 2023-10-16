import { Sorting } from '~/utils/types'

export const sortings: Sorting[] = [
  { name: 'Default', key: 'DEFAULT', slug: null },
  { name: 'Price: Low to high', key: 'PRICE_LOW', slug: 'price-asc' },
  { name: 'Price: High to low', key: 'PRICE_HIGH', slug: 'price-desc' },
  { name: 'Trending', key: 'TRENDING', slug: 'trending' },
]
