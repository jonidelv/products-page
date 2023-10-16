import Logo from '../components/logo'
import Link from 'next/link'
import Search from './search'
import dynamic from 'next/dynamic'

// We disable server-side rendering (SSR) because Recoil uses local storage,
// and server-side hydration differs, requiring this adjustment.
const Cart = dynamic(() => import('./cart'), {
  ssr: false,
})

export default async function Header() {
  return (
    <nav className="flex items-center justify-between p-4 lg:px-6 sticky top-0 z-[999] bg-inherit">
      <div className="flex w-full items-center">
        <div className="flex w-auto lg:w-1/3">
          <Link href="/products" className="mr-2 flex w-full items-center md:w-auto lg:mr-6">
            <Logo />
            <div className="ml-2 flex-none text-sm font-medium uppercase hidden lg:block">My Store</div>
          </Link>
        </div>
        <div className="justify-center w-full flex">
          <Search />
        </div>
        <div className="flex justify-end w-auto lg:w-1/3">
          <Cart />
        </div>
      </div>
    </nav>
  )
}
