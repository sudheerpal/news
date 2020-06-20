import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import NewsListing from "./components/newsListing";
import NewsDetail from "./components/newsDetailPage";

function App() {
  const [data, setData] = useState([]);
  const [nextPage, setNextPage] = useState(1);
  const [detailObj, setDetailObj] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setDetailObj({});
    };
  }, []);

  const fetchData = async () => {
    let url = `http://newsapi.org/v2/top-headlines?country=gb&apiKey=fea8ac48760a48528a6e80c45f224631`;
    if (nextPage) {
      url = `http://newsapi.org/v2/top-headlines?country=gb&apiKey=fea8ac48760a48528a6e80c45f224631&page=${nextPage}`;
    }
    let res = await fetch(url);

    let resJson = await res.json();
    console.log("resJson", resJson);
    if (resJson.status === "ok") {
      if (resJson.nextPage) {
        setNextPage(resJson.nextPage);
      }
      setData(resJson.articles);
      setDataLoaded(true);
    }
  };

  return (
    <div className="App">
      <>
        <CssBaseline />
        <Container maxWidth="md">
          {!dataLoaded && <p>{`Loading...`}</p>}

          {dataLoaded && Object.keys(detailObj).length === 0 && (
            <NewsListing
              dataItems={data}
              clickForDetail={(data) => setDetailObj(data)}
            />
          )}

          {data.length > 0 && nextPage && Object.keys(detailObj).length === 0 && (
            <p onClick={() => fetchData()} style={{ textAlign: "center" }}>
              load more...
            </p>
          )}

          {Object.keys(detailObj).length !== 0 && (
            <NewsDetail item={detailObj} back={() => setDetailObj({})} />
          )}
        </Container>
      </>
    </div>
  );
}

export default App;
