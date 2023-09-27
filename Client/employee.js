const logoutBtn = document.querySelector('.logout-emp-btn');

logoutBtn.addEventListener('click', async () => {
    const res = await fetch('http://localhost:2222/user/logout', {
        credentials: 'include'
    });
    const resData = await res.json();
    if (resData.Status === 'Success') {
        alert('logout');
        location.href = '/Client/index.html';
    }
});

const start = async () => {
    const id = location.href.split('?')[1].split('=')[1];

    const res = await fetch(`http://localhost:2222/user//getSingleEmployee/${id}`, {
        credentials: 'include'
    });

    const resData = await res.json();
    console.log(resData);
    document.getElementById('editId').value = resData.Result[0].id;
    document.getElementById('editName').value = resData.Result[0].name;
    document.getElementById('editEmail').value = resData.Result[0].email;
    document.getElementById('editPassword').value = resData.Result[0].password;
    document.getElementById('editSalary').value = resData.Result[0].salary;
    document.getElementById('editAddress').value = resData.Result[0].address;
}

start();