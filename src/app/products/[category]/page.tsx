import Grid from '../../../components/grid'
import { sortings } from '~/utils/constants'
import { filterSortProducts, getProducts } from '~/utils/api'
import { Sorting } from '~/utils/types'
import { Fragment, Suspense } from 'react'
import ProductGridItems from '../../../components/product-grid-items'

const loadingList = Array.from({ length: 6 })

export default async function CategoryPage({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
  params: { category: string }
}) {
  return (
    <Suspense
      fallback={
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loadingList.map((_, index) => (
            <Grid.Item key={index} className="animate-fadeIn">
              <div className="w-full h-full animate-pulse rounded-lg bg-neutral-400 dark:bg-neutral-700" />
            </Grid.Item>
          ))}
        </Grid>
      }
    >
      <GridFetchItems searchParams={searchParams} params={params} />
    </Suspense>
  )
}

async function GridFetchItems({
  searchParams,
  params,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
  params: { category: string }
}) {
  const defaultSort = sortings[0]
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  const { key: sortKey } = sortings.find((item: Sorting) => item.slug === sort) || defaultSort

  const rawProducts = await getProducts()
  const products = filterSortProducts({ products: rawProducts, sortKey, searchValue, category: params.category })

  return (
    <Fragment>
      {products.length === 0 ? (
        <p className="py-3 text-lg">No products found in this category</p>
      ) : (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </Fragment>
  )
}
