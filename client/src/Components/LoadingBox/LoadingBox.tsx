import Spinner from "react-bootstrap/Spinner";
import "./loadingbox.css";

export default function LoadingBox() {
  return (
    <Spinner animation="border" role="status" className="center">
      <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
}
