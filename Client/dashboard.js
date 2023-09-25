const logoutBtn = document.querySelector('.logout-btn');

logoutBtn.addEventListener('click',async()=>{
    console.log(document.cookie)
    const res = await fetch('http://localhost:2222/user/logout',{
                credentials: 'include'
    });
    const resData = await res.json();
    if(resData.Status === 'Success'){
        alert('logout');
    }
});

const start = async()=>{
    const res = await fetch('http://localhost:2222/user/adminCount',{
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);
}

start();