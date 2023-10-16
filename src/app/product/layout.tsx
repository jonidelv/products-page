import { Fragment } from 'react'
import Header from '../../components/header'

export default function ProductLayout({ children }: { children: React.ReactNode }) {
  return (
    <Fragment>
      <Header />
      <main>{children}</main>
    </Fragment>
  )
}
