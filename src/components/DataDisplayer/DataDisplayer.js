import React, { useRef, useState, useEffect } from "react";
import { Card, Container, Row } from "react-bootstrap";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";
import { fetchImages } from "../utils/api-utils";

const DataDisplayer = ({
  data = [],
  lastElementRef = null,
  showImage = false,
  onCardClick = () => {},
}) => {
  const imagesQuery = useQuery("images", fetchImages);

  return (
    <Container bsPrefix="content-container">
      <Row style={{ gap: "1rem", justifyContent: "center" }} lg={4}>
        {/* <Col> */}
        {data.map((item, index) => {
          let imageUrl = "";
          if (imagesQuery.isSuccess) {
            const imagesData = imagesQuery.data;
            const randomImageIndex = Math.floor(
              Math.random() * imagesData.length
            );
            imageUrl = imagesData[randomImageIndex]?.["Image"];
          }
          return (
            <CardItem
              key={index}
              showImage={showImage}
              item={item}
              lastElementRef={lastElementRef}
              imageUrl={imageUrl}
              onCardClick={onCardClick}
            />
          );
        })}
        {/* </Col> */}
      </Row>
    </Container>
  );
};

const CardItem = ({
  showImage,
  item,
  lastElementRef,
  imageUrl,
  onCardClick,
}) => {
  const [inView, setInView] = useState(false);
  const placeholderRef = useRef();
  useEffect(() => {
    const observer = new IntersectionObserver((entries, obs) => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          setInView(true);
          obs.disconnect();
        }
      }
    }, {});
    if (placeholderRef.current) {
      observer.observe(placeholderRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [placeholderRef]);
  return (
    <Card
      style={{
        width: "18rem",
        cursor: showImage ? "pointer" : "default",
      }}
      ref={lastElementRef}
      onClick={() => onCardClick(item)}
    >
      {showImage && inView && <Card.Img variant="top" src={imageUrl} />}
      <Card.Body ref={placeholderRef}>
        <Card.Title>{item["Brand"]}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Variety - {item["Variety"]}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Style - {item["Style"]}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Country -{" "}
          <Link to={`../country/${item["Country"]}`}>{item["Country"]}</Link>
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Stars - {item["Stars"]}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Top Ten - {item["Top Ten"]}
        </Card.Subtitle>
        {/* <Button variant="primary">Go somewhere</Button> */}
      </Card.Body>
    </Card>
  );
};

export default DataDisplayer;
