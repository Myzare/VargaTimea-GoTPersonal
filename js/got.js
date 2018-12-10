function getGameOfThronesCharacterDatas(url, callbackFunc) {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      callbackFunc(this);
    }
  };
  xhttp.open('GET', url, true);
  xhttp.send();
}

function successGetGameOfThronesCharacterDatas(xhttp) {
  // Nem szabad globálisba kitenni a aliveChars-t!
  var userDatas = JSON.parse(xhttp.responseText);
  // Innen hívhatod meg a többi függvényed
  var aliveChars = whosAlive(userDatas);
  aliveSort(aliveChars);
  leftContentGen(aliveChars);
  buttonEvent(aliveChars, aliveChars.length);
  addEventListenerToImg(aliveChars);

}

getGameOfThronesCharacterDatas(
  './json/got.json',
  successGetGameOfThronesCharacterDatas
);

// Live servert használd mindig!!!!!
/* IDE ÍRD A FÜGGVÉNYEKET!!!!!! NE EBBE AZ EGY SORBA HANEM INNEN LEFELÉ! */


// Élő karakterek kimentése -George R.R Martin lázálmaiból-. 
function whosAlive(aliveChars) {
  var alive = [];
  for (var a = 0; a < aliveChars.length; a++) {
    if (!aliveChars[a].dead) {
      alive.push(aliveChars[a]);
    }
  }
  return alive;
}
// -még-Élő karakterek ABC szerint.
function aliveSort(aliveChars) {
  aliveChars.sort(function customSort(a, b) {
    if (a.name > b.name) {
      return 1;
    }
    return -1;
  });
}

//Left div feltöltése portréval és névvel.

function leftContentGen(aliveChars) {
  var leftDiv = document.querySelector('.div___left');
  for (var p = 0; p < aliveChars.length; p++) {
    leftDiv.innerHTML += `<div class="div___left--portraits">
    <img class="alivePort" src="./${aliveChars[p].portrait}" alt="${aliveChars[p].name}">
    <p class="div___left--names">${aliveChars[p].name}</p>
    </div>`;
  }
}


function buttonEvent(aliveChars, aliveCharsLength) {
  var button = document.getElementById('searchBtn');
  button.addEventListener('click', function () {
    searchCharRight(aliveChars, aliveCharsLength);
  });


  // Keresés az élők között.

  function searchCharRight(aliveChars, aliveCharsLength) {
    var input = document.getElementById('userInput').value;
    input = input.toLowerCase();
    var finalPlace = document.querySelector('.right___infoBox');

    for (var s = 0; s < aliveCharsLength; s++) {
      if (aliveChars[s].name.toLowerCase() === input && aliveChars[s].house) {
        finalPlace.innerHTML = `
 <div> <img src="./${aliveChars[s].picture}">
 <p>${aliveChars[s].name}<br>
 <img class="banner" src='./assets/houses/${aliveChars[s].house}.png'></img><br>${aliveChars[s].bio}</p></div>
 `;
      }
      if (aliveChars[s].name.toLowerCase() === input && !aliveChars[s].house) {
        finalPlace.innerHTML = `<div> <img src="./${aliveChars[s].picture} alt='${aliveChars[s].name}"><p>${aliveChars[s].name}<br>${aliveChars[s].bio}</p></div>`;

      }
    }
  }
}


function addEventListenerToImg(aliveChars) {
  var clickOnImages = document.querySelectorAll('.alivePort');
  for (var i = 0; i < clickOnImages.length; i += 1) {
    clickOnImages[i].addEventListener('click', function fn() {
      clickOnCharacters(aliveChars, this.alt);
    });
  }
}

// Ha berakok egy house vizsgálatot elszáll az egész.

function clickOnCharacters(aliveChars, character) {
  var clickPlace = document.querySelector('.right___infoBox');
  for (var i = 0; i < aliveChars.length; i += 1) {
    if (aliveChars[i].name === character) {
      clickPlace.innerHTML = `<div>
      <img src="./${aliveChars[i].picture}">
      <p>${aliveChars[i].name}
      <br>
      ${aliveChars[i].bio}</p>
      </div>`;
    }
  }
}