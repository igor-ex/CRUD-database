// const email = document.getElementById("mail");
//
// email.addEventListener("input", function (event) {
//     if (email.validity.typeMismatch) {
//         email.setCustomValidity("Email address must be like this: \"blala@blala\"");
//     } else {
//         email.setCustomValidity("");
//     }
// });

document.getElementsByTagName("form")[0].onsubmit = function() {
    var one = document.getElementsByName("password")[0].value,
        two = document.getElementsByName("password2")[0].value;
    var comp_flag = (one == two);
    if (!!comp_flag) {
        return true; // пароли совпадают
    } else {
        alert("Ошибка! Пароли не совпадают.");
        return false; // пароли не совпадают
    }
};