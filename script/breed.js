"use strict";

const tableBodyEl = document.getElementById("tbody");
const inputBreed = document.getElementById("input-breed");
const inputType = document.getElementById("input-type");
const submitBreed = document.getElementById("submit-btn");

// Bat su kien Submit
submitBreed.addEventListener("click", function () {
  // Lay gia tri input
  const breed = {
    breed: inputBreed.value,
    type: inputType.value,
  };

  // 2. Validate data

  const validate = validateData(breed);

  if (validate) {
    // 3. Thêm thú cưng vào Arr
    breedArr.push(breed);

    saveToStorage("breedArr", breedArr);
    // 4. Hiển thị danh sách thú cưng

    renderBreedTable(breedArr);

    // 5. Xóa dữ liệu trên form

    clearInput();
  }
});

// Ham hien thi Breed
renderBreedTable(breedArr);
function renderBreedTable(breedArr) {
  tableBodyEl.innerHTML = "";

  breedArr.forEach((el, i) => {
    const row = document.createElement("tr");
    row.innerHTML = `	
  <th scope="row">${i + 1}</th>
  <td>${el.breed}</td>
  <td>${el.type}</td>
  <td><button type="button" class="btn btn-danger" onclick="deleteBreed(${
    i + 1
  })">Delete</button>
  </td>
  `;
    tableBodyEl.appendChild(row);
  });
}

// Hàm xóa danh sách thú cưng

function deleteBreed(breedId) {
  console.log(breedId);
  // Confirm before deletePet
  if (confirm("Are you sure?")) {
    function checkid(x, i) {
      return i + 1 === breedId;
    }
    breedArr.splice(breedArr.findIndex(checkid), 1);
    saveToStorage("breedArr", breedArr);
    renderBreedTable(breedArr);
  }
}

// Hàm xóa dữ liệu trên form

function clearInput() {
  inputBreed.value = "";
  inputType.value = "Select Type";
}

// Hàm check Form
function validateData(breed) {
  // Không Input nào bỏ trống
  if (breed.breed.trim() === "") {
    alert("Please input for Breed");
    return false;
  } //Bắt buộc phải chọn giá trị cho trường Type
  if (breed.type === "Select Type") {
    alert("Please select Type!");
    return false;
  }
  return true;
}
