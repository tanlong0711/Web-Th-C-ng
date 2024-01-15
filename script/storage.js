"use strict";

// SideBar Animation

const nav = document.querySelector("#sidebar");

nav.addEventListener("click", function (e) {
  nav.classList.toggle("active");
});

// Lay du lieu Pet

const petArr = getFromStorage("petArr", "[]");

// Lấy dữ liệu Breed

const breedArr = getFromStorage("breedArr", "[]");

// Hàm lưu vào localStorage
function saveToStorage(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

// Hàm lấy dữ liệu từ localStorage
function getFromStorage(key, defaultVal) {
  return JSON.parse(localStorage.getItem(key) ?? defaultVal);
}
