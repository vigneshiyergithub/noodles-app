import React, { useEffect, useState } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import DataDisplayer from "../DataDisplayer/DataDisplayer";
import Header from "../Header/Header";
import { fetchData } from "../utils/api-utils";

const BrandView = () => {
  const { brandId } = useParams();
  const [data, setData] = useState([]);
  const query = useQuery("data", fetchData);
  useEffect(() => {
    if (query.isSuccess && brandId) {
      const filteredList = query.data.filter((i) => i["Brand"] === brandId);
      setData(filteredList);
    } else {
      setData([]);
    }
  }, [query.isSuccess, query.data, brandId]);
  return (
    <Container fluid bsPrefix={"container-override"}>
      <Header page={"Brand"} />
      <DataDisplayer data={data} />
      <Container bsPrefix="content-container">
        <Row style={{ gap: "1rem", justifyContent: "center" }}>
          {data.map((item, index) => {
            return (
              <Card style={{ width: "18rem" }} key={index}>
                <Card.Body>
                  <Card.Title>{item["Brand"]}</Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Variety</strong> - {item["Variety"]}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Style</strong> - {item["Style"]}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Country</strong> -{item["Country"]}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Stars</strong> - {item["Stars"]}
                  </Card.Subtitle>
                  <Card.Subtitle className="mb-2 text-muted">
                    <strong>Top Ten</strong> - {item["Top Ten"]}
                  </Card.Subtitle>
                  {/* <Button variant="primary">Go somewhere</Button> */}
                </Card.Body>
              </Card>
            );
          })}
        </Row>
      </Container>
    </Container>
  );
};

export default BrandView;
