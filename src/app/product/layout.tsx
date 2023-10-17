import { Fragment } from 'react'
import Header from '../../components/header'

export const metadata = {
  title: 'My Store - product',
  description: 'Ecommerce site',
}

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  )
}
