'use client' // Error components must be Client Components

export default function Error({ reset }: { reset: () => void }) {
  return (
    <div className="font-small">
      <h2 className="mb-2">🚨 Something went wrong!</h2>
      <div>
        Try again by
      <button
        className="bg-neutral-800 hover:bg-neutral-700 text-white py-1 px-2 rounded-lg mr-2 ml-2"
        onClick={
          // Attempt to recover by trying to re-render the segment
          () => reset()
        }
      >
        clicking here
      </button>
         or reload the app (cmd + R)
      </div>
    </div>
  )
}