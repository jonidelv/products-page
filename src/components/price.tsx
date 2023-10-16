import clsx from 'clsx'

export default function Price({
  amount,
  className,
  currencyCodeClassName,
}: {
  amount: string
  className?: string
  currencyCodeClassName?: string
}) {
  return (
    <p suppressHydrationWarning={true} className={className}>
      {`${new Intl.NumberFormat('en-GB', {
        style: 'currency',
        currency: 'GBP',
        currencyDisplay: 'narrowSymbol',
      }).format(parseFloat(amount))}`}

      <span className={clsx('ml-1 inline', currencyCodeClassName)}>GBP</span>
    </p>
  )
}
