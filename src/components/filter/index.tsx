import FilterItemDropdown from './dropdown'
import FilterItem from './item'
import { Fragment } from 'react'
import { Category } from '~/utils/types'
import { AllItem } from '~/components/filter/all'

function FilterItemList({ list }: { list: Category[] }) {
  return (
    <Fragment>
      <AllItem />
      {list.map((item: Category, i) => (
        <FilterItem key={i} item={item} />
      ))}
    </Fragment>
  )
}

export default function FilterList({ list }: { list: Category[] }) {
  return (
    <nav className="sticky top-[72px]">
      <h3 className="hidden text-xs text-neutral-400 md:block">Categories</h3>
      <ul className="hidden md:block">
        <FilterItemList list={list} />
      </ul>
      <ul className="md:hidden">
        <FilterItemDropdown list={list} />
      </ul>
    </nav>
  )
}
