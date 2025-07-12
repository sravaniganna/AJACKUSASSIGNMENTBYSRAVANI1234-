let employees = [];
let editingIndex = null;

document.addEventListener("DOMContentLoaded", () => {
  const app = document.getElementById("app");
  fetch('./public/data/employees.json')
    .then(res => res.json())
    .then(data => {
      employees = data;
      renderDashboard(app);
    });
});

function renderDashboard(container) {
  container.innerHTML = `
    <header>
      <h1>Employee Directory</h1>
      <button onclick="renderForm()">Add Employee</button>
    </header>
    <div class="container" id="employee-list"></div>
  `;
  renderEmployeeList();
}

function renderEmployeeList() {
  const list = document.getElementById("employee-list");
  list.innerHTML = "";

  employees.forEach((emp, idx) => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <div>
        <p><strong>${emp.firstName} ${emp.lastName}</strong></p>
        <p>Email: ${emp.email}</p>
        <p>Department: ${emp.department} | Role: ${emp.role}</p>
      </div>
      <div class="card-buttons">
        <button onclick="editEmployee(${idx})">Edit</button>
        <button onclick="deleteEmployee(${idx})">Delete</button>
      </div>
    `;
    list.appendChild(div);
  });
}

function renderForm(emp = {}) {
  const container = document.getElementById("app");
  container.innerHTML = `
    <header><h1>${editingIndex !== null ? "Edit" : "Add"} Employee</h1></header>
    <div class="container">
      <form onsubmit="saveEmployee(event)">
        <input type="text" name="firstName" placeholder="First Name" value="${emp.firstName || ""}" required />
        <input type="text" name="lastName" placeholder="Last Name" value="${emp.lastName || ""}" required />
        <input type="email" name="email" placeholder="Email" value="${emp.email || ""}" required />
        <input type="text" name="department" placeholder="Department" value="${emp.department || ""}" required />
        <input type="text" name="role" placeholder="Role" value="${emp.role || ""}" required />
        <button type="submit">Save</button>
        <button type="button" onclick="cancelEdit()">Cancel</button>
      </form>
    </div>
  `;
}

function saveEmployee(event) {
  event.preventDefault();
  const form = event.target;
  const newEmployee = {
    firstName: form.firstName.value.trim(),
    lastName: form.lastName.value.trim(),
    email: form.email.value.trim(),
    department: form.department.value.trim(),
    role: form.role.value.trim(),
  };

  if (!validateEmail(newEmployee.email)) {
    alert("Invalid email format");
    return;
  }

  if (editingIndex !== null) {
    employees[editingIndex] = newEmployee;
    editingIndex = null;
  } else {
    employees.push(newEmployee);
  }

  renderDashboard(document.getElementById("app"));
}

function editEmployee(index) {
  editingIndex = index;
  renderForm(employees[index]);
}

function deleteEmployee(index) {
  if (confirm("Are you sure you want to delete this employee?")) {
    employees.splice(index, 1);
    renderEmployeeList();
  }
}

function cancelEdit() {
  editingIndex = null;
  renderDashboard(document.getElementById("app"));
}

function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}
