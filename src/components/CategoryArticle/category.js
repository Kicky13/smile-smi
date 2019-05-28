import React from "react";
import { NavLink } from "reactstrap";
// import * as actions from "../../store/actions";
// import logoSmile from "../../logoSmileWhite.png";
import Http from "../../Http";
class categoryArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: []
    };
  }
  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    //hotarticle
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/category/ambilsemua"
    )
      .then(res => {
        this.setState({
          category: res.data.category
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

  render() {
    const category = this.state.category;
    console.log("category");
    console.log(category);
    return (
      <div>
        <div className="category">
          <p>Category</p>
          <div className="list-category">
            {category.map((anObjectMapped, index) => {
              return <NavLink href={"/whatson/3/" + anObjectMapped.id}>{anObjectMapped.name}</NavLink>;
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default categoryArticle;
