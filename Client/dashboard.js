const logoutBtn = document.querySelector('.logout-btn');
const linkContainer = document.querySelector('.links');
const links = document.querySelectorAll('li');

import fetchDashboard from './templates/index.js';
import fetchEmployeeDetails from './templates/manage.js';

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

linkContainer.addEventListener('click', (e) => {
    links.forEach((link) => {
        link.classList.remove('active');
    });
    e.target.parentElement.classList.add('active');
    const routeJs = e.target.textContent;

    if (routeJs === 'DashBoard') {
        fetchDashboard();
    }
    if (routeJs === 'Manage Employees') {
        fetchEmployeeDetails();
    }
    if (routeJs === 'Profile') {

    }
});

fetchDashboard();
