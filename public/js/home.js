

function getUserName(){
    const getUserbtn = document.querySelector('#registerUser');
    getUserbtn.addEventListener('click',()=>{
        const username = document.getElementById('username').value;
        console.log(username);
        if(username!= undefined && username!=null && username!= ''){
            checkDuplicateUser(username);
        }else{
            document.querySelector('#error1').innerHTML = '';
            document.querySelector('#error1').innerHTML = 'Username cannot be empty';
        }
    })
}

async function checkDuplicateUser(username){
    console.log("Call api",username);
    const res = await fetch(`/GetSingleUserInformation/${username}`);
    const data = await res.json();
    console.log(data);
    if(data.success!=true){
        console.log("Proceed");
        addNewUser(username);
    }else{
        console.log("Username Exists");
        document.querySelector('#error1').innerHTML = '';
        document.querySelector('#error1').innerHTML = 'User Already Exists. Try Different Username';
    }
}

async function addNewUser(username){
    console.log("Add New User");
    axios.post('/AddUser', {
        name: username,
    })
     .then(function (response) {
            console.log(response.data);
            if(response.data.success === true) {
                console.log("User added");
               window.location.href = '/question1.html?userid='+username;
            }else{
                alert("Failed to Add User. Try Again Later");
            }
        })
        .catch(function (error) {
            console.log(error);
        });

}

getUserName();