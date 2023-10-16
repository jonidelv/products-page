'use client'

import { usePathname, useSearchParams } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'

import { ChevronDownIcon } from '@heroicons/react/24/outline'
import FilterItem from './item'
import { Category } from '~/utils/types'
import { AllItem } from '~/components/filter/all'

export default function FilterItemDropdown({ list }: { list: Category[] }) {
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
    const activeItem = list.find((listItem: Category) => {
      const path = `/products/${listItem.name.toLowerCase()}`
      return pathname === path
    })

    if (activeItem) {
      setActive(activeItem.name)
    } else {
      setActive('All')
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
        <div onClick={() => setOpenSelect(false)} className="absolute z-40 w-full rounded-b-md p-4 shadow-md bg-black">
          <AllItem />
          {list.map((item: Category, i) => (
            <FilterItem key={i} item={item} />
          ))}
        </div>
      )}
    </div>
  )
}
