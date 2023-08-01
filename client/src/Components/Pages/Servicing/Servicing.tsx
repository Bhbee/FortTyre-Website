import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import { Helmet } from "react-helmet-async";
import servicing_os from "../../../Assets/servicing_os.png";
import "./servicing.css";

const Servicing: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Tyre Servicing</title>
      </Helmet>
      <h3 className="servicing-heading mt-5">Servicing</h3>
      <Row>
        <Col classame="servicing-img" md={6}>
          <div>
            {" "}
            <Image src={servicing_os} fluid />
          </div>
        </Col>
        <Col className="servicing" md={6}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Praesentium
          vero obcaecati incidunt rem nostrum autem iste id mollitia modi minus
          saepe laudantium odio cupiditate expedita numquam facere repellendus
          vitae eaque suscipit, ratione, quibusdam eos quis. Asperiores,
          exercitationem ullam ut vitae autem quisquam doloribus minima fugiat
          velit? Doloribus sapiente recusandae error quae natus iste
          exercitationem aspernatur deleniti numquam distinctio tenetur
          perspiciatis ratione, asperiores sunt ipsa deserunt, autem facere, sed
          incidunt corrupti ipsam architecto modi. Fugit perferendis omnis
          quisquam! Dolorem, exercitationem dignissimos. Natus corrupti atque,
          voluptatem similique consequatur rerum doloremque iusto inventore
          perspiciatis maxime cupiditate tempore quam a, illo odio architecto
          ducimus.
        </Col>
      </Row>
    </Container>
  );
};

export default Servicing;
