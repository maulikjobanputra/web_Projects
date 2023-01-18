import React from 'react'

export default function NewsItem(props) {


  return (
    
      <div className="col-md-4 my-3">
        <div className="card" style={{height : "710px"}}>
        <div className="d-flex justify-content-end">
        <span className="badge rounded-pill bg-danger" style={{position: "absolute", top: "-15px", right: "-10px"}}>{props.article.source.name}</span>
          </div>
          <img src={!props.article.urlToImage ? "https://media.istockphoto.com/id/1128119311/photo/cubes-with-the-word-news-on-a-newspaper.jpg?s=1024x1024&w=is&k=20&c=0fGhaDjp49jiPTCFrukh3AQZcppnTpCa6uHEv6RjBMc=" : props.article.urlToImage} className="card-img-top" style={{maxHeight:'300px'}}alt="NEWS" />
            <div className="card-body position-relative">

                <h5 className="card-title">{props.article.title}</h5>
                <p className="card-text">{props.article.description}</p>
                <div className="position-absolute bottom-0 start-0" style={{margin:"16px"}}>
                
                    <p className="card-text"><small className="text-muted">{props.article.author && `By ${props.article.author}`} On {new Date(props.article.publishedAt).toUTCString()}</small></p>
                    <a href={props.article.url} className="btn btn-dark btn-sm">News </a>

                </div>
            </div>
        </div> 
        </div>
  )
}
