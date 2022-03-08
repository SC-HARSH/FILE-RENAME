function copyText() {
  /* Get the text field */
  var copyText = document.getElementById("copyTextArea");

  /* Select the text field */
  copyText.select();
  copyText.setSelectionRange(0, 99999); /* For mobile devices */

  /* Copy the text inside the text field */
  navigator.clipboard.writeText(copyText.value);
}


function Upload() {
  var fileUpload = document.getElementById("fileUpload");
  var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.csv|.txt)$/;
  if (regex.test(fileUpload.value.toLowerCase())) {
    if (typeof FileReader != "undefined") {
      var reader = new FileReader();
      reader.onload = function (e) {
        var table = document.createElement("table");
        table.className =
          "table table-striped table-bordered table-hover table-condensed table-responsive form-control";
        table.id = "myTable";
        var rows = e.target.result.split("\n");
        for (var i = 0; i < rows.length; i++) {
          var cells = rows[i].split(",");
          if (cells.length > 1) {
            var row = table.insertRow(-1);
            for (var j = 0; j < cells.length; j++) {
              var cell = row.insertCell(-1);
              cell.innerHTML = cells[j];
            }
          }
        }
        var dvCSV = document.getElementById("dvCSV");
        dvCSV.innerHTML = "";
        dvCSV.appendChild(table);
      };
      reader.readAsText(fileUpload.files[0]);
        //Now From Here The Code Making Part Begins
  copyCodeElm = document.getElementById("copyCode");
  setTimeout(readData, 300);
  //Always At End 🔽
  copyCodeElm.style.display = "block";
    } else {
      alert("This browser does not support HTML5.");
    }
  } else {
    alert("Please upload a valid CSV file.");
  }
}

function readData() {
    //Clearing The Var
    toShow = ""
  //gets table
  var oTable = document.getElementById("myTable");

  //gets rows of table
  var rowLength = oTable.rows.length;

  //loops through rows
  for (i = 1; i < rowLength; i++) {
    nameOf = [];
    newName=""
    code = "";
    //gets cells of current row
    var oCells = oTable.rows.item(i).cells;

    //gets amount of cells of current row
    var cellLength = oCells.length;
    console.log(cellLength);

    //loops through each cell in current row
    for (var j = 0; j < cellLength; j++) {
      /* get your cell info here */
      var cellVal = oCells.item(j).innerHTML;
      console.log(cellVal);
      nameOf.push(cellVal);
    }
    newName=nameOf[1].replace(/[\r\n]+/g,"")+'"'+'\r\n';
    code = 'ren "'+nameOf[0].replace(" ","")+'" "'+newName;
    toShow += code;
  }
  document.getElementById("copyTextArea").value = toShow;
}
