import Image from 'next/image'
import Price from '~/components/price'

export default function GridTileImage({
  name,
  src,
  sizes,
  amount,
}: {
  amount: string
  name: string
  src: string
  sizes: string
}) {
  return (
    <div
      className="group flex h-full w-full items-center justify-center overflow-hidden rounded-lg border
    hover:border-blue-600 hover:border-2 bg-black border-neutral-800 relative"
    >
      <Image
        fill
        className="relative h-full w-full object-contain transition duration-300 ease-in-out group-hover:scale-105"
        alt={name}
        src={src}
        sizes={sizes}
      />
      <div className="absolute bottom-0 left-0 flex w-full px-4 pb-4 @container/label">
        <div
          className="flex items-center rounded-full border p-1 text-xs font-semibold backdrop-blur-md
        border-neutral-800 bg-black/70 text-white"
        >
          <h3 className="mr-4 line-clamp-2 flex-grow pl-2 leading-none tracking-tight">{name}</h3>
          <Price
            className="flex-none rounded-full bg-blue-600 p-2 text-white"
            amount={amount}
            currencyCodeClassName="hidden @[275px]/label:inline"
          />
        </div>
      </div>
    </div>
  )
}
