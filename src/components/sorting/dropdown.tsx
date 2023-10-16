'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import SortingItem from './item'
import { Sorting } from '~/utils/types'

export default function FilterItemDropdown({ list }: { list: Sorting[] }) {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [active, setActive] = useState('')
  const [openSelect, setOpenSelect] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpenSelect(false)
      }
    }

    window.addEventListener('click', handleClickOutside)
    return () => window.removeEventListener('click', handleClickOutside)
  }, [])

  useEffect(() => {
    const sortPram = searchParams.get('sort')
    const activeItem = list.find((listItem: Sorting) => {
      const slug = listItem.slug
      return sortPram === slug
    })

    if (activeItem) {
      setActive(activeItem.name)
    } else {
      setActive('Trending')
    }
  }, [pathname, list, searchParams])

  return (
    <div className="relative" ref={ref}>
      <div
        onClick={() => {
          setOpenSelect(!openSelect)
        }}
        className="flex w-full items-center justify-between rounded border px-4 py-2 text-sm border-white/30"
      >
        <div>{active}</div>
        <ChevronDownIcon className="h-4" />
      </div>
      {openSelect && (
        <div
          onClick={() => {
            setOpenSelect(false)
          }}
          className="absolute z-40 w-full rounded-b-md p-4 shadow-md bg-black"
        >
          {list.map((item: Sorting, i) => (
            <SortingItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
