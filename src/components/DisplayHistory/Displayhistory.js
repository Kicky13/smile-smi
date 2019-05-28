import React from "react";
import { NavLink, Card, Button, CardTitle, CardText } from "reactstrap";
import Http from "../../Http";
import { Doughnut } from 'react-chartjs-2';
class Displayhistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      kuota: []
    };
  }

  componentDidMount() {
    Http.defaults.headers.common [
      "Authorization"
    ] = `Bearer ${localStorage.getItem("jwt_token")}`;
    Http.get(process.env.REACT_APP_SMILE_API + "api/APIHRIS/kuotacuti")
    .then(res => {
      this.setState({
        kuota: res.data.kuota
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
    const kuota = this.state.kuota;
    const data = {

    labels: [
  		'Cuti',
  		'Kuota'
  	],
    datasets: [{
      data: [kuota.diambil, kuota.quota],
      backgroundColor: [
      '#FF6384',
      '#36A2EB'
      ],
      hoverBackgroundColor: [
      '#FF6384',
      '#36A2EB'
      ]
    }]
    };

    return (
      <div>
        <div className="user-sppd">
          <div className="row">
            <div className="col-md-12">
            <Card body outline color="secondary" className="cardHistory">
              <CardTitle><p className="circle"><div className="cardTitle" >SISA CUTI</div></p></CardTitle>
              <CardText>
              <p className="tanggal-card">Periode 2019</p>
              <div className="Donutchart">
              <Doughnut data={data} />
              </div>
              <br />
              <p className="bottom-card">{kuota.sisa + " kali"}</p>
              </CardText>
            </Card>
            </div>
          </div>

          <div className="row">
            <div className="col-md-12">
            <Card body outline color="secondary" className="cardHistory">
              <CardTitle><p className="circle-sppd"><div className="cardTitle" >SPPD</div></p></CardTitle>
              <CardText>
              <p className="tanggal-card">Periode 2019</p>
              <br />
              <p className="bottom-card">10 Perjalanan</p>
              </CardText>
            </Card>
            </div>
          </div>

        </div>
      </div>
    );
  }
}

export default Displayhistory;
