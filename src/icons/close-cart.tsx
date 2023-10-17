import { XMarkIcon } from '@heroicons/react/24/outline'

export default function CloseCart() {
  return (
    <div
      className="relative flex h-11 w-11 items-center justify-center rounded-md border
       transition-colors border-neutral-700 text-white"
    >
      <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
    </div>
  )
}
