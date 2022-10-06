const mockProjectsJson = JSON.parse(`[{
    "id": 1,
    "name": "test1",
    "creation_date": "dateString",
    "frequency": "15 minutes",
    "last_execution": {
        "status": "success",
        "date": "datestring"
    }
}, {
    "id": 2,
    "name": "test2",
    "creation_date": "dateString",
    "frequency": "15 minutes",
    "last_execution": {
        "status": "failure",
        "date": "datestring"
    }
},{
    "id": 3,
    "name": "test3",
    "creation_date": "dateString",
    "frequency": "15 minutes",
    "last_execution": {
        "status": "failure",
        "date": "datestring"
    }
},{
    "id": 4,
    "name": "test4",
    "creation_date": "dateString",
    "frequency": "4 minutes",
    "last_execution": {
        "status": "warning",
        "date": "datestring"
    }
}]`)

export default mockProjectsJson