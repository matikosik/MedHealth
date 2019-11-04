$(document).ready(function(){

    $("#reg").click(function(){
        alert ("hola");
    });
    
    $("#log").click(function(){
        alert ("chau");
    });
    
    
    
    });

function Registrar()
{
    window.location.href = 'HTML/register.html';
}

function LogIn()
{
    window.location.href = 'HTML/Login.html';
}

/*-----------------------------------------------------------------*/

function hideav() {
    var x = document.getElementById('avconfdisp');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
}

function hidelang() {
    var x = document.getElementById('langmore');
    if (x.style.visibility === 'hidden') {
      x.style.visibility = 'visible';
    } else {
      x.style.visibility = 'hidden';
    }
}

function hidename() {
    var x = document.getElementById('avtxt');
    if (x.style.visibility === 'visible') {
      x.style.visibility = 'hidden';
    } else {
      x.style.visibility = 'visible';
    }
}

function myFunction() {
  var x = document.getElementById("box");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}

function myFunction2() {
  var x = document.getElementById("box");
  if (x.style.display === "block") {
    x.style.display = "none";
  } else {
    x.style.display = "block";
  }
}

function switchVisible() {
  if (document.getElementById('CATEGORIES')) {

      if (document.getElementById('CATEGORIES').style.visibility == 'hidden') {
          document.getElementById('CATEGORIES').style.visibility = 'visible';
          document.getElementById('HOSPITALS').style.visibility = 'hidden';
      }
      else if (document.getElementById('HOSPITALS').style.visibility = 'hidden') {
          document.getElementById('CATEGORIES').style.visibility = 'hidden';
          document.getElementById('HOSPITALS').style.visibility = 'visible';
      }
  }
}

function switchVisible2() {
  if (document.getElementById('HOSPITALS')) {

      if (document.getElementById('HOSPITALS').style.visibility == 'hidden') {
          document.getElementById('HOSPITALS').style.visibility = 'visible';
          document.getElementById('CATEGORIES').style.visibility = 'hidden';
      }
      else if (document.getElementById('CATEGORIES').style.visibility = 'hidden') {
          document.getElementById('HOSPITALS').style.visibility = 'hidden';
          document.getElementById('CATEGORIES').style.visibility = 'visible';
      }

  }
}