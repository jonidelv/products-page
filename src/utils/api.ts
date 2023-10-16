import { Category, Product, ProductPostItem } from './types'
import { getSlugToProductName } from './index'

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

// @ts-ignore
async function fetchWithRetry(url: string, maxRetries = 3, currentAttempt = 0) {
  try {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return response
  } catch (error) {
    if (currentAttempt < maxRetries) {
      console.log(`Retrying request (attempt ${currentAttempt + 1})...`)
      await sleep(Math.floor(Math.random() * 800) + 100) // Wait for the random delay
      return fetchWithRetry(url, maxRetries, currentAttempt + 1)
    } else {
      throw error // If max retries reached, rethrow the error
    }
  }
}

export async function getCategories(): Promise<Category[] | []> {
  const url = 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/categories'
  try {
    await sleep(1000) // Intentionally delay execution to allow the loading state to be visible to the user
    const response = await fetchWithRetry(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const categories: Category[] = await response.json()
    return categories
  } catch (error) {
    console.error('An error occurred while fetching the categories:', error)
    return [] // Returning an empty array is acceptable since the app can still function without the categories.
  }
}

export async function getProducts(): Promise<Product[]> {
  const url = 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/products'
  try {
    const response = await fetchWithRetry(url)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const products: Product[] = await response.json()
    return products
  } catch (error) {
    console.error('An error occurred while fetching the products:', error)
    throw error // re-throw the error to be handled by the calling code
  }
}

export function filterSortProducts({
  products,
  sortKey,
  searchValue,
  category,
}: {
  products: Product[]
  sortKey: string
  searchValue: string
  category?: string
}): Product[] {
  const searchLower = searchValue && searchValue.toLowerCase()
  const categoryLower = category && category.toLowerCase()

  let filteredProducts = [...products]

  if (searchLower || categoryLower) {
    filteredProducts = products.filter((product) => {
      const searchMatch = !searchLower || product.name.toLowerCase().includes(searchLower)
      const categoryMatch = !categoryLower || product.category.name.toLowerCase() === categoryLower

      return searchMatch && categoryMatch
    })
  }

  if (sortKey !== 'DEFAULT') {
    filteredProducts = filteredProducts.sort((a, b) => {
      switch (sortKey) {
        case 'TRENDING':
          return b.category.order - a.category.order
        case 'PRICE_LOW':
          return a.price - b.price
        case 'PRICE_HIGH':
          return b.price - a.price
        default:
          return a.id - b.id // Default by ID
      }
    })
  }

  return filteredProducts
}

export async function getProduct(slug: string): Promise<Product | undefined> {
  try {
    const products = await getProducts()
    const productName = getSlugToProductName(slug)
    return products.find(({ name }) => name === productName)
  } catch (error) {
    console.error('An error occurred while fetching the product:', error)
    throw error // re-throw the error to be handled by the calling code
  }
}

export async function postCart(products: ProductPostItem[]) {
  const url = 'https://gh-fe-exercise-api-4f80a724b506.herokuapp.com/api/orders'
  const payload = { products }
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      throw new Error('Network response was not ok')
    }

    const data = await response.json()
    return data
  } catch (error) {
    throw new Error('Error posting cart')
  }
}
