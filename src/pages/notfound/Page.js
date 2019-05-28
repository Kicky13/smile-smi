import React from "react";
// import Parser from 'html-react-parser';

//import "../../asset/css/css-lates/dashboard.css";
//import logo from "../../logo.svg";

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      newsfeed: [],
      comments: []
    };
  }

  

  render() {
    //onsole.log(this.props);

    // const settings = {
    //   dots: true,
    //   infinite: true,
    //   speed: 500,
    //   slidesToShow: 2,
    //   slidesToScroll: 3
    // };
    if (this.props.match.params.id == null) {
      alert("tak ada");
    }

    // const article = this.state.article;

    return (
      <div>
        <p>404 Not Found</p>
      </div>
    );
  }
}

export default Page;
