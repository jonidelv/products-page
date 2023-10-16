'use client'

import { ShoppingCartIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { Dialog, Transition } from '@headlessui/react'
import { Fragment, useMemo, useState } from 'react'
import CloseCart from '../icons/close-cart'
import OpenCart from '../icons/open-cart'
import { cartDialogOpen, cartItemsNumber, cartState as recoilCartState } from '~/state'
import { SetterOrUpdater, useRecoilState, useRecoilValue } from 'recoil'
import { CartItemType, CartStateType, Product } from '~/utils/types'
import { getProductToSlug } from '~/utils'
import Image from 'next/image'
import Link from 'next/link'
import ItemQuantityButton from '~/components/item-quantity-button'
import Price from './price'
import LoadingDots from './loading-dots'
import clsx from 'clsx'
import { postCart } from '~/utils/api'
import toast from 'react-hot-toast'

export default function Cart() {
  const cartCount = useRecoilValue(cartItemsNumber)
  const [cartState, setCartState] = useRecoilState(recoilCartState)
  const [isOpen, setIsOpen] = useRecoilState(cartDialogOpen)
  const [loading, setLoading] = useState(false)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const itemList: CartItemType[] = useMemo(() => Object.values(cartState), [cartState])

  const totalSum = useMemo(() => {
    return itemList.reduce((total, item) => {
      return total + item.product.price * item.quantity
    }, 0)
  }, [itemList])

  return (
    <>
      <button aria-label="Open cart" onClick={openCart} className="ml-2">
        <OpenCart quantity={cartCount} />
      </button>
      <Transition show={isOpen}>
        <Dialog onClose={closeCart} className="relative z-[999]">
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="opacity-0 backdrop-blur-none"
            enterTo="opacity-100 backdrop-blur-[.5px]"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="opacity-100 backdrop-blur-[.5px]"
            leaveTo="opacity-0 backdrop-blur-none"
          >
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="transition-all ease-in-out duration-300"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition-all ease-in-out duration-200"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel
              className="fixed bottom-0 right-0 top-0 flex h-full w-full flex-col border-l p-6
            backdrop-blur-xl border-neutral-700 bg-black/80 text-white md:w-[390px]"
            >
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">My Cart</p>
                <button
                  aria-label="Close cart"
                  onClick={closeCart}
                  className={loading ? 'pointer-events-none opacity-50' : ''}
                >
                  <CloseCart />
                </button>
              </div>

              {itemList.length === 0 ? (
                <div className="mt-20 flex w-full flex-col items-center justify-center overflow-hidden">
                  <ShoppingCartIcon className="h-16" />
                  <p className="mt-6 text-center text-2xl font-bold">Your cart is empty.</p>
                </div>
              ) : (
                <div className="flex h-full flex-col justify-between overflow-hidden p-1">
                  <ul className="flex-grow overflow-auto py-4">
                    {itemList.map((item, i) => (
                      <CartItem
                        key={i}
                        loading={loading}
                        product={item.product}
                        setCartState={setCartState}
                        closeCart={closeCart}
                        quantity={item.quantity}
                      />
                    ))}
                  </ul>
                  <div className="py-4 text-sm text-neutral-400">
                    <div className="mb-3 flex items-center justify-between border-b pb-1 border-neutral-700">
                      <p>Subtotal</p>
                      <Price className="text-right text-base text-white" amount={`${totalSum}`} />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b pb-1 border-neutral-700">
                      <p>Taxes (10%)</p>
                      <Price className="text-right text-base text-white" amount={`${totalSum * 0.1}`} />
                    </div>
                    <div className="mb-3 flex items-center justify-between border-b pb-1 pt-1 border-neutral-700">
                      <p>Total</p>
                      <Price className="text-right text-base text-white" amount={`${totalSum * 1.1}`} />
                    </div>
                  </div>
                  <button
                    onClick={async () => {
                      if (loading) return
                      try {
                        setLoading(true)
                        const products = itemList.map((item) => ({ id: item.product.id, quantity: item.quantity }))
                        await postCart(products)
                        setCartState({})
                        closeCart()
                        toast.success('Thanks for buying, your order is ready to go!')
                      } catch {
                        toast.error('There was an error, please try again or contact support')
                      } finally {
                        setLoading(false)
                      }
                    }}
                    className={clsx(
                      'block w-full rounded-full bg-blue-600 p-3 text-center text-sm font-medium text-white' +
                        'opacity-90 hover:opacity-100 relative',
                      { 'cursor-not-allowed opacity-60 pointer-events-none': loading },
                    )}
                    disabled={loading}
                  >
                    <div className="absolute left-0 ml-4">{loading && <LoadingDots className="mb-3 bg-white" />}</div>
                    Proceed to Buy
                  </button>
                </div>
              )}
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  )
}

interface CartItemProps {
  loading: boolean
  product: Product
  quantity: number
  closeCart: () => void
  setCartState: SetterOrUpdater<CartStateType>
}

function CartItem({ loading, product, setCartState, closeCart, quantity }: CartItemProps) {
  return (
    <li
      className={clsx('flex w-full flex-col border-b border-neutral-700', {
        'cursor-not-allowed opacity-50 pointer-events-none': loading,
      })}
    >
      <div className="relative flex w-full flex-row justify-between px-1 py-4">
        <div className="absolute z-40 -mt-2 ml-[55px]">
          <button
            onClick={() => {
              setCartState((prev: CartStateType) => {
                const newCart = { ...prev }
                delete newCart[product.id]
                return newCart
              })
            }}
            aria-label="Remove cart item"
            className="ease flex h-[17px] w-[17px] items-center justify-center rounded-full bg-neutral-500
            transition-all duration-200"
          >
            <XMarkIcon className="hover:text-accent-3 mx-[1px] h-4 w-4 text-black" />
          </button>
        </div>
        <Link
          href={`/product/${getProductToSlug(product.name)}`}
          onClick={closeCart}
          className="z-30 flex flex-row space-x-4"
        >
          <div
            className="relative h-16 w-16 cursor-pointer overflow-hidden rounded-md border
            border-neutral-700 bg-neutral-900 hover:bg-neutral-800"
          >
            <Image
              className="h-full w-full object-cover"
              width={64}
              height={64}
              alt={product.name}
              src={product.image}
            />
          </div>
          <div className="flex flex-1 flex-col text-base">
            <span className="leading-tight">{product.name}</span>
            <p className="text-sm text-neutral-400 mr-4 line-clamp-2">{product.description}</p>
          </div>
        </Link>
        <div className="flex h-16 flex-col justify-between">
          <Price className="flex justify-end space-y-2 text-right text-sm" amount={`${product.price * quantity}`} />
          <ItemQuantityButton
            quantity={quantity}
            setNewQty={(newQty) => {
              setCartState((prev: CartStateType) => {
                return {
                  ...prev,
                  [product.id]: {
                    quantity: newQty,
                    product,
                  },
                }
              })
            }}
          />
        </div>
      </div>
    </li>
  )
}
