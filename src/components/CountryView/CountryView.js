import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import DataDisplayer from "../DataDisplayer/DataDisplayer";
import Header from "../Header/Header";
import { fetchData } from "../utils/api-utils";

const CountryView = () => {
  const { countryId } = useParams();
  const [data, setData] = useState([]);
  const query = useQuery("data", fetchData);

  let navigate = useNavigate();
  useEffect(() => {
    if (query.isSuccess && countryId) {
      const filteredList = query.data.filter((i) => i["Country"] === countryId);
      setData(filteredList);
    } else {
      setData([]);
    }
  }, [query.isSuccess, query.data, countryId]);
  const navigateToBrand = (item) => {
    navigate(`../brand/${item["Brand"]}`, { replace: true });
  };
  return (
    <Container fluid bsPrefix={"container-override"}>
      <Header page={'Country'} />
      <DataDisplayer
        data={data}
        showImage={true}
        onCardClick={navigateToBrand}
      />
    </Container>
  );
};

export default CountryView;
