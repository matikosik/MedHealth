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
