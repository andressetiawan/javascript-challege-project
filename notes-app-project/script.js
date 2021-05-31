const editEl = document.body.querySelector(".fa-edit");
const deleteEl = document.body.querySelector(".fa-trash-alt");
const textCreate = document.body.querySelector("#notes-create");
const btnCreateEl = document.body.querySelector(".btn-create");
const notesContainer = document.body.querySelector(".notes-container");
const container = document.createElement("div");
container.setAttribute("class", "notes-container-wrapper");

const getNotesLs = () => {
  const res = JSON.parse(localStorage.getItem("notes"));
  return res == null ? [] : res;
};

const editMode = (id) => {
  const btnSave = document.querySelectorAll(".btn-save");
  const textUpdate = document.body.querySelectorAll("#notes-update");
  btnSave[id - 1].classList.toggle("hidden");
  textUpdate[id - 1].toggleAttribute("disabled");
};

const deleteMode = (id) => {
  const newData = getNotesLs().filter((item) => item.id !== id);
  localStorage.setItem("notes", JSON.stringify(newData));
  showNotes(getNotesLs());
};

const updateMode = (id) => {
  const btnSave = document.querySelectorAll(".btn-save");
  const currentNotes = getNotesLs();
  const index = getNotesLs().findIndex((item) => item.id == id);
  const textUpdate = document.body.querySelectorAll("#notes-update");

  const newData = {
    id,
    value: textUpdate[id - 1].value,
  };
  currentNotes.splice(index, 1, newData);
  textUpdate[id - 1].setAttribute("disabled", "true");
  btnSave[id - 1].classList.add("hidden");
  localStorage.setItem("notes", JSON.stringify(currentNotes));
};

const showNotes = (data) => {
  let HTMLnotes = "";
  if (data.length > 0) {
    data.map((item) => {
      HTMLnotes += `
      <div class="notes-container"> 
        <div>
          <i onclick=editMode(${item.id}) class="fas fa-edit"></i>
          <i onclick=deleteMode(${item.id}) class="fas fa-trash-alt"></i>
        </div>
        <textarea name="notes" disabled id="notes-update">${item.value}</textarea>
        <button onclick=updateMode(${item.id}) class="btn-save hidden" type="submit">Save</button>
      </div>`;
    });
  } else {
    HTMLnotes = `<div class="notes-container"> 
    <p class="placeholder">No notes found </p>
    </div>`;
  }

  container.innerHTML = HTMLnotes;
};
document.body.appendChild(container);

btnCreateEl.addEventListener("click", () => {
  let notesData = getNotesLs();
  const data = {
    id: notesData.length + 1,
    value: textCreate.value,
  };

  localStorage.setItem("notes", JSON.stringify([...notesData, data]));

  showNotes(getNotesLs());

  textCreate.value = "";
});

showNotes(getNotesLs());
