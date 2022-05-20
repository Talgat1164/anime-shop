const name = document.getElementById('name');
const email = document.getElementById('email');
const country = document.getElementById('country');
const passwordInput = document.getElementById('password');
const btn = document.getElementById('btn');

btn.addEventListener('click', function (){
    if(name.value.length == 0 || email.value.length == 0 || country.value.length == 0 || passwordInput.value.length == 0)
    {
        alert('One or more of fields are empty!');
        $('#form').submit(function (){
            return false;
        });
    }
    else{
        if(passwordInput.value.length >= 8 && passwordInput.value.match(/[A-Z]/) && passwordInput.value.match(/[a-z]/) && passwordInput.value.match(/[!\@\#\$\%\^\&]/) && passwordInput.value.match(/[0-9]/)){
            alert('Success!');
            $('#form').submit(function (){
                return true;
            });
        }
        else{
            alert('Too short password!');
            $('#form').submit(function (){
                return false;
            });
        }
    }
});
