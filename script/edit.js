"use strict";
const tableBodyEl = document.getElementById("tbody");
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
const containerForm = document.getElementById("container-form");

// Bắt sự kiện nút Submit
submitBtn.addEventListener("click", function () {
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
    //date: new Date(),
  };
  const validate = validateData(data);
  if (validate) {
    const index = petArr.findIndex((el) => el.id === data.id);
    data.date = petArr[index].date;
    petArr[index] = data;
    saveToStorage("petArr", petArr);
    renderTableData(petArr);
    containerForm.classList.add("hide");
  }
});

renderTableData(petArr);

// Hàm lấy dữ liệu thú cưng cũ
function startEditPet(petId) {
  // Hiển thị form Edit
  containerForm.classList.remove("hide");

  // Tìm thông tin thú cưng cần edit trong petArr
  const pet = petArr.find((el) => el.id === petId);
  // Hiển thị thông tin lên form của thú cưng hiện tại
  idInput.value = petId;
  nameInput.value = pet.petName;
  ageInput.value = pet.age;
  typeInput.value = pet.type;
  weightInput.value = pet.weight;
  lengthInput.value = pet.length;
  colorInput.value = pet.color;
  vaccinatedInput.checked = pet.vaccinated;
  dewormedInput.checked = pet.dewormed;
  sterilizedInput.checked = pet.sterilized;
  renderBreed();
  breedInput.value = pet.breed;
}

typeInput.addEventListener("change", renderBreed);
// Hàm renderBreed
function renderBreed() {
  breedInput.innerHTML = "<option>Select Breed</option>";
  if (typeInput.value === "Dog") {
    const breedDogs = breedArr.filter((el) => el.type === "Dog");
    breedDogs.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      breedInput.appendChild(option);
    });
  }
  if (typeInput.value === "Cat") {
    const breedCats = breedArr.filter((el) => el.type === "Cat");
    breedCats.forEach(function (el) {
      const option = document.createElement("option");
      option.innerHTML = `${el.breed}`;
      breedInput.appendChild(option);
    });
  }
}

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
    <td><button type="button" class="btn btn-warning" onclick="startEditPet('${
      petArr[i].id
    }')">Edit</button>
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
