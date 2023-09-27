const fetchEmployeeDetails = async () => {
    const res = await fetch('http://localhost:2222/user/getEmployee', {
        credentials: 'include'
    });
    const resData = await res.json();

    let employeeTable = document.querySelector('.employee-table');

    resData.Result.forEach((employee) => {
        const newRow = document.createElement('tr');
        const data = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>
                <img src="../Server/public/images/${employee.image}" alt="not available" class="dp-image">    
            </td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="edit-btn" data-id="${employee.id}" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                <button class="delete-btn" data-id="${employee.id}">Delete</button>
            </td>`;
        newRow.innerHTML = data;
        employeeTable.appendChild(newRow);
    });

    const createNewEmployee = document.querySelector('.create-btn');
    createNewEmployee.addEventListener('click', async (e) => {
        e.preventDefault();
        const id = document.querySelector('#inputId').value;
        const name = document.querySelector('#inputName').value;
        const email = document.querySelector('#inputEmail').value;
        const password = document.querySelector('#inputPassword').value;
        const salary = document.querySelector('#inputSalary').value;
        const address = document.querySelector('#inputAddress').value;
        const image = document.getElementById('formFile');

        const imageFile = image.files[0];
        const formData = new FormData();
        formData.append('image', imageFile);
        formData.append('id', id);
        formData.append('name', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('salary', salary);
        formData.append('address', address);

        try {
            const res = await fetch('http://localhost:2222/user/create', {
                method: 'POST',
                body: formData,
                credentials: 'include'
            });
        } catch (error) {
            confirm('New Employee Added');
            location.href = '/Client/dashboard.html';
        }

    });

    const deleteBtns = document.querySelectorAll('.delete-btn');
    deleteBtns.forEach((deleteBtn) => {
        deleteBtn.addEventListener('click', async (e) => {
            const res = await fetch(`http://localhost:2222/user/delete/${e.target.dataset.id}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            const resData = await res.json();
            if (resData.Error) {
                alert('Error Occurred');
            }
            alert('Employee Removed');
        })
    });

    const editBtns = document.querySelectorAll('.edit-btn');
    editBtns.forEach((editBtn) => {
        editBtn.addEventListener('click', async (e) => {
            console.log('edit ', e.target.dataset.id);
            const res = await fetch(`http://localhost:2222/user/getSingleEmployee/${e.target.dataset.id}`, {
                method: 'GET',
                credentials: 'include'
            });
            const resData = await res.json();
            console.log(resData);

            document.getElementById('editId').value = resData.Result[0].id;
            document.getElementById('editName').value = resData.Result[0].name;
            document.getElementById('editEmail').value = resData.Result[0].email;
            document.getElementById('editSalary').value = resData.Result[0].salary;
        })
    });


    const updateEmployee = document.querySelector('.update-btn');
    updateEmployee.addEventListener('click', async (e) => {
        e.preventDefault();
        const salary = parseInt(document.querySelector('#editSalary').value);

        const id = document.querySelector('#editId').value;

        const body = {
            salary: salary
        }
        const res = await fetch(`http://localhost:2222/user/update/${id}`, {
            method: 'PATCH',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        });

        const resData = await res.json();
        console.log(resData);
        if(resData.Error){
            alert('Error Occurred');
        }else{
            confirm('Employee Details Updated');
        }
    });

}

export default fetchEmployeeDetails;