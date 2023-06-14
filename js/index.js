document.getElementById("submitButton").addEventListener("click", handleClick);

var net = 0;
var netIncome = 0;
var netExpense = 0;
var overviewBudgetValue = document.getElementById("overviewBudgetValue");
var netExpenseElement = document.getElementById("netExpenseValue");
var netIncomeElement = document.getElementById("netIncomeValue");
let db = new Localbase('db');
var time = document.getElementById("dateTimeInput").value;

function handleClick()
{
    var description = document.getElementById("description").value;
    var value = Number( document.getElementById("transactionValue").value);
    var type = document.getElementById("dropDown").value;
    time = document.getElementById("dateTimeInput").value;

    let db = new Localbase('db');
    //incomes
    if (type == "salary" || type == "sales" || type == "tip" || type == "pocketMoney" || type =="interest" || type =="prize")
    {
        // var row = incomeTable.insertRow(1);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // var cell3 = row.insertCell(2);
        // cell1.innerHTML = time;
        // cell2.innerHTML = description;
        // cell3.innerHTML = value;
        netIncome += value;
        net += value;


        // updating the array and piechart
        switch (type)
        {
            case "salary":
                incomeArray[0] += value;
                break;
            case "sales":
                incomeArray[1] += value;
                break;
            case "tip":
                incomeArray[2] += value;
                break;
            case "pocketMoney":
                incomeArray[3] += value;
                break;
            case "interest":
                incomeArray[4] += value;
                break;
            case "prize":
                incomeArray[5] += value;
                break;
        }
        incomeChartObject.update();

        //updating the db
        db.collection('incomeList').add({time: time, type: type, description: description, value: value});

        //clearing the fields
        document.getElementById("description").value = "";
        document.getElementById("transactionValue").value = "";



    }

    // expenses
    if (type == "fnb" || type == "travel" || type =="tech" || type =="carExpenses" || type =="essentials" || type =="friends" || type =="hobby" || type =="meds" || type =="movie" || type =="stationery")
    {
        // var row = expenseTable.insertRow(1);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // var cell3 = row.insertCell(2);
        // cell1.innerHTML = time;
        // cell2.innerHTML = description;
        // cell3.innerHTML = value;
        netExpense += value;
        net -= value;


        // updating the array and piechart
        switch (type)
        {
            case "fnb":
                expenseArray[0] += value;
                break;
            case "travel":
                expenseArray[1] += value;
                break;
            case "tech":
                expenseArray[2] += value;
                break;
            case "carExpenses":
                expenseArray[3] += value;
                break;
            case "essentials":
                expenseArray[4] += value;
                break;
            case "friends":
                expenseArray[5] += value;
                break;
            case "hobby":
                expenseArray[6] += value;
                break;
            case "meds":
                expenseArray[7] += value;
                break;
            case "movie":
                expenseArray[8] += value;
                break;
            case "stationery":
                expenseArray[9] += value;
                break;
        }
        expenseChartObject.update();

        // updating the db
        db.collection('expenseList').add({time: time, type: type, description: description, value: value});

        //clearing the fields
        document.getElementById("description").value = "";
        document.getElementById("transactionValue").value = "";
    }


    netIncomeElement.innerHTML = netIncome;
    netExpenseElement.innerHTML = netExpense;
    overviewBudgetValue.innerHTML = net;
}

var incomeTable = document.getElementById("incomeTable");
var expenseTable = document.getElementById("expenseTable");


/********INDEXED DB PORTION*****/


// var request = indexedDB.open('db');
// var total = 0;
// request.onsuccess = (event) => {
//     db = event.target.result;
//     let tx = db.transaction('incomeList');
//     let store = tx.objectStore('incomeList');
//     let cursor = store.openCursor().onsuccess= (event) => {
//       const cursor = event.target.result;
//       if ( cursor )
//       {
//         total += cursor.value['value'];
//         cursor.continue();
//       }
//     };
//
// }


// arrays for pie charts
var incomeArray = [0,0,0,0,0,0];
/* salary, sales, tip, pocketMoney, interest, prize */
var incomeLabels = ["Salary", "Sales", "Tip", "Pocket Money", "Interest", "Prize"];

var expenseArray = [0,0,0,0,0,0,0,0,0,0];
/* fnb, travel, tech, carExpenses, essentials, friends, hobby, meds, movie, stationery */
var expenseLabels = ["FnB", "Travel", "Tech", "Car Expenses", "Essentials", "Friends", "Hobby", "Meds", "Movie", "Stationery"];


// UPDATING ABOVE ARRAYS ON FIRST LOAD OR RELOAD
// COMMENT THIS PART OUT ON FIRST LOAD, THEN ENTER ONE EXPENSE AND INCOME THEN UNCOMMENT THIS
// incomeArray
var request = indexedDB.open('db');
request.onsuccess = (event) => {

    chal = event.target.result;
    let tx = chal.transaction('incomeList');
    let store = tx.objectStore('incomeList');
    let cursor = store.openCursor().onsuccess= (event) => {

      const cursor = event.target.result;
      if ( cursor )
      {
        // updating the table
        // var row = incomeTable.insertRow(1);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // var cell3 = row.insertCell(2);
        // cell1.innerHTML = cursor.value['time'];
        // cell2.innerHTML = cursor.value['description'];
        // cell3.innerHTML = cursor.value['value'];
        netIncome += cursor.value['value'];
        net += cursor.value['value'];
        netIncomeElement.innerHTML = netIncome;
        overviewBudgetValue.innerHTML = net;

        // updating the array
        switch ( cursor.value['type'] )
        {
            case "salary":
                incomeArray[0] += cursor.value['value'];
                break;
            case "sales":
                incomeArray[1] += cursor.value['value'];
                break;
            case "tip":
                incomeArray[2] += cursor.value['value'];
                break;
            case "pocketMoney":
                incomeArray[3] += cursor.value['value'];
                break;
            case "interest":
                incomeArray[4] += cursor.value['value'];
                break;
            case "prize":
                incomeArray[5] += cursor.value['value'];
                break;
        }

        cursor.continue();
      }
      incomeChartObject.update();
    };
}
// expense array
var request = indexedDB.open('db');
request.onsuccess = (event) => {
    chal = event.target.result;
    let tx = chal.transaction('expenseList');
    let store = tx.objectStore('expenseList');
    let cursor = store.openCursor().onsuccess= (event) => {
      const cursor = event.target.result;
      if ( cursor )
      {
        // updating the table
        // var row = expenseTable.insertRow(1);
        // var cell1 = row.insertCell(0);
        // var cell2 = row.insertCell(1);
        // var cell3 = row.insertCell(2);
        // cell1.innerHTML = cursor.value['time'];
        // cell2.innerHTML = cursor.value['description'];
        // cell3.innerHTML = cursor.value['value'];
        netExpense += cursor.value['value'];
        net -= cursor.value['value'];
        netExpenseElement.innerHTML = netExpense;
        overviewBudgetValue.innerHTML = net;

        // updating the array
        switch (cursor.value['type'])
        {
            case "fnb":
                expenseArray[0] += cursor.value['value'];
                break;
            case "travel":
                expenseArray[1] += cursor.value['value'];
                break;
            case "tech":
                expenseArray[2] += cursor.value['value'];
                break;
            case "carExpenses":
                expenseArray[3] += cursor.value['value'];
                break;
            case "essentials":
                expenseArray[4] += cursor.value['value'];
                break;
            case "friends":
                expenseArray[5] += cursor.value['value'];
                break;
            case "hobby":
                expenseArray[6] += cursor.value['value'];
                break;
            case "meds":
                expenseArray[7] += cursor.value['value'];
                break;
            case "movie":
                expenseArray[8] += cursor.value['value'];
                break;
            case "stationery":
                expenseArray[9] += cursor.value['value'];
                break;
        }

        cursor.continue();
      }
      expenseChartObject.update();
    };

}




var barColors = [
  "#b91d47",
  "#00aba9",
  "#2b5797",
  "#e8c3b9",
  "#1e7145",
  "#F3CCFF",
  "#62B6B7",
  "#495579",
  "#678983",
  "#FB2576",
];


var incomeChartObject = new Chart("incomeChart", {
  type: "pie",
  data: {
    labels: incomeLabels,
    datasets: [{
        backgroundColor: barColors,
      data: incomeArray
    }]
  },
  options: {
    title: {
      display: true,
      text: "Income"
    }
  }
});
incomeChartObject.update();

var expenseChartObject = new Chart("expenseChart", {
  type: "pie",
  data: {
    labels: expenseLabels,
    datasets: [{
        backgroundColor: barColors,
      data: expenseArray
    }]
  },
  options: {
    title: {
      display: true,
      text: "Expense"
    }
  }
});
expenseChartObject.update();
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/
//IMPLEMENTING THE SEARCH FUNCTION
document.getElementById("interactiveSubmitButton").addEventListener("click", handleShow);
document.getElementById("interactiveClearButton").addEventListener("click", handleClear);

function handleShow()
{
  var whatToShow = document.getElementById("interactiveDropDown").value;
  var tableElement = document.getElementById('interactiveTable');
  var monthYear = document.getElementById('monthYearSelect').value;
  // setting the header of the table
  document.getElementById('interactiveTable').innerHTML = "<thead><th>Time</th><th>Type</th><th>Description</th><th>Amount</th></thead><tbody></tbody>";


  if ( monthYear == '' ) // no month and year are selected: so all time
  {
    if ( whatToShow == 'allIncomes' )
    {
      var request = indexedDB.open('db');
      request.onsuccess = (event) =>
      {
        chal = event.target.result;
        let tx = chal.transaction('incomeList');
        let store = tx.objectStore('incomeList');
        let cursor = store.openCursor().onsuccess= (event) =>
        {

          const cursor = event.target.result;
          if ( cursor )
          {
            // updating the table
            var row = tableElement.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = cursor.value['time'];
            cell2.innerHTML = cursor.value['type'];
            cell3.innerHTML = cursor.value['description'];
            cell4.innerHTML = cursor.value['value'];
            cursor.continue();
          }
        };
      }
    }
    else if ( whatToShow == 'allExpenses' )
    {
      var request = indexedDB.open('db');
      request.onsuccess = (event) => {
        chal = event.target.result;
        let tx = chal.transaction('expenseList');
        let store = tx.objectStore('expenseList');
        let cursor = store.openCursor().onsuccess= (event) => {

          const cursor = event.target.result;
          if ( cursor )
          {
            // updating the table
            var row = tableElement.insertRow(1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            var cell4 = row.insertCell(3);
            cell1.innerHTML = cursor.value['time'];
            cell2.innerHTML = cursor.value['type'];
            cell3.innerHTML = cursor.value['description'];
            cell4.innerHTML = cursor.value['value'];
            cursor.continue();
          }
        };
      }
    }
    else
    {
      // income
      if (whatToShow == "salary" || whatToShow == "sales" || whatToShow == "tip" || whatToShow == "pocketMoney" || whatToShow =="interest" || whatToShow =="prize")
      {
        var request = indexedDB.open('db');
        request.onsuccess = (event) => {
          chal = event.target.result;
          let tx = chal.transaction('incomeList');
          let store = tx.objectStore('incomeList');
          let cursor = store.openCursor().onsuccess= (event) => {

            const cursor = event.target.result;
            if ( cursor )
            {
              // updating the table
              if (cursor.value['type']==whatToShow)
              {
                var row = tableElement.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = cursor.value['time'];
                cell2.innerHTML = cursor.value['type'];
                cell3.innerHTML = cursor.value['description'];
                cell4.innerHTML = cursor.value['value'];
              }
              cursor.continue();
            }
          };
        }
      }

      // expense
      if (whatToShow == "fnb" || whatToShow == "travel" || whatToShow =="tech" || whatToShow =="carExpenses" || whatToShow =="essentials" || whatToShow =="friends" || whatToShow =="hobby" || whatToShow =="meds" || whatToShow =="movie" || whatToShow =="stationery")
      {
        var request = indexedDB.open('db');
        request.onsuccess = (event) => {
          chal = event.target.result;
          let tx = chal.transaction('expenseList');
          let store = tx.objectStore('expenseList');
          let cursor = store.openCursor().onsuccess= (event) => {

            const cursor = event.target.result;
            if ( cursor )
            {
              // updating the table
              if (cursor.value['type']==whatToShow)
              {
                var row = tableElement.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = cursor.value['time'];
                cell2.innerHTML = cursor.value['type'];
                cell3.innerHTML = cursor.value['description'];
                cell4.innerHTML = cursor.value['value'];
              }
              cursor.continue();
            }
          };
        }
      }
    }
  }
  else // month and year are selected so show only that much data
  {
    if ( whatToShow == 'allIncomes' )
    {
      var request = indexedDB.open('db');
      request.onsuccess = (event) =>
      {
        chal = event.target.result;
        let tx = chal.transaction('incomeList');
        let store = tx.objectStore('incomeList');
        let cursor = store.openCursor().onsuccess= (event) =>
        {


          const cursor = event.target.result;
          if ( cursor )
          {
            // updating the table
            if ( monthYear == cursor.value['time'].slice(0,7) ) // extracting the month and year of each entry
            {

              var row = tableElement.insertRow(1);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              cell1.innerHTML = cursor.value['time'];
              cell2.innerHTML = cursor.value['type'];
              cell3.innerHTML = cursor.value['description'];
              cell4.innerHTML = cursor.value['value'];

            }
            cursor.continue();
          }
        };
      }
    }
    else if ( whatToShow == 'allExpenses' )
    {
      var request = indexedDB.open('db');
      request.onsuccess = (event) => {
        chal = event.target.result;
        let tx = chal.transaction('expenseList');
        let store = tx.objectStore('expenseList');
        let cursor = store.openCursor().onsuccess= (event) => {

          const cursor = event.target.result;
          if ( cursor )
          {
            // updating the table
            if ( monthYear == cursor.value['time'].slice(0,7) ) // extracting the month and year of each entry
            {
              var row = tableElement.insertRow(1);
              var cell1 = row.insertCell(0);
              var cell2 = row.insertCell(1);
              var cell3 = row.insertCell(2);
              var cell4 = row.insertCell(3);
              cell1.innerHTML = cursor.value['time'];
              cell2.innerHTML = cursor.value['type'];
              cell3.innerHTML = cursor.value['description'];
              cell4.innerHTML = cursor.value['value'];

            }
            cursor.continue();
          }
        };
      }
    }
    else
    {
      // income
      if (whatToShow == "salary" || whatToShow == "sales" || whatToShow == "tip" || whatToShow == "pocketMoney" || whatToShow =="interest" || whatToShow =="prize")
      {
        var request = indexedDB.open('db');
        request.onsuccess = (event) => {
          chal = event.target.result;
          let tx = chal.transaction('incomeList');
          let store = tx.objectStore('incomeList');
          let cursor = store.openCursor().onsuccess= (event) => {

            const cursor = event.target.result;
            if ( cursor )
            {
              // updating the table
              if (cursor.value['type']==whatToShow && monthYear == cursor.value['time'].slice(0,7) )
              {
                var row = tableElement.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = cursor.value['time'];
                cell2.innerHTML = cursor.value['type'];
                cell3.innerHTML = cursor.value['description'];
                cell4.innerHTML = cursor.value['value'];
              }
              cursor.continue();
            }
          };
        }
      }

      // expense
      if (whatToShow == "fnb" || whatToShow == "travel" || whatToShow =="tech" || whatToShow =="carExpenses" || whatToShow =="essentials" || whatToShow =="friends" || whatToShow =="hobby" || whatToShow =="meds" || whatToShow =="movie" || whatToShow =="stationery")
      {
        var request = indexedDB.open('db');
        request.onsuccess = (event) => {
          chal = event.target.result;
          let tx = chal.transaction('expenseList');
          let store = tx.objectStore('expenseList');
          let cursor = store.openCursor().onsuccess= (event) => {

            const cursor = event.target.result;
            if ( cursor )
            {
              // updating the table
              if (cursor.value['type']==whatToShow && monthYear == cursor.value['time'].slice(0,7) )
              {
                var row = tableElement.insertRow(1);
                var cell1 = row.insertCell(0);
                var cell2 = row.insertCell(1);
                var cell3 = row.insertCell(2);
                var cell4 = row.insertCell(3);
                cell1.innerHTML = cursor.value['time'];
                cell2.innerHTML = cursor.value['type'];
                cell3.innerHTML = cursor.value['description'];
                cell4.innerHTML = cursor.value['value'];
              }
              cursor.continue();
            }
          };
        }
      }
    }
  }


}


function handleClear()
{
  document.getElementById('interactiveTable').innerHTML = '';
}

/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/

// IMPLEMENTING THE SIDEBARS FUNCTIONS
document.getElementById("showListButton").addEventListener("click", handleShowListButton);

function handleShowListButton()
{
  handleClear();
  document.getElementById('monthlyGraphDiv').setAttribute("style", "display: none;");
  document.getElementById('interactiveTablesDiv').setAttribute("style", "");
}

document.getElementById('showLineChartButton').addEventListener('click', handleShowLineChartButton);

function handleShowLineChartButton()
{
  document.getElementById('monthlyGraphDiv').setAttribute("style", "");
  document.getElementById('interactiveTablesDiv').setAttribute("style", "display: none;");
}

/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/

// IMPLEMENTING THE SHOW MONTHLY GRAPH FUNCTON
document.getElementById('submitYearButton').addEventListener("click", handleSubmitYearButton);

var monthlyIncomes = [0,0,0,0,0,0,0,0,0,0,0,0];
var monthlyExpenses = [0,0,0,0,0,0,0,0,0,0,0,0];
var overallMonthlyChange = [0,0,0,0,0,0,0,0,0,0,0,0];
var monthlyLabels = ["Jan" ,"Feb" ,"Mar" ,"Apr" ,"May" ,"Jun" ,"Jul" ,"Aug" ,"Sep" ,"Oct" ,"Nov" ,"Dec"];

var monthlyChartObject = new Chart("monthlyGraph", {
  type: "line",
  data: {
    labels: monthlyLabels,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,120,0,5.0)",
      borderColor: "rgba(0,120,0,1.0)",
      data: monthlyIncomes
    },
    {
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(255,0,0,5.0)",
      borderColor: "rgba(255,0,0,1.0)",
      data: monthlyExpenses
    }

    ]
  },
    options: {
      title: {
      display: true,
      text: "Monthly Incomes and Expenses"
    },
    legend: {display: false}
  },
});

var barGraphObject = new Chart("overallBarGraphCanvas", {
  type: "bar",
  data: {
    labels: monthlyLabels,
    datasets: [{
      fill: false,
      lineTension: 0,
      backgroundColor: "rgba(0,0,120,5.0)",
      borderColor: "rgba(0,0,120,1.0)",
      data: overallMonthlyChange
    }

    ]
  },
    options: {
      title: {
      display: true,
      text: "Monthly Net Worth Change"
    },
    legend: {display: false}
  },
});







function handleSubmitYearButton()
{
  var yearSubmitted = document.getElementById('yearInputField').value;
  if ( yearSubmitted == '' ) // if nothing submitted
  {
    alert("Please Enter an year to show");
  }
  else // if an year submitted
  {
    // draw the graph

    // collecting data of incomes
    var request = indexedDB.open('db');
    request.onsuccess = (event) =>
    {
        db = event.target.result;
        let tx = db.transaction('incomeList');
        let store = tx.objectStore('incomeList');
        let cursor = store.openCursor().onsuccess= (event) =>
        {
          const cursor = event.target.result;
          if ( cursor )
          {
            if ( cursor.value['time'].slice(0,4) == yearSubmitted )
            {
              switch (cursor.value['time'].slice(5,7)) // switching the month
              {
                case '01':
                  monthlyIncomes[0] += cursor.value['value'];
                  break;
                case '02':
                  monthlyIncomes[1] += cursor.value['value'];
                  break;
                case '03':
                  monthlyIncomes[2] += cursor.value['value'];
                  break;
                case '04':
                  monthlyIncomes[3] += cursor.value['value'];
                  break;
                case '05':
                  monthlyIncomes[4] += cursor.value['value'];
                  break;
                case '06':
                  monthlyIncomes[5] += cursor.value['value'];
                  break;
                case '07':
                  monthlyIncomes[6] += cursor.value['value'];
                  break;
                case '08':
                  monthlyIncomes[7] += cursor.value['value'];
                  break;
                case '09':
                  monthlyIncomes[8] += cursor.value['value'];
                  break;
                case '10':
                  monthlyIncomes[9] += cursor.value['value'];
                  break;
                case '11':
                  monthlyIncomes[10] += cursor.value['value'];
                  break;
                case '12':
                  monthlyIncomes[11] += cursor.value['value'];
                  break;
              }
            }
            cursor.continue();
          }


        };

    }


    // collecting data of expenses
    var request = indexedDB.open('db');
    request.onsuccess = (event) =>
    {
        db = event.target.result;
        let tx = db.transaction('expenseList');
        let store = tx.objectStore('expenseList');
        let cursor = store.openCursor().onsuccess= (event) =>
        {
          const cursor = event.target.result;
          if ( cursor )
          {
            if ( cursor.value['time'].slice(0,4) == yearSubmitted )
            {
              switch (cursor.value['time'].slice(5,7)) // switching the month
              {
                case '01':
                  monthlyExpenses[0] += cursor.value['value'];
                  break;
                case '02':
                  monthlyExpenses[1] += cursor.value['value'];
                  break;
                case '03':
                  monthlyExpenses[2] += cursor.value['value'];
                  break;
                case '04':
                  monthlyExpenses[3] += cursor.value['value'];
                  break;
                case '05':
                  monthlyExpenses[4] += cursor.value['value'];
                  break;
                case '06':
                  monthlyExpenses[5] += cursor.value['value'];
                  break;
                case '07':
                  monthlyExpenses[6] += cursor.value['value'];
                  break;
                case '08':
                  monthlyExpenses[7] += cursor.value['value'];
                  break;
                case '09':
                  monthlyExpenses[8] += cursor.value['value'];
                  break;
                case '10':
                  monthlyExpenses[9] += cursor.value['value'];
                  break;
                case '11':
                  monthlyExpenses[10] += cursor.value['value'];
                  break;
                case '12':
                  monthlyExpenses[11] += cursor.value['value'];
                  break;
              }
            }
            cursor.continue();
          }
        };

    }

    monthlyChartObject.update();

    // now updating the overallMonthlyChange array
    for ( var k = 0 ; k<= 11; k++ )
    {
      overallMonthlyChange[k] = monthlyIncomes[k] - monthlyExpenses[k];
    }

    barGraphObject.update();
  }
}



/*********************************************************************************************/
/*********************************************************************************************/
/*********************************************************************************************/

// below method works for cursor don't fuck with it
// var request = indexedDB.open('db');
//
// request.onsuccess = (event) => {
//     db = event.target.result;
//     let tx = db.transaction('incomeList');
//     let store = tx.objectStore('incomeList');
//     let cursor = store.openCursor().onsuccess= (event) => {
//       const cursor = event.target.result;
//       console.log(cursor.key);
//     };
//
// }



/*********how to extract element
 db.collection('incomeList').doc({ type: 'salary'}).get().then(document => {test = document});

*/


/*
How to open a db for transaction for

var request = indexedDB.open('db');

request.onsuccess = (event) => {
    db = event.target.result;

}

and then do
let tx = db.transaction('incomeList');


but do these all in a single code snipped as then the transaction finishes

 */






// FOR ITERATION
// var request = indexedDB.open('db');
//
// request.onsuccess = (event) => {
//     db = event.target.result;
//     let tx = db.transaction('incomeList');
//     let store = tx.objectStore('incomeList');
//
//       let i = 1;
//     let cursor = store.openCursor().onsuccess= (event) => {
//       const cursor = event.target.result;
//       if ( cursor )
//       {
//         console.log(cursor.key);
//         console.log(i);
//         i = i + 1;
//
//         cursor.continue();
//       }
//     };
//
// }



// ITERATION AND SUMMING
// var request = indexedDB.open('db');
// var total = 0;
// request.onsuccess = (event) => {
//     db = event.target.result;
//     let tx = db.transaction('incomeList');
//     let store = tx.objectStore('incomeList');
//     let cursor = store.openCursor().onsuccess= (event) => {
//       const cursor = event.target.result;
//       if ( cursor )
//       {
//         total += cursor.value['value'];
//         cursor.continue();
//       }
//     };
//
// }

