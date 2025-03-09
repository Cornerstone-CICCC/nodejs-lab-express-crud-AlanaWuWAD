let employeeId = null

const searchForm = document.querySelector('#search')

searchForm.addEventListener('submit',(e)=>{
  e.preventDefault()
  const searchInput = document.querySelector('#search-input')

  searchEmployees(searchInput.value)

})

const addForm = document.querySelector('#add-form')
addForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const addFname = document.querySelector('#add-firstname')
  const addLname = document.querySelector('#add-lastname')
  const addAge = document.querySelector('#add-age')
  const addMarried = document.querySelector('#add-married')

  addEmployee(addFname.value, addLname.value, addAge.value, addMarried.checked)
})

const editForm = document.querySelector('#edit-form')
editForm.addEventListener('submit', (e) => {
  e.preventDefault()
  const editFname = document.querySelector('#edit-firstname')
  const editLname = document.querySelector('#edit-lastname')
  const editAge = document.querySelector('#edit-age')
  const editMarried = document.querySelector('#edit-married')

  editEmployee(editFname.value, editLname.value, editAge.value, editMarried.checked, employeeId) 
})

const getEmployees = async () => {
  const res = await fetch("http://localhost:4000/employee", {
    method: "GET"
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${res.statusText}`);
  }

  const data = await res.json();
  return data;
}

const getEmployeeInfo = async (id) => {
  const res = await fetch(`http://localhost:4000/employee/${id}`, {
    method: "GET"
  });

  if (!res.ok) {
    throw new Error(`Failed to get employee's info: ${res.statusText}`);
  }

  const data = await res.json();
  console.log(data);
  return data;
}

const searchEmployees = async (query) => {
  const res = await fetch(`http://localhost:4000/employee/search?firstname=${query}`, {
    method: "GET"
  });

  if (!res.ok) {
    throw new Error(`Failed to get employees: ${res.statusText}`);
  }

  const data = await res.json();
  render(data)
  return data;
}


const editEmployee = async (firstname, lastname, age, isMarried, id) => {
  const res = await fetch(`http://localhost:4000/employee/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to edit employee: ${res.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  render(data)
  return data;
};

const addEmployee = async (firstname, lastname, age, isMarried) => {
  const res = await fetch("http://localhost:4000/employee", {
    method: "POST",
    headers: {
      "Content-Type": "application/json", // When doing POST/PUT/PATCH, you need to set the Content-Type
    },
    body: JSON.stringify({ firstname, lastname, age, isMarried }),
  });

  if (!res.ok) {
    throw new Error(`Failed to add employee: ${res.statusText}`);
  }

  const data = await res.json(); // Returned employee data
  render()
  return data;
};

const deleteEmployee = async (id) => {
  const res = await fetch(`http://localhost:4000/employee/${id}`, {
    method: "DELETE",
  });

  if (!res.ok) {
    throw new Error(`Failed to edit employee: ${res.statusText}`);
  }

  render()
  return;
};

async function render(data) {
  if(!data){
    data = await getEmployees()
  }

  const list = document.querySelector('#list-employees')
  list.innerHTML =``
  data.forEach(employee => {
    const li = document.createElement('li')
    const viewBtn = document.createElement('button')
    viewBtn.innerHTML = 'VIEW'
    viewBtn.addEventListener('click', () => {
      viewInfo(employee.id)
    })
    const editBtn = document.createElement('button')
    editBtn.innerHTML = 'EDIT'
    const deleteBtn = document.createElement('button')
    deleteBtn.innerHTML = 'DELETE'
    li.innerHTML = `
      ${employee.firstname} ${employee.lastname} 
    `
    li.appendChild(viewBtn)
    li.appendChild(editBtn)
    li.appendChild(deleteBtn)
    list.appendChild(li)

    editBtn.addEventListener('click', ()=>{
      getEditInfo(employee.firstname, employee.lastname, employee.age, employee.isMarried)
      employeeId = employee.id 
      console.log(employeeId);
    })

    deleteBtn.addEventListener('click', ()=>{
      deleteEmployee(employee.id)
    })
  });
}

async function viewInfo(id) {
  const data = await getEmployeeInfo(id)
  const firsName = document.querySelector('#info-firstName')
  const lastName = document.querySelector('#info-lastName')
  const age = document.querySelector('#info-age')
  const married = document.querySelector('#info-married')

  firsName.innerHTML = `
  First name : ${data.firstname}
  `
  lastName.innerHTML = `
  Last name : ${data.lastname}
  `
  age.innerHTML = `
  Age : ${data.age}
  `
  married.innerHTML = `
  Married : ${data.isMarried ? 'Yes':'No'}
  `
} 

function getEditInfo(firsName, lastName, age, isMarried){
  const editFname = document.querySelector('#edit-firstname')
  const editLname = document.querySelector('#edit-lastname')
  const editAge = document.querySelector('#edit-age')
  const editMarried = document.querySelector('#edit-married')

  editFname.value = firsName
  editLname.value = lastName
  editAge.value = age
  editMarried.checked = isMarried
}

render()
