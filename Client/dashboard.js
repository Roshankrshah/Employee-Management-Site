const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click',async()=>{
    console.log(document.cookie)
    const res = await fetch('http://localhost:2222/user/logout');
    const resData = await res.json();
    if(resData.Status === 'Success'){
        alert('logout');
    }
});