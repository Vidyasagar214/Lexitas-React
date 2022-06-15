

export const DateFormate = (data) =>{
    const now = new Date(data);
    const dateString = now.toLocaleDateString({
   weekday: "short",
   year: "numeric",
   month: "2-digit",
  day: "numeric"
   })
   return dateString
}
let data=[
    {
        "id": "1",
        "p_id": "1",
        "taskname": "Task3 Boston",
        "startdate": "2022-06-01",
        "enddate": "2022-06-15",
        "status": "Active",
        "taskowner": "JImmy Carter",
        "priority": "2",
        "description": "gnjbdc"
       },
       {
        "id": "2",
        "p_id": "1",
        "taskname": "TASK 6",
        "startdate": "2022-03-30",
        "enddate": "2022-05-02",
        "status": "Delayed",
        "taskowner": "Nelson Moody",
        "priority": "4",
        "description": "jfrtgbfgbfd"
       },
       {
        "id": "5",
        "p_id": "1",
        "taskname": "Task Testing",
        "startdate": "2022-06-01",
        "enddate": "2022-08-04",
        "status": "Completed",
        "taskowner": "Peter Pan",
        "priority": "2",
        "description": "belated"
       },
       {
        "id": "6",
        "p_id": "3",
        "taskname": "Task 1 Discovery",
        "startdate": "2022-04-03",
        "enddate": "2022-06-08",
        "status": "Completed",
        "taskowner": "John Doe",
        "priority": "2",
        "description": "Successfully finished"
       },
       {
        "id": "9",
        "p_id": "3",
        "taskname": "Task for Las Vegas",
        "startdate": "2022-05-09",
        "enddate": "2022-06-10",
        "status": "Delayed",
        "taskowner": "JImmy Carter",
        "priority": "2",
        "description": "qwerty"
       },
       {
        "id": "13",
        "p_id": "Project 2 Washington DC",
        "taskname": "Task 3qwertyui",
        "startdate": "2022-06-02",
        "enddate": "2022-07-01",
        "status": "Delayed",
        "taskowner": "JImmy Carter",
        "priority": "2",
        "description": "zerdfcgvhbj"
       },
       {
        "id": "17",
        "p_id": "8",
        "taskname": "Task 3 Development Phase-1",
        "startdate": "2022-06-02",
        "enddate": "2022-06-29",
        "status": "Completed",
        "taskowner": "JImmy Carter",
        "priority": "3",
        "description": "rthrymy"
       }
]