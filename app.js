// JS FOR SIGN IN FORM
const signInForm = $("#signIn-form");
const usernameInput = $("#username");
const usernameDesc = $("#username-desc");
const passInput = $("#password");
const passDesc = $("#pass-desc");
let usernameStat = false;
let passStat = false;

usernameInput.focus(function () {
  usernameDesc.css("display", "flex");
});

usernameInput.change(function () {
  if (usernameInput.val().length > 5) {
    usernameDesc.css("display", "none");
    usernameStat = true;
  }
});

passInput.focus(function () {
  passDesc.css("display", "flex");
});

passInput.change(function () {
  if (passInput.val().length > 8) {
    passDesc.css("display", "none");
    passStat = true;
  }
});

signInForm.submit(function (e) {
  e.preventDefault();

  username = true;

  if (passStat && usernameStat) {
    window.location.href = "./main.html";
  } else {
    alert("Please check your Username and Password");
  }
});

// JS FOR SIGN UP FORM
const signUpForm = $("#signUp-form");
const createUsernameInp = $("#create-username");
const emailInput = $("#email");
const createPassInp = $("#create-password");
const reEnterPassInp = $("#re-password");
const belowCUsername = $("#below-c-username");
const belowPass = $("#below-pass");

let readyUser = false;
let readyPass = false;

createUsernameInp.focus(function () {
  belowCUsername.css("display", "inline-flex");
});

createUsernameInp.change(function () {
  if (createUsernameInp.val().length > 5) {
    belowCUsername.css("display", "none");
    readyUser = true;
  }
});

createPassInp.focus(function () {
  belowPass.css("display", "flex");
});

createPassInp.change(function () {
  if (createPassInp.val().length > 8) {
    belowPass.css("display", "none");
    readyPass = true;
  }
});

signUpForm.submit(function (e) {
  e.preventDefault();

  if (createPassInp.val() !== reEnterPassInp.val()) {
    alert("Check your password again!");
    return;
  }

  username = true;

  if (readyUser && readyPass && emailInput.val().length > 2) {
    window.location.href = "./main.html";
  } else {
    alert("please check again");
  }
});

// JS MOUSE MOVE
const forgotPassDesc = $("#forgot-pass-desc");
const forgotPassLink = $("#forgot-pass-link");

forgotPassLink.mousemove(function () {
  forgotPassDesc.css("display", "flex");
});

forgotPassLink.mouseleave(function () {
  forgotPassDesc.css("display", "none");
});

//JS FOR FORGOT PASSWORD
const warnLogo = $("#warning-logo");
const checkLogo = $("#check-logo");
const forgetPassForm = $("#forgot-pass-form");
const emailForgotPassInp = $("#email-forgot-pass");

forgetPassForm.submit(function (e) {
  e.preventDefault();

  if (emailForgotPassInp.val()) {
    warnLogo.css("display", "none");
    checkLogo.css("display", "block");
  } else {
    alert("Please input your email correctly!");
  }
});
