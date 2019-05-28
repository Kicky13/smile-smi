export default [
    {
        id: 0,
        title: 'All Day Event very long title',
        allDay: true,
        start: new Date(2018, 2, 0),
        end: new Date(2018, 2, 1),
    },
    {
        id: 1,
        title: 'Long Event',
        start: new Date(2019, 2, 7),
        end: new Date(2019, 2, 10),
    },

    {
        id: 2,
        title: 'DTS STARTS',
        start: new Date(2019, 2, 13, 0, 0, 0),
        end: new Date(2019, 2, 20, 0, 0, 0),
    },

    {
        id: 3,
        title: 'DTS ENDS',
        start: new Date(2019, 2, 6, 0, 0, 0),
        end: new Date(2019, 2, 13, 0, 0, 0),
    },

    {
        id: 4,
        title: 'Some Event',
        start: new Date(2019, 2, 9, 0, 0, 0),
        end: new Date(2019, 2, 10, 0, 0, 0),
    },
    {
        id: 5,
        title: 'Conference',
        start: new Date(2019, 3, 11),
        end: new Date(2019, 3, 13),
        desc: 'Big conference for important people',
    },
    {
        id: 6,
        title: 'Meeting',
        start: new Date(2019, 2, 12, 10, 30, 0, 0),
        end: new Date(2019, 2, 12, 12, 30, 0, 0),
        desc: 'Pre-meeting meeting, to prepare for the meeting',
    },
    {
        id: 7,
        title: 'Today',
        start: new Date(new Date().setHours(new Date().getHours() - 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 3)),
    },
    {
        id: 8,
        title: 'Conference',
        start: new Date(2019, 4, 11),
        end: new Date(2019, 4, 13),
        desc: 'Libur',
    },
    {
        id: 7,
        title: 'Cek Data',
        start: new Date(new Date().setHours(new Date().getHours() + 3)),
        end: new Date(new Date().setHours(new Date().getHours() + 4)),
    },
]