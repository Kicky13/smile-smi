import React from "react";
import { Col, Button, Form, FormGroup, Label, Input } from "reactstrap";
import Http from "../../Http";
import ReactTable from "react-table";
class InputCategory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      category: [],
      modal: false,
      page: null
    };
    this.expand_row = this.expand_row.bind(this);
    this.toggleModal = this.toggleModal.bind(this);
 	this.inputCategory = this.inputCategory.bind(this);
  }
 inputCategory(event){
    event.preventDefault();
    const category = {
      id: this.state.id,
      name: this.state.name
    }
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.post(process.env.REACT_APP_SMILE_API + 'api/category/input',category)
        .then(res => {

            let nopage = Math.floor(res.data.category.length/5);
            //console.log(nopage);
            this.setState({
              category: res.data.status,
              page:nopage,
            })
            return true;

        })
        .catch(err => {
            const statusCode = err.response.status;
            const data = {
              error: null,
              statusCode,
            };
            if (statusCode === 401 || statusCode === 422) {
              // status 401 means unauthorized
              // status 422 means unprocessable entity
              data.error = err.response.data.message;
            }
            return Promise.reject(data);
        })

  }

  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      id: null,
      name: null,
      idtes: null
    });
  }

  toggleCollapse = () => {
    if (this.state.collapseOpen) {
      this.setState({
        color: "navbar-transparent"
      });
    } else {
      this.setState({
        color: "bg-white"
      });
    }
    this.setState({
      collapseOpen: !this.state.collapseOpen
    });
  };
  // this function is to open the Search modal
  toggleModalSearch = () => {
    this.setState({
      modalSearch: !this.state.modalSearch
    });
  };

  expand_row(row) {
    var expanded = { ...this.state.expanded };
    //console.log(expanded[row.index]);
    if (expanded[row.index] === true) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }
    //console.log(row);
    //console.log(row.index);
    //console.log()
    this.setState({
      modal: true,
      id: row.original["id"],
      name: row.original["name"]
    });
  }

  componentDidMount() {
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //all category
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

    const columns = [
      {
        Header: "Id",
        accessor: "id"
      },
      {
        Header: "Name",
        accessor: "name"
      }
    ];

    return (
      <div className="container">
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <br />
        <Form>
          <FormGroup row>
            <Label for="id" sm={2}>
              Id
            </Label>
            <Col sm={10}>
              <Input type="input" name="id" id="id" placeholder="Id" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="name" sm={2}>
              Name
            </Label>
            <Col sm={10}>
              <Input
                type="input"
                name="name"
                id="name"
                placeholder="Name"
              />
            </Col>
          </FormGroup>

          <FormGroup check row>
            <Col sm={{ size: 10, offset: 2 }}>
              <Button onClick={this.inputCategory}>Add New</Button>
            </Col>
          </FormGroup>
        </Form>

        <br />

        <ReactTable
          getTrProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                this.expand_row(rowInfo);
              }
            };
          }}
          data={category}
          columns={columns}
          page={this.state.page}
          defaultPageSize={5}
          pageSizeOptions={[5]}
          onPageChange={page => this.setState({ page })}
        />
      </div>
    );
  }
}
export default InputCategory;
