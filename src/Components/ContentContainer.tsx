import { ReactNode } from "react";

type ContainerProps = {
  children: ReactNode;
}

export default function ContentContainer({ children }: ContainerProps) {
  return <section>{children}</section>;
}
