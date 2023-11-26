console.log("by wertoquri and Anna")

let notes = [
    {
        time: 61537,
        title: "заголовок",
        text: "chlsidh",
        isDone: false
    }
]

let lastCanges = 0;

$(document).ready(function () {
    notes = JSON.parse(localStorage.getItem("notes")) ?? []
    writeNotes()
    $("#add").on("click", addNote)
})

function addNote() {
    let title = $("#title").val();
    let text = $("#text").val();
    $("#title").val("")
    $("#text").val("")
    let time = +new Date();
    notes.push({
        time: time,
        title: title,
        text: text,
        isDone: false
    })
    console.log(notes)
    localStorage.setItem("notes", JSON.stringify(notes))
    writeNotes()
}

function writeNotes() {
    $(".notes").empty()
    notes.forEach((item) => {
        $(".notes").append(`
        <div class="item ${item.isDone}" time="${item.time}">
            <div class="item_title">
                ${item.title} 
            </div>
            <div class="item_text">
                ${item.text}
            </div>
            <div class="btnBar">
            <div class="data">${new Date(item.time).toLocaleString()}</div>
                <div class="trashBtn btn" onclick="deleteNote(${item.time})"><i class="fa-solid fa-ban"></i></div>
                <div class="doneBTN btn" onclick="doneNote(${item.time})"><i class="fa-regular fa-circle-check"></i> </div>
                <div class="changeBtn btn" onclick="changeNote(${item.time})"><i class="fa-regular fa-pen-to-square"></i></div>

            </div>
        </div>`
        )
    }
    )
}

function deleteNote(time) {
    notes = [...notes.filter(el => el.time !== time)]
    writeNotes();
    localStorage.setItem("notes", JSON.stringify(notes))
}

function doneNote(time) {
    let element = notes.filter(el => el.time === time)[0]
    notes[notes.indexOf(element)].isDone = !notes[notes.indexOf(element)].isDone
    writeNotes();
    localStorage.setItem("notes", JSON.stringify(notes))
}

function changeNote(time) {
    $(".changeWindow").css("display", "flex")
    let element = notes.filter(el => el.time === time)[0]
    let title = notes[notes.indexOf(element)].title
    let text = notes[notes.indexOf(element)].text
    $("#change_title").val(title)
    $("#change_text").val(text)
    lastCanges = time
}

function Save() {
    let element = notes.filter(el => el.time === lastCanges)[0]
    notes[notes.indexOf(element)].title = $("#change_title").val()
    notes[notes.indexOf(element)].text = $("#change_text").val()
    $(".changeWindow").css("display", "none")
    localStorage.setItem("notes", JSON.stringify(notes))
    writeNotes();

}




