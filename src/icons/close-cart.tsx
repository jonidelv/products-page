import { XMarkIcon } from '@heroicons/react/24/outline';

export default function CloseCart() {
  return (
    <div className="
      relative flex h-11 w-11 items-center justify-center rounded-md border 
      border-neutral-200 text-black transition-colors dark:border-neutral-700
      dark:text-white
    ">
      <XMarkIcon className="h-6 transition-all ease-in-out hover:scale-110" />
    </div>
  );
}
