var dt = new Date();
document.getElementById("datetime").innerHTML = dt

function toggle(){
 var x = document.getElementById("harvest");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
  var y = document.getElementById("waterLow");
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }

  var z = document.getElementById("weightDisp");
  if (z.style.display === "block") {
    z.style.display = "none";
  } else {
    z.style.display = "block";
  }
}

