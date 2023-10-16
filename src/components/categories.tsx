import clsx from 'clsx'
import { Suspense } from 'react'

import { getCategories } from '~/utils/api'
import FilterList from './filter'

async function CategoriesList() {
  const categories = await getCategories()
  return <FilterList list={categories} />
}

const skeleton = 'mb-3 h-4 w-5/6 animate-pulse rounded'
const activeAndTitles = 'bg-neutral-300'
const items = 'bg-neutral-700'

export default function Categories() {
  return (
    <Suspense
      fallback={
        <div className="col-span-2 hidden w-full flex-none py-4 md:block lg:block sticky top-[72px]">
          <div className={clsx(skeleton, activeAndTitles)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
          <div className={clsx(skeleton, items)} />
        </div>
      }
    >
      <CategoriesList />
    </Suspense>
  )
}
