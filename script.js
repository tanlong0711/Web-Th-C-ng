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

// Bắt sự kiện phân loại Breed theo type
typeInput.addEventListener("change", renderBreed);

// Hàm Lọc breed theo type

function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  // Xử lí khi đang ở type Dog
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((el) => el.type === "Dog");
    breedDogs.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      breedInput.appendChild(option);
    });
  }
    // Xử lí khi đang ở type Cat

  if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((el) => el.type === "Cat");
    breedCats.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      breedInput.appendChild(option);
    });
  }
}

// Bắt sự kiện nút nhấn Submit

submitBtn.addEventListener("click", function () {
  // 1. Lấy data người nhập từ form

  const data = {
    id: idInput.value,
    petName: nameInput.value,
    age: parseInt(ageInput.value),
    type: typeInput.value,
    weight: parseInt(weightInput.value),
    length: parseInt(lengthInput.value),
    color: colorInput.value,
    breed: breedInput.value,
    vaccinated: vaccinatedInput.checked,
    dewormed: dewormedInput.checked,
    sterilized: sterilizedInput.checked,
    date: new Date(),
  };

  // 2. Validate data

  const validate = validateData(data);

  if (validate) {
    // 3. Thêm thú cưng vào Arr
    petArr.push(data);

    saveToStorage("petArr", petArr);
    // 4. Hiển thị danh sách thú cưng

    renderTableData(petArr);

    // 5. Xóa dữ liệu trên form

    clearInput();
  }
});

// Bắt sự kiện nút nhấn Show

let healthyCheck = false;
showHealthyPet.addEventListener("click", function () {
  const healthyPetArr = [];
  for (let i = 0; i < petArr.length; i++) {
    if (
      petArr[i].vaccinated === true &&
      petArr[i].dewormed === true &&
      petArr[i].sterilized === true
    ) {
      healthyPetArr.push(petArr[i]);
    }
  }
  if (healthyCheck) {
    renderTableData(petArr);
    showHealthyPet.textContent = "Show Healthy Pet ";
    healthyCheck = false;
  } else {
    renderTableData(healthyPetArr);
    showHealthyPet.textContent = "Show All Pet";
    healthyCheck = true;
  }
});

// Hàm xóa danh sách thú cưng

function deletePet(petId) {
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    function checkid(x) {
      return x.id === petId;
    }
    petArr.splice(petArr.findIndex(checkid), 1);
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    showHealthyPet.textContent = "Show Healthy Pet ";
    healthyCheck = false;
  }
}

// Hàm xóa dữ liệu trên form

function clearInput() {
  idInput.value = "";
  typeInput.value = "Select Type";
  vaccinatedInput.checked = false;
  sterilizedInput.checked = false;
  dewormedInput.checked = false;
  breedInput.value = "Select Breed";
  colorInput.value = "#000000";
  lengthInput.value = "";
  weightInput.value = "";
  nameInput.value = "";
  ageInput.value = "";
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
    <td><button type="button" class="btn btn-danger" onclick="deletePet('${
      petArr[i].id
    }')">Delete</button>
    </td>
    `;
    tableBodyEl.appendChild(row);
  }
}

// Hàm check Form
function validateData(data) {
  // Không Input nào bỏ trống
  if (data.id.trim() === "") {
    alert("Please input for ID");
    return false;
  } // Input ID không trùng với các ID pet trước đó
  for (let i = 0; i < petArr.length; i++) {
    if (data.id === petArr[i].id) {
      alert("ID must be unique!");
      return false;
    }
  }
  if (data.petName.trim() === "") {
    alert("Please input for PetName");
    return false;
  }
  if (isNaN(data.age)) {
    alert("Please input for Age");
    return false;
  }
  if (isNaN(data.length)) {
    alert("Please input for Length");
    return false;
  }
  if (isNaN(data.weight)) {
    alert("Please input for Weight");
    return false;
  }
  //Bắt buộc phải chọn giá trị cho trường Type
  if (data.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  //Bắt buộc phải chọn giá trị cho trường Breed
  if (data.breed === "Select Breed") {
    alert("Please select Breed!");
    return false;
  }

  //Age từ 1 đến 15
  if (data.age < 1 || data.age > 15) {
    alert("Age must be between 1 and 15!");
    return false;
  }
  //Weight từ 1 đến 15
  if (data.weight < 1 || data.weight > 15) {
    alert("Weight must be between 1 and 15!");
    return false;
  }
  // Length từ 1 đến 100
  if (data.length < 1 || data.length > 100) {
    alert("Length must be between 1 and 100!");
    return false;
  }
  return true;
}
