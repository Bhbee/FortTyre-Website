import Alert from "react-bootstrap/Alert";

export default function MessageBox({
  variant = "success",
  children,
}: {
  variant?: string;
  children: React.ReactNode;
}) {
  return (
    <Alert className="color" variant={variant || "success"}>
      {children}
    </Alert>
  );
}
