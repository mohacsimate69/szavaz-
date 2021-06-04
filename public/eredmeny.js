const eredmenyDiv = document.getElementById('eredmeny-div');

function berak(elem){
    const p = document.createElement('div');
    p.innerText = elem.nev+': '+ elem.szavazatok;
    eredmenyDiv.appendChild(p);
}

function oldalgenerálás(eredmeny){
    console.log(eredmeny);

    eredmeny.forEach(berak)
}

fetch('/eredmenyek')
    .then(function(válasz){
        válasz.json().then(oldalgenerálás)
            
        

    })