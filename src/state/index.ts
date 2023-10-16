import { atom, selector } from 'recoil'
import { recoilPersist } from 'recoil-persist'
import { CartStateType } from '~/utils/types'

export const recoilKey = 'CART--RECOIL'
const { persistAtom } = recoilPersist({ key: recoilKey })

export const cartState = atom<CartStateType>({
  key: 'cart',
  default: {},
  effects_UNSTABLE: [persistAtom],
})

export const cartDialogOpen = atom({
  key: 'cartDialogOpen',
  default: false,
})

export const cartItemsNumber = selector<number>({
  key: 'cartItemsNumber',
  get: ({ get }) => {
    const cartStateObject = get(cartState)
    return Object.keys(cartStateObject).length
  },
})
