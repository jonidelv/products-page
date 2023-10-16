import { notFound } from 'next/navigation'
import { getProduct } from '~/utils/api'
import Price from '../../../components/price'
import Image from 'next/image'
import SubmitProduct from '~/components/submit-product'

export default async function ProductPage({ params }: { params: { product: string } }) {
  const product = await getProduct(params.product)

  if (!product) return notFound()

  return (
    <div className="mx-auto max-w-screen-2xl px-4 pb-4">
      <div
        className="flex flex-col rounded-lg border p-8 border-neutral-800 bg-black md:p-12 lg:flex-row lg:gap-8
      lg:h-[calc(89vh)]"
      >
        <div className="h-full w-full basis-full lg:basis-4/6">
          <div className="relative aspect-square h-full max-h-[550px] w-full overflow-hidden">
            <Image
              className="h-full w-full object-contain"
              fill
              sizes="(min-width: 1024px) 66vw, 100vw"
              alt={product.name}
              src={product.image}
              priority={true}
            />
          </div>
        </div>
        <div className="mb-7 lg:mb-0" />
        <div className="basis-full lg:basis-2/6">
          <div className="mb-6 flex flex-col border-b pb-6 border-neutral-700">
            <h1 className="mb-2 text-5xl font-medium">{product.name}</h1>
            <div className="mr-auto w-auto rounded-full bg-blue-600 p-2 text-sm text-white">
              <Price amount={`${product.price}`} />
            </div>
          </div>
          {!!product.description && (
            <p className="mb-6 text-sm leading-tight text-white/[60%]">{product.description}</p>
          )}
          <SubmitProduct product={product} />
        </div>
      </div>
    </div>
  )
}
