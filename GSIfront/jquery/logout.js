function logout(){
    $.ajax({
        url: '../GSIback/logout.php',
        data: "",
        method: 'post',
        dataType: 'json',
        success: function(data){
            alert('Logout successful');
            window.location.href = "index.html";
        }
    })
}
