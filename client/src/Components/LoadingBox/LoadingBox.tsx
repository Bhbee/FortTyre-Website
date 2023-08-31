import Spinner from "react-bootstrap/Spinner";
import "./loadingbox.css";

export default function LoadingBox() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
      }}
    >
      <Spinner animation="border" role="status" className="center">
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    </div>
  );
}
