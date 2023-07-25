import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import fittingimg from "../../../Assets/fittingimg.png";
import "./fitting.css";

const Fitting: React.FC = () => {
  return (
    <Container>
      <h3 className="fitting-heading mt-5">Tyre Fitting</h3>
      <Row>
        <Col md={6}>
          <Image src={fittingimg} fluid />
        </Col>
        <Col md={6} className="fitting-col-bg">
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aspernatur
            officiis numquam a ratione ex sed quasi ducimus, similique aliquam
            in cum, sit ea, veniam neque! Excepturi repudiandae cum distinctio
            totam repellat, ea, molestiae laborum doloremque inventore, quidem
            consequuntur minima maiores et veniam? Minus inventore deserunt
            voluptatem cumque facilis? Ipsum ea, eum eos officiis, iste nemo
            obcaecati enim accusantium nostrum dolores eveniet. Ducimus expedita
            voluptatum architecto sed eaque voluptate eveniet modi ab, tenetur
            qui, doloremque recusandae nemo ad sit praesentium totam rem eos id
            saepe amet tempore nostrum. Facilis aut quae vel. Recusandae quod
            natus dignissimos asperiores eos earum, culpa, suscipit laudantium
            obcaecati exercitationem modi dolorum corrupti repudiandae vel
            nesciunt veniam. Pariatur quisquam laudantium voluptatem ex? Odit
            incidunt quod doloribus dolores dolor ab pariatur quia aliquam.
            Maiores ullam, quo soluta facilis neque cum. Impedit provident ipsa
            debitis laborum quam, assumenda dicta explicabo non, enim laboriosam
            nobis quia odit, eligendi cumque laudantium repellat magnam saepe
            voluptatum! Sequi asperiores ut quae veniam saepe numquam accusamus
            aliquam reprehenderit distinctio vitae impedit perferendis sapiente
            ipsam possimus{" "}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Fitting;
