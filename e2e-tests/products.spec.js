import { expect, test } from '@playwright/test'

const maxDiffPixelRatio = 0.01
const threshold = 0.3
const fullPage = false

test('Products page', async ({ page }) => {
  await page.goto('/products', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('My Store - products')

  const gridItems = await page.$$('.grid-item')
  expect(gridItems.length).toBe(500)

  const navCategoryItems = await page.$$('.nav-category-item')
  expect(navCategoryItems.length).toBe(9)

  const navSortItems = await page.$$('.nav-sort-item')
  expect(navSortItems.length).toBe(4)

  expect(await page.screenshot({ fullPage })).toMatchSnapshot('products-page.png', {
    maxDiffPixelRatio,
    threshold,
  })
})

test('Product category page', async ({ page }) => {
  await page.goto('/products/oils', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('My Store - category')

  const gridItems = await page.$$('.grid-item')
  expect(gridItems.length).toBe(63)

  const navCategoryItems = await page.$$('.nav-category-item')
  expect(navCategoryItems.length).toBe(9)

  const navSortItems = await page.$$('.nav-sort-item')
  expect(navSortItems.length).toBe(4)

  expect(await page.screenshot({ fullPage })).toMatchSnapshot('product-category-page.png', {
    maxDiffPixelRatio,
    threshold,
  })
})

test('Product page sorting and searching', async ({ page }) => {
  await page.goto('/products?sort=price-desc&q=6', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('My Store - products')

  const gridItems = await page.$$('.grid-item')
  expect(gridItems.length).toBe(95)

  const navCategoryItems = await page.$$('.nav-category-item')
  expect(navCategoryItems.length).toBe(9)

  const navSortItems = await page.$$('.nav-sort-item')
  expect(navSortItems.length).toBe(4)

  expect(await page.screenshot({ fullPage })).toMatchSnapshot('product-sorting-searching-page.png', {
    maxDiffPixelRatio,
    threshold,
  })
})
