let table = document.getElementById("table");
let dateInput = document.getElementById("dateInput");

let p = document.getElementById("datePrompt");
dateInput.addEventListener("change", getDate);
window.addEventListener("load", getDate);

let months = ["Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"];

function getDate() {
    let dateInput = document.getElementById("dateInput").value;
    let date = new Date(dateInput);

    let day = date.getDate();
    let month = date.getMonth() + 1;
    let year = date.getFullYear();
    let days = new Date(year, month, 0).getDate();
    let dayOfWeek = new Date(year, month - 1, 1).getDay();

    p.textContent = `${months[month - 1]} ${year}`;

    backgroundImg(month);
    showDays(day, month, year);
}

function showDays(day, month, year) {
    let allTr = document.querySelectorAll("tr");
    for (let i = 1; i < allTr.length; i++) {
        allTr[i].remove();
    }

    let daysInCurrentMonth = new Date(year, month, 0).getDate();
    let daysInPreviousMonth = new Date(year, month - 1, 0).getDate();
    let dayOfWeek = new Date(year, month - 1, 1).getDay();

    let numberOfDays = [];
    for (let i = 0; i < daysInCurrentMonth + dayOfWeek; i++) {
        if (i < dayOfWeek) {
            numberOfDays.push((daysInPreviousMonth + i));
            continue;
        }
        numberOfDays.push(i);
    }
    let tr = document.createElement("tr");
    let th = null;

    for (let i = 0; i < numberOfDays.length; i++) {
        if (i % 7 === 0) {
            tr = document.createElement("tr");
        }
    
        th = document.createElement("th");
        th.textContent = numberOfDays[i] + 1 - dayOfWeek;

        if (i < dayOfWeek) {
            th.style.color = "gray";
        }
        
        if (numberOfDays[i] + 1 - dayOfWeek === day) {
            th.style.backgroundColor = "yellow";
            th.style.color = "red";
        }
        tr.appendChild(th);
        table.appendChild(tr);
    }

    let lastRow = table.lastElementChild;
    let daysInNextMonth = 1;

    for (let i = lastRow.children.length; i < 7; i++) {
        let th = document.createElement("th");
        th.textContent = daysInNextMonth++;
        th.style.color = "gray";
        lastRow.appendChild(th);
    }
}

function backgroundImg(number) {
    switch(number){
        case 12, 1, 2:
            table.style.backgroundImage = "url(/seasons/1.JPG)";
            break;
        case 3, 4, 5:
            table.style.backgroundImage = "url(/seasons/2.JPG)";
            break;
        case 6, 7, 8:
            table.style.backgroundImage = "url(/seasons/3.JPG)";
            break;
        case 9, 10, 11:
            table.style.backgroundImage = "url(/seasons/4.JPG)";
            break;
    }
}