let tBody = $("#tBody");
let torol = $("#torol");
let hozzaAd = $("#hosszaAd");
let feladatNev = $("#feladatNeve");
let OsszesKijejol = $("#OsszesKijejol");


let feladatok = [];

$(document).ready(function(){
    $.ajax({
        url:"teendok.json",
        method:"get",
        datatype: "json",
        success: function(data) {
            feladatok = data;
            Render();
        },
        error: function(error){
            console.log(error)
        }
    })
})



function Render(){
    tBody.empty();
    feladatok.map(function(feladat,index){
        let newtr = document.createElement("tr");
        // Checkbox
        let newtd = document.createElement("td");
        let newCheckbox = document.createElement("input");
        newCheckbox.type = "checkbox";
        newCheckbox.checked = feladat.checked;
        newCheckbox.id = `c${index}`;
        newCheckbox.classList.add("myClass");
        newtd.appendChild(newCheckbox);
        newtr.appendChild(newtd);
        // Feladat
        newtd = document.createElement("td");
        newtd.innerText += `${feladat.feladatNev}`;
        newtr.appendChild(newtd);
        // Feladat Sürgösége
        newtd = document.createElement("td");
        newtd.innerText += `${feladat.feladatSurgoseg}`
        newtr.appendChild(newtd);
        // feltöltés
        tBody.append(newtr);
    })

    let checkbox = document.querySelectorAll(".myClass");
    checkbox.forEach(e => {
        e.addEventListener("click",OnclickCheckBox);
    })
}

function OnclickCheckBox(){
    let id = this.id;
    let index = +id.slice(1);
    let checked = this.checked;
    feladatok[index].checked = checked;

} 


// összes true-vá rakása
$(OsszesKijejol).click(function(){
    let checked = this.checked;
    feladatok.forEach(e => {
        e.checked = checked;
    })
    Render();
})


$(hozzaAd).click(function(){
    if (feladatNev.text == "") {
        alert("nincs megadva feladat név");
        return;
    }
    console.log("hozzá add")
    let obj = {
        feladatNev: feladatNev.val(),
        feladatSurgoseg: $("#surgosegSelect option:selected").text(),
    }

    feladatok.push(obj);


    feladatNev.val = null;
    Render();
})

$(torol).click(function(){
    // console.log("törölnék ha engedné")
    feladatok = feladatok.filter(element => !element.checked)

    Render();
})
