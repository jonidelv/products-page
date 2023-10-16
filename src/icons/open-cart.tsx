import { ShoppingCartIcon } from '@heroicons/react/24/outline';

export default function OpenCart({ quantity } : { quantity?: number }) {
  return (
    <div className="
      relative flex h-[40px] w-[40px] items-center justify-center rounded-md
      border transition-colors border-neutral-700 text-white"
    >
      <ShoppingCartIcon className="h-4 transition-all ease-in-out hover:scale-110" />
      {!!quantity && (
        <div
          className="absolute right-0 top-0 -mr-2 -mt-2 h-4 w-4 rounded bg-blue-600 text-[11px] font-medium text-white"
        >
          {quantity}
        </div>
      )}
    </div>
  );
}
