function goBackTray() {
  window.history.back();
}

function harvestButton(){
 var x = document.getElementById("trayDone");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var T = document.getElementById("harvestDiv");
  if (T.style.display === "block") {
    T.style.display = "none";
  } else {
    T.style.display = "block";
  }

}

function insertTray(){
 var x = document.getElementById("harvestDiv");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
  var T = document.getElementById("insertTray");
  if (T.style.display === "block") {
    T.style.display = "none";
  } else {
    T.style.display = "block";
  }

}

function options(){
 var x = document.getElementById("insertTray");
    x.style.display = "none";

  var T = document.getElementById("options");
  if (T.style.display === "block") {
    T.style.display = "none";
  } else {
    T.style.display = "block";
  }

  var a = document.getElementById("insertTray");
    a.style.display = "none";

  var B = document.getElementById("waterCheck");
  if (B.style.display === "block") {
    B.style.display = "none";
  } else {
    B.style.display = "block";
  }

  var y = document.getElementById("phCheck");
  if (y.style.display === "block") {
    y.style.display = "none";
  } else {
    y.style.display = "block";
  }

  var z = document.getElementById("ecCheck");
  if (z.style.display === "block") {
    z.style.display = "none";
  } else {
    z.style.display = "block";
  }
}

function confirm(){
    alert("Microgreen type saved!");
}