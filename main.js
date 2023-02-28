"use strict";
const userImg = document.getElementById("user-img");
const userInfo = document.getElementById("user-info");
const userButtonsContainer = document.getElementById("user-buttons");
getUser();

function getUser() {
  fetch("https://randomuser.me/api/?inc=name,email,dob,location,phone,login,picture")
    .then((res) => res.json())
    .then((data) => {
      let user = data.results[0];
      console.log(user);
      renderUserCard(user);
    })
    .catch((error) => {
      console.log(error);
    });
}
function renderUserCard(user) {
  userImg.src = getPicture(user);
  userInfo.textContent = getName(user);
}
function getName(user) {
  return `${user.name.first}  ${user.name.last}`;
}
function getEmail(user) {
  return user.email;
}
function getBirthday(user) {
  let date = new Date(user.dob.date);
  return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
}
function getAddress(user) {
  return `${user.location.street.number} ${user.location.street.name}`;
  ///need replacing street-st, road-rd, lane-ln, avenue-? , what is cd? Too many unknown variants to replace.
}
function getPhone(user) {
  return user.phone;
  /////needs formatting? butn country codes might be different length, numbers are different length..
}
function getPassword(user) {
  return user.login.password;
}
function getPicture(user) {
  return user.picture.medium;
}
