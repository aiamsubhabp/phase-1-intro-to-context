// Your code here

/*let createEmployeeRecord = function(row){
    return {
        firstName: row[0],
        familyName: row[1],
        title: row[2],
        payPerHour: row[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}
*/

function createEmployeeRecord(array){
    let employeeRecord = {}
    employeeRecord.firstName = array[0],
    employeeRecord.familyName = array[1],
    employeeRecord.title = array[2],
    employeeRecord.payPerHour = array[3],
    employeeRecord.timeInEvents = [],
    employeeRecord.timeOutEvents = []
    return employeeRecord
}

let createEmployeeRecords = function(arrayOfArrays){
    return arrayOfArrays.map(array => (
        createEmployeeRecord(array)
    ))
}

let createTimeInEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ')

    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour, 10),
        date: date,
    })

    return employee
}

let createTimeOutEvent = function(employee, dateStamp){
    let [date, hour] = dateStamp.split(' ');

    employee.timeOutEvents.push({
        type: 'TimeOut',
        hour: (parseInt(hour, 10)),
        date: date,
    })
    return employee
}

let hoursWorkedOnDate = function(employee, targetDate){
    let inEvent = employee.timeInEvents.find(e => {
        return e.date = targetDate
    })

    let outEvent = employee.timeOutEvents.find(e => {
        return e.date = targetDate
    })

    return (outEvent.hour - inEvent.hour)/100
}

let wagesEarnedOnDate = function(employee, dateStamp){
    let wageEarned = hoursWorkedOnDate(employee, dateStamp) * employee.payPerHour;
    return wageEarned
}

/*let allWagesFor = function(employee){
    let datesWorked = employee.timeInEvents.map(function(e){
        return e.date
    })

    let allWages = datesWorked.reduce((accumulator, date) => {
        return accumulator + hoursWorkedOnDate(employee, date)
    })

    return allWages
}
*/

let allWagesFor = function(employee){
    let eligibleDates = employee.timeInEvents.map(function(e){
        return e.date
    })

    let payable = eligibleDates.reduce(function(memo, d){
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
}

  let calculatePayroll = function(arrayOfEmployeeRecords){
      return arrayOfEmployeeRecords.reduce(function(memo, rec){
          return memo + allWagesFor(rec)
      }, 0)
}