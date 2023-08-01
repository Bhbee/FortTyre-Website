import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import maintenance_os from "../../../Assets/maintenance_os.png";
import { Helmet } from "react-helmet-async";
import "./maintenance.css";

const Maintenance: React.FC = () => {
  return (
    <Container>
      <Helmet>
        <title>Tyre Maintenance</title>
      </Helmet>
      <h3 className="maintenance-heading mt-5">Maintenance</h3>
      <Row>
        <Col md={6}>
          <Image src={maintenance_os} fluid />
        </Col>
        <Col md={6}>
          <p className="maintenance-txt">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Asperiores
            enim similique velit non dolorum quod. Omnis quas voluptatum
            voluptatem culpa error, molestiae laborum consequatur fugiat unde
            explicabo quae, ratione voluptatibus doloribus provident atque at
            quidem obcaecati, quia quo tenetur nobis corporis. Cumque, unde.
            Accusamus beatae odit aliquam magnam nobis assumenda maxime! Nostrum
            odit, vitae excepturi sapiente incidunt omnis eaque culpa dolore
            ipsum, illum quasi a suscipit impedit nihil expedita distinctio,
            provident libero soluta sit eius odio possimus. Pariatur aut illo
            beatae nostrum, suscipit ex nam molestias odit soluta officiis,
            asperiores autem minima corporis omnis excepturi explicabo. Quod
            voluptatum ratione at. Lorem ipsum dolor, sit amet consectetur
            adipisicing elit. Iusto id porro excepturi voluptate labore iure
            sed, deleniti assumenda ipsam sit?Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Et, sequi!
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Maintenance;
