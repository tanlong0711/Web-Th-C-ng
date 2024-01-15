"use strict";

const btnExport = document.getElementById("export-btn");
const btnImport = document.getElementById("import-btn");
const fileInput = document.getElementById("input-file");

/////////////////////////////////////////////////////////////////////
///////////////////////////// Export ///////////////////////////////

//  Bắt sự kiện Export
btnExport.addEventListener("click", function () {
  const isExport = confirm("You want to export this file ?");
  if (isExport) {
    // Hàm lưu data về file
    saveStatiDataToFile();
  }
});

// Hàm lưu data về file
function saveStatiDataToFile() {
  const blob = new Blob([JSON.stringify(getFromStorage("petArr"), null, 2)], {
    type: "application/json",
  });

  saveAs(blob, "petData.json");
}

/////////////////////////////////////////////////////////////////////
///////////////////////////// Import ///////////////////////////////

// Bắt sự kiện nút Import
btnImport.addEventListener("click", function () {
  // Check đã chọn file chưa
  if (!fileInput.value) {
    alert("Choose your import file !");
  } else {
    const isImport = confirm("Are you sure to import this file ?");
    if (isImport) {
      const file = fileInput.files[0];

      const reader = new FileReader();

      reader.addEventListener(
        "load",
        function () {
          // Check xem file thỏa điều kiện không
          const isValidateFile = checkFile(JSON.parse(reader.result));
          if (isValidateFile) {
            saveToStorage("petArr", JSON.parse(reader.result));
            alert("Succes to import");
          }
        },
        false
      );
      if (file) {
        reader.readAsText(file);
      }
      fileInput.value = "";
    }
  }
});

function checkFile(data) {
  // File phải là mảng
  if (!data instanceof Array) {
    alert(`File không hợp lệ!1`);
    return false;
  }
  // File phải có các dạng object đúng với object đề bài
  if (!isPetObject(data)) {
    return false;
  }
  return true;
}

function isPetObject(data) {
  if (!data.every((item) => item instanceof Object)) {
    alert(`File không hợp lệ!2`);
    return false;
  }
  const isOk = data.every((item) => {
    return (
      Object.keys(item).length === 12 &&
      item.hasOwnProperty("id") &&
      item.hasOwnProperty("petName") &&
      item.hasOwnProperty("age") &&
      item.hasOwnProperty("type") &&
      item.hasOwnProperty("weight") &&
      item.hasOwnProperty("length") &&
      item.hasOwnProperty("color") &&
      item.hasOwnProperty("breed") &&
      item.hasOwnProperty("vaccinated") &&
      item.hasOwnProperty("dewormed") &&
      item.hasOwnProperty("sterilized") &&
      item.hasOwnProperty("date")
    );
  });
  if (!isOk) {
    alert(`File không hợp lệ!3`);
    return false;
  }
  return true;
}
