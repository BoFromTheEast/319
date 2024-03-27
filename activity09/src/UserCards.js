import "bootstrap/dist/css/bootstrap.css";
import { Container, Card, Col, Button } from "react-bootstrap";

export function UserCard({ picture, name, amount, married, points, address }) {
  console.log(picture);
  return (
    <div>
      <Container className="p-4">
        <Card style={{ width: "15rem" }}>
          <Card.Img
            className="card-img-top"
            src={picture}
            alt="Card image cap"
          />
          <Card.Body>
            <Card.Title className="card-title">{name}</Card.Title>
            <Card.Text className="card-text">Salary💲{amount}</Card.Text>
            <Card.Text className="card-text">
              {married ? "married" : "single"}
            </Card.Text>
            <Card.Text className="card-text">Address:</Card.Text>
            <ul>
              <li>Street:{address.street}</li>
              <li>City:{address.city}</li>
              <li>State:{address.state}</li>
            </ul>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}
