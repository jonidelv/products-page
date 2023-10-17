'use client'

import { useCallback, useState } from 'react'
import { Product } from '~/utils/types'
import ItemQuantityButton from '~/components/item-quantity-button'
import { useSetRecoilState } from 'recoil'
import { cartDialogOpen, cartState } from '~/state'

export default function SubmitProduct({ product }: { product: Product }) {
  const setCartState = useSetRecoilState(cartState)
  const setCartDialogOpen = useSetRecoilState(cartDialogOpen)
  const [itemQuantity, setItemQuantity] = useState(1)
  const setNewQty = useCallback((newQty: number) => setItemQuantity(newQty), [])

  return (
    <div>
      <div className="mb-12">
        <ItemQuantityButton quantity={itemQuantity} setNewQty={setNewQty} />
      </div>
      <button
        onClick={() => {
          setCartState((prev) => ({
            ...prev,
            [product.id]: {
              quantity: (prev[product.id]?.quantity || 0) + itemQuantity,
              product,
            },
          }))
          setCartDialogOpen(true)
          setItemQuantity(1)
        }}
        aria-label="Add to cart"
        className="relative flex w-full items-center justify-center rounded-full
        bg-blue-600 p-4 tracking-wide text-white hover:opacity-90 add-to-cart"
      >
        Add To Cart
      </button>
    </div>
  )
}
