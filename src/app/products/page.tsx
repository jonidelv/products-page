import Grid from '../../components/grid'
import { sortings } from '~/utils/constants'
import { filterSortProducts, getProducts } from '~/utils/api'
import { Sorting } from '~/utils/types'
import { Fragment, Suspense } from 'react'
import ProductGridItems from '../../components/product-grid-items'

const loadingList = Array.from({ length: 6 })

export default async function ProductsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  return (
    <Suspense
      fallback={
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {loadingList.map((_, index) => (
            <Grid.Item key={index} className="animate-fadeIn">
              <div className="w-full h-full animate-pulse rounded-lg bg-neutral-700" />
            </Grid.Item>
          ))}
        </Grid>
      }
    >
      <GridFetchItems searchParams={searchParams} />
    </Suspense>
  )
}

async function GridFetchItems({ searchParams }: { searchParams?: { [key: string]: string | string[] | undefined } }) {
  const defaultSort = sortings[0]
  const { sort, q: searchValue } = searchParams as { [key: string]: string }
  const { key: sortKey } = sortings.find((item: Sorting) => item.slug === sort) || defaultSort

  const rawProducts = await getProducts()
  const products = filterSortProducts({ products: rawProducts, sortKey, searchValue })
  const resultsText = products.length > 1 ? 'results' : 'result'

  return (
    <Fragment>
      {!!searchValue && (
        <p className="mb-4">
          {products.length === 0
            ? 'There are no products that match '
            : `Showing ${products.length} ${resultsText} for `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      )}
      {products.length > 0 && (
        <Grid className="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          <ProductGridItems products={products} />
        </Grid>
      )}
    </Fragment>
  )
}
