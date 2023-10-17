'use client'

import clsx from 'clsx'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { createUrl } from '~/utils'
import { Category } from '~/utils/types'

export default function FilterItem({ item }: { item: Category }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const path = `/products/${item.name.toLowerCase()}`
  const active = pathname === path
  const newParams = new URLSearchParams(searchParams.toString())
  const DynamicTag = active ? 'p' : Link
  newParams.delete('q')

  return (
    <li className="mt-2 flex text-white nav-category-item" key={item.name}>
      <DynamicTag
        href={createUrl(path, newParams)}
        className={clsx('w-full text-sm underline-offset-4 hover:underline hover:text-neutral-100', {
          'underline underline-offset-4': active,
        })}
      >
        {item.name}
      </DynamicTag>
    </li>
  )
}
