import {ReactNode} from 'react'

type Props = {
  children: ReactNode
}

export default function ContentContainer({children}: Props) {
  return (
    <section>{children}</section>
  )
}