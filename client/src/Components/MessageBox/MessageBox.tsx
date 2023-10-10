import Alert from "react-bootstrap/Alert";

export default function MessageBox({
  variant = "info",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) {
  return <Alert className="color" variant={variant || "info"}>{children}</Alert>;
}
