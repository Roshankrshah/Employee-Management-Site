const fetchEmployeeDetails = async()=>{
    const res = await fetch('http://localhost:2222/user/getEmployee',{
        credentials: 'include'
    });
    const resData = await res.json();

    const employeeTable = document.querySelector('.employee-table');

    resData.Result.forEach((employee)=>{
        const newRow = document.createElement('tr');
        const data = `
            <td>${employee.id}</td>
            <td>${employee.name}</td>
            <td>${employee.image}</td>
            <td>${employee.email}</td>
            <td>${employee.address}</td>
            <td>${employee.salary}</td>
            <td>
                <button class="edit-btn">Edit</button>
                <button class="delete-btn">Delete</button>
            </td>`;
        newRow.innerHTML = data;
        employeeTable.appendChild(newRow);
    });
}

export default fetchEmployeeDetails;