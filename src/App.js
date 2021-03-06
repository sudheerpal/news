import React, { useState, useEffect } from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import NewsListing from "./components/newsListing";
import NewsDetail from "./components/newsDetailPage";
import Search from "./components/search";

function App() {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [detailObj, setDetailObj] = useState({});
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    fetchData();
    return () => {
      setData([]);
      setDetailObj({});
    };
  }, []);

  const fetchData = async (searchKeyword) => {
    let url = `http://newsapi.org/v2/top-headlines?country=gb&apiKey=fea8ac48760a48528a6e80c45f224631`;
    if (nextPage) {
      url = `http://newsapi.org/v2/top-headlines?country=gb&apiKey=fea8ac48760a48528a6e80c45f224631&page=${nextPage}`;
    }
    if (searchKeyword) {
      url = `http://newsapi.org/v2/top-headlines?country=gb&apiKey=fea8ac48760a48528a6e80c45f224631&q=${searchKeyword}`;
    }

    let res = await fetch(url);

    let resJson = await res.json();
    // console.log("resJson", resJson);
    if (resJson.status === "ok") {
      resJson.nextPage ? setNextPage(resJson.nextPage) : setNextPage(null);
      searchKeyword
        ? setSearchData(resJson.articles)
        : setData(data.concat(resJson.articles));
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
            <>
              <Search
                data={searchData}
                searchQuery={(val) => fetchData(val)}
                clickForDetail={(data) => setDetailObj(data)}
                clearResults={() => setSearchData([])}
              />
              <NewsListing
                dataItems={data}
                clickForDetail={(data) => setDetailObj(data)}
              />
            </>
          )}

          {data.length > 0 && nextPage && Object.keys(detailObj).length === 0 && (
            <p onClick={() => fetchData()} style={{ textAlign: "center" }}>
              load more...
            </p>
          )}

          {Object.keys(detailObj).length !== 0 && (
            <NewsDetail
              item={detailObj}
              back={() => setDetailObj({})}
              emptySearchResults={() => setSearchData([])}
            />
          )}
        </Container>
      </>
    </div>
  );
}

export default App;
