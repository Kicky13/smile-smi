import React from "react";
import Tab3 from "../../components/Tab3/Tab3";
import adv from "../../asset/img/adv.png";
import * as actions from "../../store/actions";
import Navbar from "../../components/Navbars/Navbar";
import Footer from "../../components/Footer/FooterDash";
import Category from "../../components/CategoryArticle/category";
import Videoarticle from "../../components/VideoArticle/Videoarticle";
import Recentarticle from "../../components/RecentCArticle/Recentcarticle";
import BannerNewsfeed from "../../components/BannerNewsfeed/Bannernewsfeed";
import Commentreplaynewsfeed from "../../components/CommentReplayNewsfeed/Commentreplaynewsfeed";
import Trendingarticle from "../../components/TrendingArticle/Trendingarticle";
import Likearticle from "../../components/LikeArticle/Likearticle";
import Http from "../../Http";
// import Parser from 'html-react-parser';
import { CircleArrow as ScrollUpButton } from "react-scroll-up-button"; //Add this line Here

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
    this.handleLogout = this.handleLogout.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.params.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //latest article
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/newsfeed/detail/" + id
    )
      .then(res => {
        this.setState({
          newsfeed: res.data.detail,
          comments: res.data.comments
        });
      })
      .catch(err => {
        const statusCode = err.response.status;
        const data = {
          error: null,
          statusCode
        };
        if (statusCode === 401 || statusCode === 422) {
          // status 401 means unauthorized
          // status 422 means unprocessable entity
          data.error = err.response.data.message;
        }
        return Promise.reject(data);
      });
  }

  handleLogout(event) {
    event.preventDefault();
    this.props.dispatch(actions.authLogout());
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
        {
          <Navbar
            {...this.props}
            // brandText="Dashboard"
            // toggleSidebar={this.toggleSidebar}
            // sidebarOpened={this.state.sidebarOpened}
          />
        }
        <div className="container-fluid">
          <div className="row">
          <div className="col-md-1 col-sm-1" />
            <div className="col-md-7 col-sm-7" style={{marginTop:100}}>
              <BannerNewsfeed {...this.props} />
              <Commentreplaynewsfeed {...this.props} />
              <Trendingarticle />
            </div>

            <div className="col-md-4 col-sm-4" style={{marginTop:150}}>
              <Tab3 />
              <Category />
              <Videoarticle />
              <div className="advertisment">
                <img src={adv} alt="" />
              </div>
              <Recentarticle />
            </div>

            <div className="container-fluid">
              <div className="row">
                <div className="col-md-12">
                  <Likearticle />
                  {/*  */}
                </div>
              </div>
            </div>
          </div>

          {/*  */}
        </div>

        <Footer />
        <ScrollUpButton
          ContainerClassName="ScrollUpButton__Container"
          TransitionClassName="ScrollUpButton__Toggled"
          StopPosition={0}
          distance={100}
          breakpoint={768}
          EasingType="easeOutCubic"
          AnimationDuration={2000}
          style={{}}
          ToggledStyle={{}}
        />
      </div>
    );
  }
}

export default Page;
