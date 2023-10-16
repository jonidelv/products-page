import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="font-small p-5">
      <h2 className="mb-2">🚨Product not Found!</h2>
      <div>
        Try again by
        <Link className="bg-neutral-800 hover:bg-neutral-700 text-white py-1 px-2 rounded-lg mr-2 ml-2" href="/">
          Returning
        </Link>
        and trying a different product.
      </div>
    </div>
  )
}
