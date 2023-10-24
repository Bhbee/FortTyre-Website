import Alert from "react-bootstrap/Alert";
import "./messagebox.css";

export default function MessageBox({
  variant = "custom-alert",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) {
  return <Alert variant="custom-alert" >{children}</Alert>;
}
