import sensivel from './sensivel.js';

function validacaoEmail(email) {
    const usuario = email.split("@");
  
    return new Promise((resolve) => {
      if (email.indexOf("@") < 0) {
        return resolve(true);
      }  
      if ((usuario[0].length >=1) &&
      (usuario[1].length >=3) &&
      (email.indexOf(" ") < 0) &&
      (usuario[1].indexOf(".") >=1)&&
      (usuario[1].lastIndexOf(".") < usuario[1].length - 1)) {
        return resolve(false);
      } 
      resolve(true);
    });  
  }

  async function createRow(payload) {
    const response = await fetch(sensivel.url_newsletter, {
      method: "POST",
      headers: {
        Authorization: sensivel.access_token_newsletter,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
  
    return data;
  }

document.addEventListener('DOMContentLoaded', () => {
const buttonNewsletter = document.querySelector('#button-newsletter');
if (buttonNewsletter) {
    buttonNewsletter.addEventListener('click', async (e) => {
    e.preventDefault(); // Evita o comportamento padrão do formulário

    let erro = 0;

    // Pega os dados do cliente
    let email = document.querySelector('#emailn').value.trim();

    // Validações dos campos
    const emailValido = await validacaoEmail(email);
    if (emailValido) {
        alert('E-mail inválido!');
        erro++;
    }

    // Se houver erros, não prosseguir
    if (erro > 0) {
        console.log('Erro na validação. Corrija os campos!');
        return;
    }

    // Se não houver erros, prosseguir com o cadastro
    const payload = {
        EMAILNEWSLETTER: email
    };

    alert("Email enviado!");
    await createRow(payload);

    email = "";

    const colocaPlaceHolder = document.querySelector('#emailn');
    colocaPlaceHolder.placeholder = "Email cadastrado!";
    });
}
});