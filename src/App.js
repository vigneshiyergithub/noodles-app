import { useCallback, useEffect, useRef, useState } from "react";
import { Container } from "react-bootstrap";
import { useQuery } from "react-query";
import "./App.css";
import DataDisplayer from "./components/DataDisplayer/DataDisplayer";
import Header from "./components/Header/Header";
import { fetchData } from "./components/utils/api-utils";

function App() {
  const [data, setData] = useState([]);
  const query = useQuery("data", fetchData);
  const observer = useRef();
  const lastElementRef = useCallback((node) => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setData((prev) => [...prev, ...prev]);
      }
    });
    if (node) observer.current.observe(node);
  }, []);

  useEffect(() => {
    if (query.isSuccess) {
      const filteredArr = query.data.filter(
        (value, index, self) =>
          index === self.findIndex((t) => t["Country"] === value["Country"])
      );
      setData(filteredArr);
    }
  }, [query.isSuccess, query.data]);

  return (
    <Container fluid bsPrefix={"container-override"}>
      <Header />
      <DataDisplayer
        data={data}
        lastElementRef={lastElementRef}
        showImage={true}
      />
    </Container>
  );
}

export default App;
