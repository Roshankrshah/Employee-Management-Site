const fetchDashboard = async () => {
    const admin = await fetch('http://localhost:2222/user/adminCount', {
        credentials: 'include'
    });
    const adminData = await admin.json();
    console.log(adminData);

    document.querySelector('.first-box').innerHTML = `Total: ${adminData[0].admin}`;

    const employee = await fetch('http://localhost:2222/user/employeeCount', {
        credentials: 'include'
    });
    const employeeData = await employee.json();
    console.log(employeeData);

    document.querySelector('.second-box').innerHTML = `Total: ${employeeData[0].employee}`;

    const salary = await fetch('http://localhost:2222/user/salarySum', {
        credentials: 'include'
    });
    const salaryData = await salary.json();
    console.log(salaryData);
    document.querySelector('.third-box').innerHTML = `Total: ${salaryData[0].sumOfSalary}`;
};

export default fetchDashboard;