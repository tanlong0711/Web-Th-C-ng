"use strict";

//Lấy ra Dom element
const calculateBMI = document.getElementById("calculateBMI-btn");
const showHealthyPet = document.getElementById("healthy-btn");
const submitBtn = document.getElementById("submit-btn");
const idInput = document.getElementById("input-id");
const nameInput = document.getElementById("input-name");
const ageInput = document.getElementById("input-age");
const typeInput = document.getElementById("input-type");
const weightInput = document.getElementById("input-weight");
const lengthInput = document.getElementById("input-length");
const colorInput = document.getElementById("input-color-1");
const breedInput = document.getElementById("input-breed");
const vaccinatedInput = document.getElementById("input-vaccinated");
const dewormedInput = document.getElementById("input-dewormed");
const sterilizedInput = document.getElementById("input-sterilized");
const tableBodyEl = document.getElementById("tbody");
const findbtn = document.getElementById("find-btn");

// Bắt sự kiện nút Find
findbtn.addEventListener("click", function () {
  let petArrFind = petArr;
  // Tìm theo Id
  if (idInput.value)
    petArrFind = petArrFind.filter((pet) => pet.id.includes(idInput.value));
  // Tìm theo Name

  if (nameInput.value)
    petArrFind = petArrFind.filter((pet) =>
      pet.petName.includes(nameInput.value)
    );
  // Tìm theo type
  if (typeInput.value !== "Select Type")
    petArrFind = petArrFind.filter((pet) => pet.type === typeInput.value);
  // Tìm theo breed

  if (breedInput.value !== "Select Breed")
    petArrFind = petArrFind.filter((pet) => pet.breed === breedInput.value);
  // Tìm theo vaccinated

  if (vaccinatedInput.checked === true)
    petArrFind = petArrFind.filter((pet) => pet.vaccinated === true);
  // Tìm theo dewormed

  if (dewormedInput.checked === true)
    petArrFind = petArrFind.filter((pet) => pet.dewormed === true);
  // Tìm theo sterilized

  if (sterilizedInput.checked === true)
    petArrFind = petArrFind.filter((pet) => pet.sterilized === true);

  renderTableData(petArrFind);
});

// Hàm display full Breed
renderBreed();
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  breedArr.forEach(function (el) {
    const option = document.createElement("option");
    option.innerHTML = `${el.breed}`;
    breedInput.appendChild(option);
  });
}

renderTableData(petArr);
// Hàm hiển thị thứ cưng
function renderTableData(petArr) {
  tableBodyEl.innerHTML = "";
  for (let i = 0; i < petArr.length; i++) {
    const row = document.createElement("tr");
    row.innerHTML = `	
    <th scope="row">${petArr[i].id}</th>
    <td>${petArr[i].petName}</td>
    <td>${petArr[i].age}</td>
    <td>${petArr[i].type}</td>
    <td>${petArr[i].weight} kg</td>
    <td>${petArr[i].length} cm</td>
    <td>${petArr[i].breed}</td>
    <td>
      <i class="bi bi-square-fill" style="color: ${petArr[i].color}"></i>
    </td>
    <td><i class="bi ${
      petArr[i].vaccinated ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].dewormed ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
    <td><i class="bi ${
      petArr[i].sterilized ? "bi-check-circle-fill" : "bi-x-circle-fill"
    }"></i></td>
   
    <td>${new Date(petArr[i].date).getDate()}/${
      new Date(petArr[i].date).getMonth() + 1
    }/${new Date(petArr[i].date).getFullYear()}</td> 
   
    `;
    tableBodyEl.appendChild(row);
  }
}
