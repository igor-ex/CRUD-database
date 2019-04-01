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

const btnSingUp = document.getElementById("Sign up");
btnSingUp.addEventListener("click", saveLS);


const inputLs = document.querySelectorAll(".input-ls");

function saveLS() {
    dataUser = {
        loginUser: inputLs[0].value,
        emailUser: inputLs[1].value,
        passwordUser: inputLs[2].value,
    };

    // for (let i = 1; i < tableLS.rows.length; i++) {
    //     const id = tableLS.rows[i].cells[0].innerHTML;
    //     const firstName = tableLS.rows[i].cells[1].innerHTML;
    //     const lastName = tableLS.rows[i].cells[2].innerHTML;
    //     const age = tableLS.rows[i].cells[3].innerHTML;
    //     const curRow = new CurRow(id, firstName, lastName, age);
    //     resultArr.push(curRow);
    // }
    localStorage.setItem("dataUser", JSON.stringify(dataUser));
}