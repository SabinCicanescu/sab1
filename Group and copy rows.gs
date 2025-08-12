function groupAndCopyRows() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = ss.getActiveSheet();
  var targetSheet = ss.getSheetByName("Target"); //change with your Sheet name
  var data = sheet.getDataRange().getValues();
  var groups = {};
  
  for (var i = 1; i < data.length; i++) {
    var key = data[i][1];
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(data[i]);
  }
  
  for (var key in groups) {
    var sum = groups[key].reduce(function(acc, row) {
      return acc + row[12]; 
    }, 0);

//change with disired value
    if (Math.abs(sum - 0.01) < 0.000001) { 
      groups[key].forEach(function(row) {
        targetSheet.appendRow(row);
      });
    }
  }
}


function groupAndModifyAmounts() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues();
  var lastRow = sheet.getLastRow();
  var groupedAmounts = {};
  
  for (var i = 1; i < lastRow; i++) {
    var key = data[i][1]; 
    var amount = data[i][12]; //change with your column index
    
    if (!groupedAmounts[key]) {
      groupedAmounts[key] = [];
    }
    groupedAmounts[key].push({row: i + 1, amount: amount});
  }
  
  for (var key in groupedAmounts) {
    var group = groupedAmounts[key];
    var lastCell = group[group.length - 1];
    var newAmount = lastCell.amount  - 0.01; //change with disired value you need to be added
    sheet.getRange(lastCell.row, 13).setValue(newAmount);
  }
}
