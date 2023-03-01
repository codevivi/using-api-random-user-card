"use strict";
const userImg = document.getElementById("user-img");
const userInfoDesc = document.querySelector(".user-info-description");
const userInfo = document.getElementById("user-info");
const userButtonsContainer = document.getElementById("user-buttons");
const infoButtons = document.querySelectorAll(`.user-card .sprite-btn`);
const getNewUserBtn = document.getElementById("get-new-btn");
let activeBtn = infoButtons[0];
getNewUserBtn.addEventListener("click", newUser);

getUserAndRenderCard();

function newUser() {
  resetCard();
  getUserAndRenderCard();
}

function getUserAndRenderCard() {
  fetch("https://randomuser.me/api/?inc=name,email,dob,location,phone,login,picture")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      let user = data.results[0];
      renderUserCard(user);
    })
    .catch((error) => {
      console.log(error);
    });
}
const getFromUser = {
  name: function (user) {
    return `${user.name.first}  ${user.name.last}`;
  },
  email: function (user) {
    return user.email;
  },
  birthday: function (user) {
    let date = new Date(user.dob.date);
    return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
  },
  address: function (user) {
    return `${user.location.street.number} ${user.location.street.name}`;
  },
  phone: function (user) {
    return user.phone;
  },
  password: function (user) {
    return user.login.password;
  },
  picture: function (user) {
    return user.picture.large;
  },
};

function resetCard() {
  getNewUserBtn.blur();
  userInfo.textContent = "...";
  userInfoDesc.textContent = "My name is";
  // userImg.src = "./assets/white-placeholder.png";
  // userImg.alt = "";
  activeBtn = activateBtn(infoButtons[0]);
}

function renderUserCard(user) {
  userImg.src = getFromUser.picture(user);
  userInfo.textContent = getFromUser.name(user);
  for (let i = 0; i < infoButtons.length; i++) {
    let btn = infoButtons[i];
    btn.setAttribute("data-output", getFromUser[btn.dataset.info](user));
    btn.setAttribute("onmouseenter", "changeInfo(event)");
  }
}

function changeInfo(e) {
  let btn = e.target;
  let output = btn.dataset.output;
  userInfo.textContent = output;
  userInfoDesc.textContent = e.target.dataset.desc;
  activeBtn = activateBtn(btn);
}

function activateBtn(btn) {
  if (activeBtn === btn) return activeBtn;
  activeBtn.classList.remove("active");
  btn.classList.add("active"); //pointer events none
  let activePos = window.getComputedStyle(activeBtn).getPropertyValue("background-position-y").slice(0, -1);
  let currentPos = window.getComputedStyle(btn).getPropertyValue("background-position-y").slice(0, -1);
  btn.style.backgroundPositionY = `${Number(currentPos) + 100}%`;
  activeBtn.style.backgroundPositionY = `${Number(activePos) - 100}%`;
  return btn;
}
