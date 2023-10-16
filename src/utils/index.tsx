import { ReadonlyURLSearchParams } from 'next/navigation'

export function createUrl(pathname: string, params: URLSearchParams | ReadonlyURLSearchParams) {
  const paramsString = params.toString()
  const queryString = `${paramsString.length ? '?' : ''}${paramsString}`

  return `${pathname}${queryString}`
}

export function getProductToSlug(productName: string) {
  return productName.toLowerCase().replace(/\s+/g, '-')
}

export function getSlugToProductName(slug: string) {
  const productName = slug.replace(/-/g, ' ').toLowerCase()
  const firstChar = productName.charAt(0).toUpperCase()
  return firstChar + productName.slice(1)
}
