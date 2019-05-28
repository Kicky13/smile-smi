import React from "react";
// import Calendar from "react-calendar";
import FullCalendar from "@fullcalendar/react";
import DayGridPlugins from "@fullcalendar/daygrid";
import Moment from 'react-moment';
import "@fullcalendar/core/main.css"
import "@fullcalendar/daygrid/main.css"

class Calendarjurnal extends React.Component {
  constructor(props){
      super(props);
      this.state = {
          events: [
              {
                  title: 'Test Event1',
                  start: '2019-04-26'
              },
              {
                  title: 'Lebaran',
                  start: '2019-06-05'
              },
              {
                  title: 'Test Event2',
                  start: '2019-04-01',
              }
          ]
      }
  }
  state = {
    date: new Date(),
  };

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
