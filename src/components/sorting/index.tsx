import SortingItemDropdown from './dropdown'
import SortingItem from './item'
import { Fragment } from 'react'
import { sortings } from '~/utils/constants'
import { Sorting } from '~/utils/types'

function SortingItemList({ list }: { list: Sorting[] }) {
  return (
    <Fragment>
      {list.map((item: Sorting, i) => (
        <SortingItem key={i} item={item} />
      ))}
    </Fragment>
  )
}

export default function SortingList() {
  return (
    <nav className="sticky sm:top-[72px] xs:top-[72px]">
      <h3 className="hidden text-xs text-neutral-500 text-neutral-400 md:block">Sort by</h3>
      <ul className="hidden md:block">
        <SortingItemList list={sortings} />
      </ul>
      <ul className="md:hidden">
        <SortingItemDropdown list={sortings} />
      </ul>
    </nav>
  )
}
