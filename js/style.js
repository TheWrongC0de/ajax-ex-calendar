//STEP:
//Controllare quanti giorni ha il mese  formando così una lista;
//Chiedere all’api quali sono le festività per il mese ;
//Evidenziare le festività nella lista


/*$(document).ready(function () {
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

})*/

$(document).ready(function () {
   var mese = 1;
   holidayOrNot(mese);
   printDays(mese);
   $("#my_next").click(function(){
      if(mese == 12){
         mese = 1
         $(".calendario").html("")
         holidayOrNot(mese);
         printDays(mese);
      } else{
         mese++;
         $(".calendario").html("")
         holidayOrNot(mese);
         printDays(mese);
      }


   })
   $("#my_prev").click(function(){
      if(mese == 1){
         mese = 12;
         $(".calendario").html("")
         holidayOrNot(mese);
         printDays(mese);
      }else {
      mese--;
      $(".calendario").html("")
      holidayOrNot(mese);
      printDays(mese);
      }
   })
})


//funzione per stampare i giorni del mese
function printDays(mese){

   //imposto una variabile , setto anno , mese e giorno di partenza e richiedo il conteggio dei giorni di quel mese
   var daysNumber = moment("2018-" + mese, "YYYY-MM").daysInMonth();


   //apro un ciclo for sulla lunghezza del mese che ho selezionato nella mia variabile
   for (i = 1; i <= daysNumber; i++) {
      //imposto una variabile che ha valore della data corrente tranne il giorno che sarà definito dal mio index
      var dataCorrente = moment('2018-' + mese + '-' + i , 'YYYY-MM-D').format('YYYY-MM-DD');
      console.log(dataCorrente)
      //imposto una variabile che stabilisce il formato della mia variabile precedente in modo da renderlo uguale ai valori che mi rilascia l'api che ho utilizzato
      /* var formatoData = moment(dataCorrente).format("YYYY-MM-DD") */
      //imposto una variabile che sarà la mia stampa in pagina
      var giornoCorrente = moment(dataCorrente).format("dddd DD MMMM");
      //stampo in pagina
      $(".calendario").append('<div data-date="' + dataCorrente + '">' + giornoCorrente + '</div>');
      //creo una variabile per il nome del mese
      var Nomese = moment().month(mese - 1).format("MMMM");
      console.log(Nomese)
      $("#meseOra").text(Nomese)

   }
}

//funzione per effettuare la chiamata AJAX
function holidayOrNot(mese){
   $.ajax({
      url: "https://flynn.boolean.careers/exercises/api/holidays?year=2018&month=" + (mese - 1),
      method: "GET",

      success: function (data) {
         //imposto un controllo , se la lunghezza dell'array è minore di 0 , questa parte di codice non viene eseguita
         if (data.response.length > 0) {
            for (var i = 0; i < data.response.length; i++) {
               console.log(data.response.length)
               console.log("queste sono le date delle festività " + data.response[i].date)

               //imposto una variabile che ha valore date (chiave della mia api)
               var festivita = data.response[i].date
               //sostituisco in pagina gli elementi che hanno come attributo un valore uguale alla mia festività , li coloro di rosso e APPEND il nome della festività (altra chiave della mia api)
               $(".calendario [data-date='" + festivita + "']").addClass("holidays").append("<br> " + data.response[i].name)

            }

         }
      },
      error: function (richiesta, stato, errori) {
         alert("E' avvenuto un errore. " + " " + richiesta + " " + stato + " " + errori);
      }
   })
}
