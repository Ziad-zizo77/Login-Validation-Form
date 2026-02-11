// Select Elements
const form = document.querySelector("form");
const fName = document.querySelector("#fname");
const lName = document.querySelector("#lname");
const phone = document.querySelector("#phone");
const date = document.querySelector("#date");
const email = document.querySelector("#email");
const pass = document.querySelector("#pass");
const cPass = document.querySelector("#cpass");
const inputs = document.querySelectorAll("input");

// Event Listener
form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

// validation on input
inputs.forEach((input) => {
  input.addEventListener("input", () => {
    validateField(input);
  });
});

// Functions
function validateField(field) {
  const fieldValue = field.value.trim();
  switch (field.id) {
    case "fname":
      validateFirstName(fieldValue);
      break;
    case "lname":
      validateLastName(fieldValue);
      break;
    case "phone":
      validatePhone(fieldValue);
      break;
    case "date":
      validateDate(fieldValue);
      break;
    case "email":
      validateEmail(fieldValue);
      break;
    case "pass":
      validatePassword(fieldValue);
      break;
    case "cpass":
      validateConfirmPassword(fieldValue);
      break;
  }
}

function checkInputs() {
  const fNameValue = fName.value.trim();
  const lNameValue = lName.value.trim();
  const phoneValue = phone.value.trim();
  const dateValue = date.value.trim();
  const emailValue = email.value.trim();
  const passValue = pass.value.trim();
  const cPassValue = cPass.value.trim();

  // Validate all fields
  const isFirstNameValid = validateFirstName(fNameValue);
  const isLastNameValid = validateLastName(lNameValue);
  const isPhoneValid = validatePhone(phoneValue);
  const isDateValid = validateDate(dateValue);
  const isEmailValid = validateEmail(emailValue);
  const isPasswordValid = validatePassword(passValue);
  const isConfirmPasswordValid = validateConfirmPassword(cPassValue);

  // Check if all validations passed
  if (
    isFirstNameValid &&
    isLastNameValid &&
    isPhoneValid &&
    isDateValid &&
    isEmailValid &&
    isPasswordValid &&
    isConfirmPasswordValid
  ) {
    Swal.fire({
      title: "Form Submitted!",
      icon: "success",
      confirmButtonText: "OK",
    });
    // i want to go to this site after user click OK
    setTimeout(() => {
      window.location.href = "https://ziad-zizo77.github.io/personal-portfolio/";
    }, 2*1000);
  }
}

function validateFirstName(value) {
  clearMessages(fName);
  let isValid = true;

  // Check if starts with capital letter
  if (!/^[A-Z]/.test(value)) {
    addError(fName, "firstname must start with capital letter");
    isValid = false;
  }

  // Check if only letters
  if (!/^[A-Za-z]+$/.test(value)) {
    addError(fName, "only letters");
    isValid = false;
  }

  // Check if no spaces
  if (/\s/.test(value)) {
    addError(fName, "have no space");
    isValid = false;
  }

  // Check if more than 2 letters
  if (value.length <= 2) {
    addError(fName, "more than 2 letters");
    isValid = false;
  }

  if (isValid) {
    addSuccess(fName, "valid name");
  }

  return isValid;
}

function validateLastName(value) {
  clearMessages(lName);
  let isValid = true;

  // Check if starts with capital letter
  if (!/^[A-Z]/.test(value)) {
    addError(lName, "lastname must start with capital letter");
    isValid = false;
  }

  // Check if only letters
  if (!/^[A-Za-z]+$/.test(value)) {
    addError(lName, "only letters");
    isValid = false;
  }

  // Check if no spaces
  if (/\s/.test(value)) {
    addError(lName, "have no space");
    isValid = false;
  }

  // Check if more than 2 letters
  if (value.length <= 2) {
    addError(lName, "more than 2 letters");
    isValid = false;
  }

  if (isValid) {
    addSuccess(lName, "valid name");
  }

  return isValid;
}

function validatePhone(value) {
  clearMessages(phone);
  let isValid = true;

  // Check if starts with 010, 011, 015, or 012
  if (!/^(010|011|015|012)/.test(value)) {
    addError(phone, "phone number must start with 010 or 011 or 015 or 012");
    isValid = false;
  }

  // Check only Numbers
  if (!/^\d+$/.test(value)) {
    addError(phone, "only numbers");
    isValid = false;
  }
  // Check if only 11 digits
  if (!/^\d+$/.test(value) || value.length !== 11) {
    addError(phone, "only 11 digit");
    isValid = false;
  }

  // Check if no spaces
  if (/\s/.test(value)) {
    addError(phone, "have no space");
    isValid = false;
  }

  if (isValid) {
    addSuccess(phone, "valid phone number");
  }

  return isValid;
}

function validateDate(value) {
  clearMessages(date);
  let isValid = true;

  // Check format yyyy/mm/dd
  if (!/^\d{4}\/\d{2}\/\d{2}$/.test(value)) {
    addError(date, "birthdate must be with this form yyyy/mm/dd");
    isValid = false;
  } else {
    // Additional validation for valid date
    const parts = value.split("/");
    const year = parseInt(parts[0]);
    const month = parseInt(parts[1]);
    const day = parseInt(parts[2]);

    if (month < 1 || month > 12 || day < 1 || day > 31) {
      addError(date, "birthdate must be with this form yyyy/mm/dd");
      isValid = false;
    }
  }

  if (isValid) {
    addSuccess(date, "valid birthdate");
  }

  return isValid;
}

function validateEmail(value) {
  clearMessages(email);
  let isValid = true;

  // Check if starts with lowercase letter
  if (!/^[a-z]/.test(value)) {
    addError(email, "email must start with small letter");
    isValid = false;
  }

  // Check if contains only letters, numbers, and special characters
  if (!/^[a-z0-9@._-]+$/.test(value)) {
    addError(email, "have only letter,numbers and special chars like(@.-_)");
    isValid = false;
  }

  // Check if no spaces
  if (/\s/.test(value)) {
    addError(email, "have no space");
    isValid = false;
  }

  // Basic email format check
  if (!/@/.test(value) || !value.includes(".")) {
    if (isValid) {
      addError(email, "invalid email format");
      isValid = false;
    }
  }

  if (isValid) {
    addSuccess(email, "valid email");
  }

  return isValid;
}

function validatePassword(value) {
  clearMessages(pass);
  let isValid = true;

  // Check if contains at least 8 characters with letters and digits
  if (value.length < 8 || !/[A-Za-z]/.test(value) || !/\d/.test(value)) {
    addError(pass, "password must include 8 characters letters and digits");
    isValid = false;
  }

  // Check if no spaces
  if (/\s/.test(value)) {
    addError(pass, "have no space");
    isValid = false;
  }

  if (isValid) {
    addSuccess(pass, "valid password");
  }

  // Revalidate confirm password if it has value
  if (cPass.value.trim() !== "") {
    validateConfirmPassword(cPass.value.trim());
  }

  return isValid;
}

function validateConfirmPassword(value) {
  clearMessages(cPass);
  let isValid = true;

  // Check if passwords match
  if (value !== pass.value.trim()) {
    addError(cPass, "passwords do not match");
    isValid = false;
  }

  if (isValid && value !== "") {
    addSuccess(cPass, "password confirmed");
  }

  return isValid;
}

function addError(input, message) {
  const displayElement = input.parentElement.querySelector(".display");
  const li = document.createElement("li");
  li.classList.add("msg", "error");
  li.innerHTML = `<i class="fa fa-times-circle"></i> ${message}`;
  displayElement.appendChild(li);
}

function addSuccess(input, message) {
  const displayElement = input.parentElement.querySelector(".display");
  const li = document.createElement("li");
  li.classList.add("msg", "success");
  li.innerHTML = `<i class="fa fa-check-circle"></i> ${message}`;
  displayElement.appendChild(li);
}

function clearMessages(input) {
  const displayElement = input.parentElement.querySelector(".display");
  displayElement.innerHTML = "";
}
