import React from "react";
import BigCalendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import event from "../../dummy/calendar";

class TableEvent extends React.Component {
  render() {
    const localizer = BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

    return (
      <div>
        <div className="content-event">
          <BigCalendar
            events={event}
            localizer={localizer}
            startAccessor="start"
            endAccessor="end"
            defaultView={"work_week"}
            views={["day", "work_week", "agenda", "month"]}
            step={60}
            showMultiDayTimes
          />
        </div>
      </div>
    );
  }
}

export default TableEvent;
