import React, {  useEffect, useState } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import InfiniteScroll from 'react-infinite-scroll-component';

export default function News(props) {
const [isLoading, setIsLoading] = useState(true);
const [totalResults, setTotalResults] = useState(0)
const [articles, setArticles] = useState([])
const [page, setPage] = useState(2);

useEffect(() => {

    const getData = async () => {
      props.setProgress(25);
      const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&country=in&page=1&pageSize=20&apiKey=${process.env.REACT_APP_API_KEY}`);
      props.setProgress(50);
      const newData = await response.json();
      props.setProgress(75);
      setArticles(newData.articles);
      setTotalResults(newData.totalResults);
      setIsLoading(false);
      props.setProgress(100);
    };

    getData();
}, []);// eslint-disable-line react-hooks/exhaustive-deps

const fetchMoreData = async ()=>{
    setIsLoading(true);
    const response = await fetch(`https://newsapi.org/v2/top-headlines?category=${props.category}&country=in&page=${page}&pageSize=20&apiKey=${process.env.REACT_APP_API_KEY}`);
    const newData = await response.json();
    setIsLoading(false);
     return newData.articles;
  };

  const fetchData = async () => {
    const moreData = await fetchMoreData();
    setArticles([...articles, ...moreData]);
    setPage(page + 1);
  }
  document.title = `NewsChimp  |  ${props.category.charAt(0).toUpperCase() + props.category.slice(1)}`
  return (
    <>
      <h1 className="text-center" style={{marginTop:"90px"}}>NewsChimp - Top {props.category.charAt(0).toUpperCase() + props.category.slice(1)} Headlines</h1>
      {isLoading && <Spinner />}
      <InfiniteScroll
            dataLength={articles.length}
            next={fetchData}
            hasMore={articles.length < totalResults}
            loader={<Spinner/>}
       > 
        <div className="container my-3">
          <div className="row">
          {articles.map(element=>{
            return <NewsItem key = {element.title} article={element}/>
          })}
          </div>
          </div>
          </InfiniteScroll>
      </>
  );
}