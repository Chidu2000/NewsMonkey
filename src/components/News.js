import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
import PropTypes from 'prop-types'


export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: 'general'
  }

  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string
  }
//   articles = [
//         {
//           source: {
//             id: "wirtschafts-woche",
//             name: "Wirtschafts Woche",
//           },
//           author: "Georg Buschmann, Andreas Menn",
//           title: "Frank Thelens Tech-Aktien: Solarzellen, Recycling, 3-D-Druck",
//           description:
//             "Investor Frank Thelen startet einen Fonds aus kleinen Tech-Unternehmen aus der zweiten Reihe. Was er damit vorhat und warum er seinen Glauben an Tesla noch nicht verloren hat.",
//           url: "https://www.wiwo.de/technologie/digitale-welt/tech-aktien-solarzellen-recycling-3-d-druck-worauf-frank-thelen-jetzt-wettet/28976758.html",
//           urlToImage:
//             "https://www.wiwo.de/images/wiwo_frank_thelen_645/28976006/4-format11240.jpg",
//           publishedAt: "2023-02-11T08:36:25+00:00",
//           content:
//             "Tesla, Palantir, Baidu wer in Tech-Aktien investiert, kommt an den  großen Namen schwer vorbei. Auch Frank Thelen, Start-up-Investor und TV-Star (Die Höhle der Löwen), hat privat und mit seinem 10XDN… [+5180 chars]",
//         },
//         {
//           source: {
//             id: "reuters",
//             name: "Reuters",
//           },
//           author: null,
//           title:
//             "Exclusive: To tap U.S. government billions, Tesla must unlock EV chargers",
//           description:
//             "Tesla CEO Elon Musk has often talked about opening his Supercharging network to competitors, but has never actually done so in the United States, where the company dominates the electric vehicle market.",
//           url: "https://www.reuters.com/technology/tap-us-government-billions-tesla-must-unlock-ev-chargers-2023-02-10/",
//           urlToImage:
//             "https://www.reuters.com/resizer/YVyZPdW7Zkx7E-jWmaVFN1S-hxs=/1200x628/smart/filters:quality(80)/cloudfront-us-east-2.images.arcpublishing.com/reuters/BYSM2A4PKNJMHOLMGM5KTDEHFI.jpg",
//           publishedAt: "2023-02-10T23:33:57Z",
//           content:
//             "Feb 10 (Reuters) - Tesla CEO Elon Musk has often talked about opening his Supercharging network to competitors, but has never actually done so in the United States, where the company dominates the el… [+5194 chars]",
//         },
//         {
//           source: {
//             id: "axios",
//             name: "Axios",
//           },
//           author: "Hope King",
//           title: "Vocal Tesla shareholder Ross Gerber plans board run",
//           description:
//             "The outspoken longtime Tesla shareholder, and prolific Twitter user, tells Axios that he will file a letter to Tesla's board next week stating his intentions to run for a seat.",
//           url: "https://www.axios.com/2023/02/10/tesla-shareholder-ross-gerber-board-musk-twitter",
//           urlToImage:
//             "https://images.axios.com/EcBJYYIo5zVdFMZenzzPrpyvDJE=/0x0:1920x1080/1366x768/2023/02/10/1676060254350.png",
//           publishedAt: "2023-02-10T22:30:43Z",
//           content:
//             "Ross Gerber an investment adviser, outspoken longtime Tesla shareholder and prolific Twitter user tells Axios that he will file a letter to Tesla's board next week stating his intentions to run for a… [+2080 chars]",
//         },
//         {
//           source: {
//             id: "next-big-future",
//             name: "Next Big Future",
//           },
//           author: "Brian Wang",
//           title:
//             "1000 Megawatt Hour $438 Million Tesla Megapack Project in Ontario | NextBigFuture.com",
//           description:
//             "The Oneida Energy Storage Project (1000 MWh) is the largest of its kind in Canada and amongst the largest in the world. It will provide a gigawatt-hour of",
//           url: "https://www.nextbigfuture.com/2023/02/1000-megawatt-hour-438-million-tesla-megapack-project-in-ontario.html",
//           urlToImage:
//             "https://nextbigfuture.s3.amazonaws.com/uploads/2023/02/Screen-Shot-2023-02-10-at-12.55.35-PM.jpg",
//           publishedAt: "2023-02-10T21:01:12Z",
//           content:
//             "Brian Wang is a Futurist Thought Leader and a popular Science blogger with 1 million readers per month. His blog Nextbigfuture.com is ranked #1 Science News Blog. It covers many disruptive technology… [+593 chars]",
//         },
//         {
//           source: {
//             id: "next-big-future",
//             name: "Next Big Future",
//           },
//           author: "Brian Wang",
//           title: "Tesla Paid Me $426 to Help PGE | NextBigFuture.com",
//           description:
//             "The Tesla-PGE Virtual Power plant program pays $2 per kWh. I was paid $426 for my participation in 2022 in the program. My Powerwalls provide PGE with 213 kWh",
//           url: "https://www.nextbigfuture.com/2023/02/tesla-paid-me-426-to-help-pge.html",
//           urlToImage:
//             "https://nextbigfuture.s3.amazonaws.com/uploads/2022/09/powerwalls.jpeg",
//           publishedAt: "2023-02-10T01:26:59Z",
//           content:
//             "The Tesla-PGE Virtual Power plant program pays $2 per kWh. I was paid $426 for my participation in 2022 in the program. My Powerwalls provide PGE with 213 kWh of emergency power. This over 20 hours o… [+2967 chars]",
//         },
//   ]

  capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  constructor(props) {
    super(props);
    this.state = {
      articles : [],
      loading: false,
      page: 1
    }
    document.title = `${this.capitalizeFirstLetter(this.props.category)} - NewsMonkey`;
  }

  async update(){
    this.props.setProgress(10);
    const url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&pageSize=${this.props.pageSize}`
    this.setState({loading: true})
    let data = await fetch(url)
    let parsedData = await data.json()
    this.setState({articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false
    })
    this.props.setProgress(100);
  }
//   it will run after render
  async componentDidMount(){
    // dynamically fetch data from fetch API, by hitting an endpoint using API key, and taking json form of the data
    this.update()
  }

  //buttons logic for navigation
  handlePrevClick = async () =>{
    this.setState({page: this.state.page - 1})
    this.update()
  }

  handleNextClick = async () =>{
    this.setState({page: this.state.page + 1})
    this.update()
  }

  render() {
    return (
      <div className="container my-3">
        <h2 className="text-center">NewsMonkey - Top Headlines on {this.capitalizeFirstLetter(this.props.category)}</h2>
        {this.state.loading && <Spinner/>}
        <div className="row">

            {/* looping thro' the elements to populate the news */}
        {!this.state.loading && this.state.articles.map((element)=>{
            return <div className="col-md-4" key = {element.url}>
            <NewsItem
              title={element.title?element.title.slice(0,45):""}
              description={element.description?element.description.slice(0,88):""}
              imageUrl={element.urlToImage}
              newsUrl={element.url}
              author={element.author}
              date={element.publishedAt}
              source = {element.source.name}
            />
          </div>
        })}  
        </div>

        <div className="container d-flex justify-content-between">
        <button disabled={this.state.page<=1} type="button" className="btn btn-dark" onClick = {this.handlePrevClick}> &larr; Previous</button>
        <button disabled={this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize)} type="button" className="btn btn-dark" onClick = {this.handleNextClick}>Next &rarr;</button>
        </div>
      </div>
    );
  }
}

export default News;
