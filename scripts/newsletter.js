import sensivel from './sensivel.js';
//import mysql    from 'mysql2';

/*
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',  
  password: Origina_projeto_2024,
  database: 'origina'
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }

function verificaJaExistente(tabela, campo, dado) {
  const validaExistente = `
    SELECT * FROM ${tabela}
    WHERE ${campo} = ?
  `;

  return new Promise((resolve, reject) => {
    connection.query(validaExistente, [dado], (err, results) => {
      if (err) {
        console.error('Erro ao executar a consulta:', err.stack);
        return reject(err);
      }
      if (results.length > 0) {
        return resolve(true); 
      }
      resolve(false); 
    });
  });
}
*/

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
    let email = document.querySelector('#emailn');

    // Validações dos campos
    const emailValido = await validacaoEmail(email.value);
    if (emailValido) {
        alert('E-mail inválido!');
        erro++;
    }

    /*
    const emailExiste = verificaJaExistente(cadastro_newsletter, cn_email, email.value)
    if (emailExiste) {
      alert('E-mail já cadastrado!');
      erro++;
    }
    */

    // Se houver erros, não prosseguir
    if (erro > 0) {
        console.log('Erro na validação. Corrija os campos!');
        return;
    }

    // Se não houver erros, prosseguir com o cadastro
    const payload = {
        EMAILNEWSLETTER: email.value.trim()
    };

    /*
    const criaCadastroNewsletter = `
    INSERT INTO cadastro_newsletter
    (cn_email, cn_inclusao, cn_exclusao) 
    VALUES (?, current_timestamp, current_timestamp);
    `;

    connection.query(criaCadastroNewsletter, [ email.value ], (err) => {
      if (err) {
        console.error('Erro ao executar o insert:', err.stack);
        return;
      }
      console.log('Cadastro criado com sucesso');
    });   
    */ 

    email.value = "";
    email.placeholder = "Email cadastrado!";
    await createRow(payload);
    });
}
});