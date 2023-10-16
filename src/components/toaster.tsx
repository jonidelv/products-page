'use client'

import { Toaster } from 'react-hot-toast'

const options = {
  duration: 3500,
}

export default function MyToaster() {
  return <Toaster position="top-center" reverseOrder={false} gutter={8} toastOptions={options} />
}
