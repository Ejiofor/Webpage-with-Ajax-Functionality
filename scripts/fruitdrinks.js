var xmlhttp = creatXMLHttpRequestObject();
var xh;
function creatXMLHttpRequestObject(){


  if(window.ActiveXObject){
    try{
      xh = new ActiveXObject("Microsoft.XMLHTTP");
    }catch(e){
      xh = false;
    }
  }else{
    try{
      xh = new XMLHttpRequest();
    }catch(e){
      xh = false;
    }
  }
  if(!xh)
  alert("cant creat xmlhttprequest object");
  else
    return xh;
}

function process(){
  if (xh.readyState ==0 ||xh.readyState ==4) {
    mydrink = encodeURIComponent(document.getElementById('userInput').value);
    xh.open("GET","drinkstore.php?drink="+ mydrink,true);
    xh.onreadystatechange = handleServerResponse();
    xh.send();
  }else {
      setTimeout('process()',1000);
  }
}

function handleServerResponse(){
  if(xh.readyState == 4){
    if(xh.status == 200){
      xmlResponse = xh.responseXML;
      xmldocument = xmlResponse.documentElement;
      message = xmldocument.firstChild.data;
      document.getElementById('underInput').innerHTML = message;
      setTimeout('process()',1000);
    }
  }else{
    alert("Something went wrong! STATUS: "+xh.status);
  }
}
