import React from "react";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import Http from "../../Http";
import ReactTable from "react-table";
import CKEditor from "react-ckeditor-component";


class InputArticle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      artikel: [],
      cat: [],
      trending: [],
      modal: true,
      page: null,
      loading: true,
      content: '',
      title: '',
      subtitle: '',
      selectheadline: '',
      selectcategory: '',
      tags: '',
      file: '',
      image: null,
      id: null,
      imagePreviewUrl: null
    };
    this.expand_row = this.expand_row.bind(this);
    this.toggleModal = this.toggleModal.bind(this);

    this.handleFieldChange = this.handleFieldChange.bind(this);
    this.tambahArtikel = this.tambahArtikel.bind(this);
    this.hapusArtikel = this.hapusArtikel.bind(this);
    this.onChange = this.onChange.bind(this);
    this.resetMode = this.resetMode.bind(this);
    this.updateArtikel = this.updateArtikel.bind(this);
  }


  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  updateArtikel(event){
    event.preventDefault();
    let id = this.state.id;
    //console.log(this.state.file);

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("subtitle", this.state.subtitle);
    formData.append("selectcategory", this.state.selectcategory);
    formData.append("selectheadline", this.state.selectheadline);
    formData.append("tags", this.state.tags);
    formData.append("content", this.state.content);
    formData.append("img", this.state.image);
    console.log(formData);
    Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    Http.post(process.env.REACT_APP_SMILE_API + 'api/article/update/'+id, formData)
      .then(res => {
        this.setState({
          title: "",
          subtitle: "",
          selectcategory: "",
          selectheadline: "",
          tags: "",
          content: "",
          img: "",
          id:null,
          artikel: res.data.last30,
        });
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


  handleFieldChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleImageChange(e) {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        image: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }



  tambahArtikel(event) {
    event.preventDefault();
    //console.log(this.state.file);

    const formData = new FormData();
    formData.append("title", this.state.title);
    formData.append("subtitle", this.state.subtitle);
    formData.append("selectcategory", this.state.selectcategory);
    formData.append("selectheadline", this.state.selectheadline);
    formData.append("tags", this.state.tags);
    formData.append("content", this.state.content);
    formData.append("img", this.state.image);
    console.log(formData);
    Http.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('jwt_token')}`;
    Http.post(process.env.REACT_APP_SMILE_API + 'api/article/add', formData)
      .then(res => {
        this.setState({
          title: "",
          subtitle: "",
          selectcategory: "",
          selectheadline: "",
          tags: "",
          content: "",
          img: "",
          artikel: res.data.last30,
        });
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

  onChange(evt) {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }


  toggleModal() {
    this.setState({
      modal: !this.state.modal,
      id: null,
      name: null,
      idtes: null,
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


  resetMode(e){
    this.setState({
      id:null,
      content:"",
      title:"",
      subtitle:"",
      tags:"",
    });
  }

  expand_row(row) {
    var expanded = { ...this.state.expanded };
    //console.log(expanded[row.index]);
    if (expanded[row.index] === true) {
      expanded[row.index] = !expanded[row.index];
    } else {
      expanded[row.index] = true;
    }
    console.log(row.original);
    //alert(row.index);
    //console.log()
    this.setState({
      //modal: true,
      id: row.original['id'],
      
      title: row.original['title'],
      subtitle: row.original['subtitle'],
      tags: row.original['tags'],
      content: row.original['content'],
      imagePreviewUrl : process.env.REACT_APP_SMILE_API + ""+row.original['img'],
      //status: row.original['status'],
      //created_date: row.original['created_date'],
      //created_by: row.original['created_by'],

    });
  }

  hapusArtikel(){
    let id = this.state.id;
    Http.defaults.headers.common[
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;

    //all category
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/hapus/"+id
    )
      .then(res => {
        this.setState({
          id:null,
          title: "",
          subtitle: "",
          selectcategory: "",
          selectheadline: "",
          tags: "",
          content: "",
          img: ""
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
          cat: res.data.category
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

    //all article tidak memungkinan jadi diganti dengan terakhir 30 artikel
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/last30"
    )
      .then(res => {
        this.setState({
          artikel: res.data.last30
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

    //all trending
    Http.get(
      process.env.REACT_APP_SMILE_API + "api/article/trending"
    )
      .then(res => {
        this.setState({
          trending: res.data.hot
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
    const cat = this.state.cat;
    //console.log("category");
    //console.log(cat);
    //console.log("trending");
    //console.log(trending);
    const artikel = this.state.artikel;
    //console.log("artikel");
    //console.log(artikel);

    const CustomNoDataComponent = ({ state, ...rest }) => {

      return <div className="rt-noData">Mohon sabar menunggu....</div>
    }

    const columns = [{
      Header: 'Id',
      accessor: 'id'
    }, {
      Header: 'Title',
      accessor: 'title'
    }, {
      Header: 'Status',
      accessor: 'status'
    }, {
      Header: 'Created By',
      accessor: 'created_by'
    }, {
      Header: 'Date',
      accessor: 'created_date'
    }];


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
            <Label for="title" sm={2}>TItle</Label>
            <Col sm={10}>
              <Input value={this.state.title} onChange={this.handleFieldChange} type="input" name="title" id="title" placeholder="Title" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="subtitle" sm={2}>Subtitle</Label>
            <Col sm={10}>
              <Input value={this.state.subtitle} onChange={this.handleFieldChange} type="input" name="subtitle" id="title" placeholder="Subtitle" />
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="headline" sm={2}>Headline</Label>
            <Col sm={10}>
              <select value={this.state.selectheadline} onChange={this.handleFieldChange} type="select" name="selectheadline" id="selectheadline">
                <option value="0">No</option>
                <option value="1">Yes</option>
              </select>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="category" sm={2}>Category</Label>
            <Col sm={10}>
              <select value={this.state.selectcategory} onChange={this.handleFieldChange} type="select" name="selectcategory" id="selectcategory">
                <option>-Selected Category-</option>
                {cat.map((anObjectMapped, index) => {
                  return (
                    <option selected={this.state.selectcategory === anObjectMapped.id} value={anObjectMapped.id}>{anObjectMapped.name}</option>
                  );
                })}
                <p>Selected Category : {this.state.category}</p>
              </select>
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="title" sm={2}>Tags</Label>
            <Col sm={10}>
              <Input value={this.state.tags} onChange={this.handleFieldChange} type="input" name="tags" id="tags" placeholder="Tags" />
            </Col>
          </FormGroup>

          <FormGroup row>
            <Label for="exampleFile" sm={2}>Cover</Label>
            <Col sm={10}>
              <Input onChange={(e) => this.handleImageChange(e)} type="file" name="input-file" id="exampleFile" />
              <img alt="" src={this.state.imagePreviewUrl}/>
              <FormText color="muted">
                <h5>Ketuk untuk memilih file</h5>
              </FormText>
            </Col>
          </FormGroup>
          <FormGroup row>
            <Label for="exampleFile" sm={2}>Content</Label>
            <Col sm={10}>
              <CKEditor
                value={this.state.content}
                activeClass="p10"
                content={this.state.content}
                events={{
                  "blur": this.onBlur,
                  "afterPaste": this.afterPaste,
                  "change": this.onChange
                }}
              />

            </Col>
          </FormGroup>
          <FormGroup check row>
            <Col className="center-block" sm={{ size: 12, offset: 2 }}>
              <Col className="center-block" sm={{ size: 4, offset: 2 }}>
                {this.state.id === null ? (
                  <></>
                ) : (
                  <Button className="pull-left" onClick={this.hapusArtikel}>Hapus</Button>
                )}
                

              </Col>
              <Col className="center-block" sm={{ size: 3, offset: 2 }}>
                {this.state.id === null ? (
                  <></>
                ) : (
                  <Button className="center-block text-center" onClick={this.resetMode}>Kembali Ke Mode Tambah</Button>
                )}
                
              </Col>
              <Col className="center-block" sm={{ size: 4, offset: 2 }}>
                {this.state.id === null ? (
                  <Button className="pull-right" onClick={this.tambahArtikel}>Add New</Button>
                ) : (
                  <Button className="pull-right" onClick={this.updateArtikel}>Update</Button>
                )}
                
              </Col>

            </Col>
          </FormGroup>
        </Form>

        <br />
        <br />
        <center><h2>Daftar Artikel</h2></center>
        <br />
        <br />

        <ReactTable
          getTrProps={(state, rowInfo, column, instance) => {
            return {
              onClick: e => {
                this.expand_row(rowInfo);
              }
            };
          }}
          data={artikel}
          NoDataComponent={CustomNoDataComponent}
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
export default InputArticle;
