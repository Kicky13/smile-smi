import React from "react";
import FullCalendar from "@fullcalendar/react";
import DayGridPlugins from "@fullcalendar/daygrid";
import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
import Http from "../../Http";

class Calendarjurnal extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          events: []
      }
  }
  state = {
    date: new Date(),
  };

  componentDidMount() {
    Http.get(process.env.REACT_APP_SMILE_API + "anniversary/getCalendar")
      .then(res => {
        this.setState({
          events: res.data
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

  onChange = date => this.setState({ date });

  render() {
    const tileContent = ({ date, view }) => view === 'month' && date.getDate() === 4 ? <p>!</p> : null;
    return (
      <div>
        <div className="calendar">
          <FullCalendar
            defaultView="dayGridMonth"
            plugins={[ DayGridPlugins ]}
            header={{
              left: 'prev',
              center: 'title',
              right: 'next'
            }}
            events={this.state.events}
          />
          {/*<Calendar*/}
          {/*  tileContent={tileContent}*/}
          {/*  className="calendar"*/}
          {/*  onChange={this.onChange}*/}
          {/*  value={this.state.date}*/}
          {/*/>*/}
        </div>
      </div>
    );
  }
}

export default Calendarjurnal;
