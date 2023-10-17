import { Fragment } from 'react'
import Header from '../../components/header'
import Categories from '../../components/categories'
import SortingList from '~/components/sorting'

export const metadata = {
  title: 'My Store - products',
  description: 'Ecommerce site',
}

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      <main>
        <div className="mx-auto flex max-w-screen-2xl flex-col gap-8 px-4 pb-4 text-white md:flex-row">
          <div
            className="
            z-50 order-first w-full flex-none md:max-w-[125px]
            md:sticky top-[72px] sm:bg-neutral-900 xs:bg-neutral-900 md:bg-inherit"
          >
            <Categories />
          </div>
          <div className="order-last min-h-screen w-full md:order-none">{children}</div>
          <div
            className="order-none flex-none md:order-last md:w-[125px] sticky xs:top-[142px] sm:top-[142px]
          sm:bg-neutral-900 xs:bg-neutral-900"
          >
            <SortingList />
          </div>
        </div>
      </main>
    </Fragment>
  )
}
