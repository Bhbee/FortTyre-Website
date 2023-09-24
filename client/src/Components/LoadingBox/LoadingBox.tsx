import Spinner from "react-bootstrap/Spinner";
import "./loadingbox.css";

type LoadingProps = {
  color?: string
}

export default function LoadingBox({color}: LoadingProps) {
  
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: color && color
      }}
    >
      <Spinner animation="border" role="status" className="center">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
