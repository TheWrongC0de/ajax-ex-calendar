//STEP:
//Controllare quanti giorni ha il mese  formando così una lista;
//Chiedere all’api quali sono le festività per il mese ;
//Evidenziare le festività nella lista


$(document).ready(function () {
    //creo api per festività gennaio
    $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=0",
      method: "GET",
      success: function (data) {
         console.log(data.response)
          //creo var per numero giorni di gennaio 2018
         var numeroGiorni = moment("2018-01-01", "YYYY-MM-DD").daysInMonth();
         //apro un ciclo for per inserire la data di oggi
         for (i = 1; i <= numeroGiorni; i++) {
            var dataOggi = "2018-01-" + i;
            var formatoData = moment(dataOggi).format("YYYY-MM-DD")
            var giornoOggi = moment(dataOggi).format("DD MMMM");
            //creo un li nel html con i giorni di gennaio e le relative festivita che evidenzierò
            $(".calendario").append('<li data-giorni="' + formatoData +'">'+ dataOggi +'</li>');
         }

         for (var i = 0; i < data.response.length; i++) {
            //console.log("le festività sono in queste date :  " + data.response[i].date)//

            var festivita = data.response[i].date
            $(".calendario [data-giorni='" + festivita + "']").css("color","green").append(" "+data.response[i].name)
       }
      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   });

})
