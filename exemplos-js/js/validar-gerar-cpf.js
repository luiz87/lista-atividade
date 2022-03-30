function gerarCpf() {
    let cpf = [];
    for (let i = 0; i < 9; i++) {
        cpf[i] = Math.floor(Math.random() * 10);

    }
    let dig = calcDigito(0, cpf);
    cpf[9] = dig;
    dig = calcDigito(1, cpf);
    cpf[10] = dig;
    // console.log(cpf);
    cpf = cpf.toString().replaceAll(',', '');
    // cpf = "11122233344"; //"111.222.333-44";
        // 01234567891
    cpf = `${cpf.substr(0,3)}.${cpf.substr(3,3)}.${cpf.substr(6,3)}-${cpf.substr(9,3)}`;
    return cpf;
}


// validarCpf("14538220620");
// alert(validarCpf(prompt("Digite um cpf!")));
// desafio validar CPF formatado
function validarCpf(txtCpf) {
    txtCpf = txtCpf.replaceAll(".","").replaceAll("-","");
    let cpf = txtCpf.split("");
    let dig1 = calcDigito(0, cpf);
    let dig2 = calcDigito(1, cpf);
    if (cpf[9] == dig1 && cpf[10] == dig2) {
        // console.log("Válido");
        return true;
    } else {
        // console.log("Inválido");
        return false;
    }
}
function calcDigito(d, cpf) {
    let i = 10 + d;
    let j = 0;
    let soma = 0;
    while (i >= 2) {
        soma += cpf[j] * i;
        // console.log(`${i} ${j + 1} ${cpf[j]} ${soma}`);
        i--;
        j++;
    }
    let dig = 11 - (soma % 11);
    if (dig >= 10) {
        dig = 0;
    }
    // console.log(dig);
    return dig;
}