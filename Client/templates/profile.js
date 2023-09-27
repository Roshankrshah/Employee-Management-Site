const fetchAdminDetails = async(id)=>{
    console.log('admin');
    const res = await fetch(`http://localhost:2222/user/admin/${id}`,{
        credentials: 'include'
    });
    const resData = await res.json();
    console.log(resData);

    document.querySelector('.profile-image').src = resData.Result[0].photo;
    document.querySelector('.user-details').innerHTML = `
        <p><strong>Name: ${resData.Result[0].username}</strong> </p>
        <p><strong>Email: ${resData.Result[0].email}</strong></p>
        `
}

export default fetchAdminDetails;