import Grid from './grid'
import GridTileImage from './grid/tile'
import { Product } from '~/utils/types'
import Link from 'next/link'
import { getProductToSlug } from '~/utils'

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.id} className="animate-fadeIn">
          <Link className="relative inline-block h-full w-full" href={`/product/${getProductToSlug(product.name)}`}>
            <GridTileImage
              amount={`${product.price}`}
              name={product.name}
              src={product.image}
              sizes="(min-width: 768px) 33vw, (min-width: 640px) 50vw, 100vw"
            />
          </Link>
        </Grid.Item>
      ))}
    </>
  )
}
