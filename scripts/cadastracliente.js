import sensivel from './sensivel.js';
//import mysql    from 'mysql2';

/*
const connection = mysql.createConnection({
  host: sensivel.host_sql,
  port: sensivel.porta_sql,
  user: sensivel.usuario_sql,
  password: sensivel.senha_sql,
  database: sensivel.banco_sql
});

connection.connect((err) => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err.stack);
    return;
  }

function verificaJaExistente(banco, campo, dado) {
  const validaExistente = `
    SELECT * FROM ${banco}
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
    const response = await fetch(sensivel.url, {
      method: "POST",
      headers: {
        Authorization: sensivel.access_token,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });
    const data = await response.json();
  
    return data;
  }
  
  document.addEventListener('DOMContentLoaded', () => {
  const buttonCadastro = document.querySelector('.send-button');
  if (buttonCadastro) {
    buttonCadastro.addEventListener('click', async (e) => {
      e.preventDefault(); // Evita o comportamento padrão do formulário

      let erro = 0;

      // Definições das RegExp e validação dos campos
      const validaTelefone = /[(][0-9]{2}[)][ ][0-9]{4,5}[-][0-9]{4}/;
      const validaLetra = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/;
      const validaCnpj = /[0-9]{2}[.][0-9]{3}[.][0-9]{3}[\/][0-9]{4}[-][0-9]{2}/;

      // Pega os dados do cliente
      let fantasia = document.querySelector('#nome-fantasia');
      let razao = document.querySelector('#razao-social');
      let email = document.querySelector('#email');
      let telefone = document.querySelector('#tel');
      let cnpj = document.querySelector('#CNPJ');
      let linkInstagram = document.querySelector('#link-insta');

      // Validações dos campos
      if (fantasia.value.length <= 0) {
        errorInput(fantasia);
        erro++;
      } else {
        fantasia.parentNode.className = "input-box"
      }

      if (razao.value.length <= 0) {
        errorInput(razao);
        erro++;
      } else {
        razao.parentNode.className = "input-box"
      }

      const emailValido = await validacaoEmail(email.value);
      if (emailValido) {
        errorInput(email);
        erro++;
      } else {
        email.parentNode.className = "input-box"
      }

      if ((telefone.value.length <= 0) || !(validaTelefone.test(telefone.value))) {
        errorInput(telefone);
        erro++;
      } else {
        telefone.parentNode.className = "input-box"
      }

      if ((cnpj.value.length != 18) || !(validaCnpj.test(cnpj.value))) {
        errorCNPJ(cnpj);
        erro++;
      } else {
        cnpj.parentNode.className = "input-box cnpj"
        document.querySelector('.cnpj_incorreto').style.visibility = 'hidden';
      }

      if (linkInstagram.value.length <= 0) {
        errorInput(linkInstagram);
        erro++;
      } else {
        linkInstagram.parentNode.className = "input-box"
      }

      /*
      const cnpjExiste = await verificaJaExistente('cadastro_cliente', 'cc_cnpj', cnpj.value);
      if (cnpjExiste) {
        existeCNPJ(cnpj);
        erro++;
      } else {
        cnpj.parentNode.className = "input-box cnpj"
        document.querySelector('.cnpj_incorreto').style.visibility = 'visible';
      }      
      */

      // Se houver erros, não prosseguir
      if (erro > 0) {
        return;
      }

      // Se não houver erros, prosseguir com o cadastro
      const payload = {
        FANTASIA: fantasia.value.trim(),
        RAZAO: razao.value.trim(),
        EMAIL: email.value.trim(),
        TELEFONE: "'" + telefone.value.trim(),
        CNPJ: cnpj.value.trim(),
        LINKINSTAGRAM: linkInstagram.value.trim()
      };

      /*
      const criaCadastroCliente = `
      INSERT INTO cadastro_cliente 
      (cc_fantasia, cc_razao, cc_email, cc_telefone, cc_cnpj, cc_perfilinstagram, cc_criacao) 
      VALUES (?, ?, ?, ?, ?, ?, current_timestamp);
      `;

      connection.query(criaCadastroCliente, [ fantasia.value, razao.value, email.value, telefone.value, cnpj.value, linkInstagram.value ], (err) => {
        if (err) {
          console.error('Erro ao executar o insert:', err.stack);
          return;
        }
        console.log('Cadastro criado com sucesso');
      });
      */

      fantasia.value = "";
      razao.value = "";
      email.value = "";
      telefone.value = "";
      cnpj.value = "";
      linkInstagram.value = "";

    document.querySelector('.overlay-enviado').style.display = 'flex';
    await createRow(payload);

    });
  }
});

function errorInput(input) {
  const formItem = input.parentNode;
 // const textMessage = formItem.querySelector('a');

// textMessage.innerText = message;

  formItem.className = "input-box error";
}

function existeCNPJ(input) {
  const formItem = input.parentNode;
  formItem.className = "input-box error-cnpj"; 

  document.querySelector('.cnpj_existente').style.visibility = 'visible';

  moveVisibleErrorToTop()
}

function errorCNPJ(input) {
  const formItem = input.parentNode;
  formItem.className = "input-box error-cnpj"; 

  document.querySelector('.cnpj_incorreto').style.visibility = 'visible';

  moveVisibleErrorToTop()
}

document.querySelector('.dialog_close').addEventListener('click', () => {
  document.querySelector('.overlay-enviado').style.display = 'none';
});

function moveVisibleErrorToTop() {
  const container = document.querySelector('.input-box.error-cnpj');
  if (!container) {
    console.error('O elemento .input-box.cnpj não foi encontrado.');
    return; // Sai da função se o container não existir
  }

  const cnpjIncorreto = container.querySelector('.cnpj_incorreto');
  const cnpjExistente = container.querySelector('.cnpj_existente');

  if (cnpjIncorreto.style.visibility === 'visible') {
    container.insertBefore(cnpjIncorreto, cnpjExistente);
  } else if (cnpjExistente.style.visibility === 'visible') {
    container.insertBefore(cnpjExistente, cnpjIncorreto);
  }
}
//--------------------------------------------------------LEO-----------------------------------------------------------------//

