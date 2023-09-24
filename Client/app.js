const employeeBtn = document.querySelector('.employee-btn');
const adminBtn = document.querySelector('.admin-btn');
const startContainer = document.querySelector('.start-container');
const loginContainer = document.querySelector('.login-container');
const emailInput = document.getElementById('inputEmail');
const passwordInput = document.getElementById('inputPassword');
const loginBtn = document.querySelector('.login-btn');

let url = 'http://localhost:2222/user/login';

adminBtn.addEventListener('click',()=>{
    startContainer.style.display = 'none';
    loginContainer.style.display = 'block';
});

employeeBtn.addEventListener('click',()=>{
    startContainer.style.display = 'none';
    loginContainer.style.display = 'block';
    url = 'http://localhost:2222/user/employeeLogin';
});

loginBtn.addEventListener('click',async(e)=>{
    e.preventDefault();
    const email = emailInput.value;
    const password = passwordInput.value;

    const body = {email : email,password: password};

    const res = await fetch(url,{
        method: 'POST',
        body: JSON.stringify(body),
        headers: {
            'Content-type': 'application/json'
        }
    });
    const resData = await res.json();
    if(resData.Status === 'Error'){
        alert(resData.Error+ ' Try Again');
    }
    window.location.href = '/Client/dashboard.html';
})