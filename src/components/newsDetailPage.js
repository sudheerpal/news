import React from "react";
import { Icon, IconButton } from "@material-ui/core";
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

const NewsDetail = ({ item, back }) => {
  return (
    <>
      <IconButton
        edge="end"
        aria-label="Back"
        onClick={() => back()}
        color="primary"
      >
        <Icon>arrow_back_ios</Icon> Back
      </IconButton>
      <NewsBox>
        <h1>{item.title}</h1>

        <DateAuthor>
          <p>{moment(item.publishedAt).format("LL")}</p>
          <p>{item.author}</p>
        </DateAuthor>
        <img src={item.urlToImage} />
        <p>{item.content}</p>
      </NewsBox>
    </>
  );
};

export default NewsDetail;
