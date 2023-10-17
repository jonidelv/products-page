import { expect, test } from '@playwright/test'

const maxDiffPixelRatio = 0.01
const threshold = 0.3

test('Cart Flow', async ({ page }) => {
  await page.goto('/products', { waitUntil: 'networkidle' })

  await expect(page).toHaveTitle('My Store - products')

  const gridItems = await page.$$('.grid-item')
  expect(gridItems.length).toBe(500)

  const navCategoryItems = await page.$$('.nav-category-item')
  expect(navCategoryItems.length).toBe(9)

  const navSortItems = await page.$$('.nav-sort-item')
  expect(navSortItems.length).toBe(4)

  const gridItem = await page.$('.grid-item')
  await gridItem.click()

  await page.waitForLoadState('load')
  await page.waitForLoadState('networkidle')
  await page.waitForSelector('.add-qty')

  const plusButton = await page.$('.add-qty')
  await plusButton.click()

  const addCart = await page.$('.add-to-cart')
  await addCart.click()

  await page.waitForSelector('.cart-panel')
  await page.waitForTimeout(1000) // Wait for animations

  expect(await page.screenshot()).toMatchSnapshot('cart-panel.png', {
    maxDiffPixelRatio,
    threshold,
  })
})
