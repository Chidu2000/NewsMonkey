import React, { Component } from 'react'

export class NewsItem extends Component {
    render() {
    let {title, description, imageUrl,newsUrl,author,date,source} = this.props;  
    return (
      <div className='my-3'>
        {/* style should be a JS object */}
        <div className="card">   
            <img src={!imageUrl?"https://www.wiwo.de/images/wiwo_frank_thelen_645/28976006/4-format11240.jpg":imageUrl} className="card-img-top" alt="..."/>
            <div className="card-body">
                <h5 className="card-title">{title}   <span className="badge rounded-pill bg-danger"> {source} </span></h5>
                <p className="card-text">{description} </p>
                <p className='card-text'><small className='text-muted'>By {author} on {new Date(date).toUTCString()} </small></p>
                <a href={newsUrl} target='__blank' className="btn btn-sm btn-dark">Read More</a>
            </div>
        </div>
      </div>
    )
  }
}

export default NewsItem
