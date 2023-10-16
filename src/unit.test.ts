const { createUrl, getProductToSlug, getSlugToProductName } = require('./utils')
const { filterSortProducts } = require('./utils/api')

describe('createUrl', () => {
  it('should return a URL with query parameters', () => {
    const params = new URLSearchParams({ param1: 'value1', param2: 'value2' })
    expect(createUrl('/test', params)).toBe('/test?param1=value1&param2=value2')
  })

  it('should return a URL without query parameters when no parameters are provided', () => {
    const params = new URLSearchParams()
    expect(createUrl('/test', params)).toBe('/test')
  })
})

describe('getProductToSlug', () => {
  it('should return a slug from a product name', () => {
    const product = { name: 'Test Product' }
    expect(getProductToSlug(product.name)).toBe('test-product')
  })
})

describe('getSlugToProductName', () => {
  it('should return a product name from a slug', () => {
    const slug = 'test-product'
    expect(getSlugToProductName(slug)).toBe('Test product')
  })
})

describe('filterSortProducts', () => {
  const products = [
    {
      id: 1,
      name: 'Product 1',
      price: 386,
      category: {
        name: 'Haircare',
        order: 700,
      },
    },
    {
      id: 2,
      name: 'Product 2',
      price: 488,
      category: {
        name: 'Actives',
        order: 300,
      },
    },
    {
      id: 3,
      name: 'Product 3',
      price: 106,
      category: {
        name: 'Mask',
        order: 500,
      },
    },
    {
      id: 4,
      name: 'Product 4',
      price: 486,
      category: {
        name: 'Sunscreen',
        order: 600,
      },
    },
  ]

  it('should filter and sort products correctly', () => {
    const result = filterSortProducts({
      products,
      sortKey: 'PRICE_LOW',
      searchValue: 'Product',
    })

    expect(result).toHaveLength(4)
    expect(result[0].id).toBe(3) // Product with lowest price
    expect(result[3].id).toBe(2) // Product with highest price
  })

  it('should filter by category and sort by trending', () => {
    const result = filterSortProducts({
      products,
      sortKey: 'TRENDING',
      searchValue: '',
      category: 'Haircare',
    })

    expect(result).toHaveLength(1)
    expect(result[0].id).toBe(1) // Only product in 'Haircare' category
  })
})
