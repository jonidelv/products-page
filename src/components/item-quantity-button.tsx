import LoadingDots from './loading-dots'
import clsx from 'clsx'
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline'

interface ItemQuantityButtonProps {
  quantity: number
  loading?: boolean
  setNewQty: (newQty: number) => void
}

export default function ItemQuantityButton({ quantity, loading, setNewQty }: ItemQuantityButtonProps) {
  return (
    <div className="flex h-9 flex-row items-center rounded-full border border-neutral-700 max-w-[110px] justify-center">
      <button
        onClick={() => {
          if (loading || quantity <= 1) return
          setNewQty(quantity - 1)
        }}
        aria-disabled={loading}
        className={clsx(
          'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full ' +
            'px-2 transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
          { 'cursor-not-allowed hidden': loading },
        )}
      >
        <MinusIcon className="h-4 w-4 text-neutral-500" />
      </button>
      <p className="w-6 text-center flex items-center justify-center">
        {loading ? <LoadingDots className="bg-white" /> : <span className="w-full text-sm">{quantity}</span>}
      </p>
      <button
        onClick={() => {
          if (loading || quantity >= 10) return
          setNewQty(quantity + 1)
        }}
        aria-disabled={loading}
        className={clsx(
          'ease flex h-full min-w-[36px] max-w-[36px] flex-none items-center justify-center rounded-full px-2 ' +
            'transition-all duration-200 hover:border-neutral-800 hover:opacity-80',
          { 'cursor-not-allowed hidden': loading },
        )}
      >
        <PlusIcon className="h-4 w-4 text-neutral-500" />
      </button>
    </div>
  )
}
