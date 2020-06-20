import React from "react";
import styled from "styled-components";
import moment from "moment";

const NewsBox = styled.div`
  padding: 2em 4em;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  border: 1px solid #a9a9a9;
  background-color: #fff;
  margin: 2em 0;
`;

const DateAuthor = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

const UploadRow = styled.div`
  margin: 0.25em 0.25em;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 4em;
`;

const NewsListing = ({ dataItems, clickForDetail }) => {
  const clickHandler = (item) => {
    clickForDetail(item);
  };
  return dataItems.length > 0 ? (
    dataItems.map((item, index) => {
      return (
        <NewsBox key={index}>
          <h1 onClick={() => clickHandler(item)}>{item.title}</h1>

          <DateAuthor>
            <p>{moment(item.publishedAt).format("LL")}</p>
            <p>{item.author}</p>
          </DateAuthor>
          <img src={item.urlToImage} onClick={() => clickHandler(item)} />
          <p>
            {item.content && (
              <span>{item.content.replace(/\[\d+\]/g, "")}</span>
            )}
            {item.content && (
              <span
                style={{ color: "blue" }}
                onClick={() => clickHandler(item)}
              >
                Read More
              </span>
            )}
          </p>
        </NewsBox>
      );
    })
  ) : (
    <p>No items to display</p>
  );
};

export default NewsListing;
