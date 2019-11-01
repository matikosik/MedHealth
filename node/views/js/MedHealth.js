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

function avatar() {
    var x = document.getElementById("avconf");
    if (x.style.display === "none") {
      x.style.display = "block";
    } else {
      x.style.display = "none";
    }
  }