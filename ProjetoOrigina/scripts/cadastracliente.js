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
      const validaLetra = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/;
      const validaCnpj = /[0-9]{2}[.][0-9]{3}[.][0-9]{3}[\/][0-9]{4}[-][0-9]{2}/;
      const validaCpf = /[0-9]{3}[.][0-9]{3}[.][0-9]{3}[-][0-9]{2}/;
      const validaInscricaoEstadual = /^[A-Za-z0-9]{5,15}$/;
      const validaCEP = /[0-9]{5}[-][0-9]{3}/;
      const validaNumero = /[0-9\s]/;
      const validaCidade = /[^a-zA-ZÀ-ÖØ-öø-ÿ\s]/;

      // Pega os dados do cliente
      let fantasia = document.querySelector('#nome-fantasia');
      let razao = document.querySelector('#razao-social');
      let email = document.querySelector('#email');
      let telefone = document.querySelector('#tel');
      let cnpj = document.querySelector('#CNPJ');
      let inscricaoEstadual = document.querySelector('#inscricao-estadual');      
      let inscricaoEstadualUF = document.querySelector('#UF-inscricao-estadual');
      let cpf = document.querySelector('#CPF');
      let cep = document.querySelector('#cep');
      let endereco = document.querySelector('#endereco');
      let numero = document.querySelector('#num');
      let complemento = document.querySelector('#complemento');
      let bairro = document.querySelector('#bairro');
      let estado = document.querySelector('#estado');
      let cidade = document.querySelector('#cidade');
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

      if (telefone.value.length <= 0) {
        errorInput(telefone);
        erro++;
      } else {
        telefone.parentNode.className = "input-box"
      }

      if ((cnpj.value.length != 18) || !(validaCnpj.test(cnpj.value))) {
        errorInput(cnpj);
        erro++;
      } else {
        cnpj.parentNode.className = "input-box"
      }

      if (inscricaoEstadual.value.length > 0) {
        if (!(validaInscricaoEstadual.test(inscricaoEstadual.value))) {
          errorInput(inscricaoEstadual);
          erro++;
        }
      } else {
        inscricaoEstadual.parentNode.className = "input-box"
      }

      if (!(validaCpf.test(cpf.value)) || (cpf.value.length != 14)) {
        errorInput(cpf);
        erro++;
      } else {
        cpf.parentNode.className = "input-box"
      }

      if (!validaCEP.test(cep.value)) {
        errorInput(cep);
        erro++;
      } else {
        cep.parentNode.className = "input-box"
      }

      if (endereco.value.length <= 0) {
        errorInput(endereco);
        erro++;
      } else {
        endereco.parentNode.className = "input-box"
      }

      if (!(validaNumero.test(numero.value)) || numero.value.length <= 0) {
        errorInput(numero);
        erro++;
      } else {
        numero.parentNode.className = "input-box"
      }

      if (bairro.value.length <= 0) {
        errorInput(bairro);
        erro++;
      } else {
        bairro.parentNode.className = "input-box"
      }

      if (estado.value.length <= 0) {
        errorInput(estado);
        erro++;
      } else {
        estado.parentNode.className = "input-box"
      }

      if (validaCidade.test(cidade.value) || cidade.value.length <= 0) {
        errorInput(cidade);
        erro++;
      } else {
        cidade.parentNode.className = "input-box"
      }

      if (linkInstagram.value.length <= 0) {
        errorInput(linkInstagram);
        erro++;
      } else {
        linkInstagram.parentNode.className = "input-box"
      }

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
        INSCRICAOESTADUAL: inscricaoEstadual.value.trim(),
        INSCRICAOESTADUALUF: inscricaoEstadualUF.value.trim(),
        CPF: cpf.value.trim(),
        CEP: cep.value.trim(),
        ENDERECO: endereco.value.trim(),
        NUMERO: numero.value.trim(),
        COMPLEMENTO: complemento.value.trim(),
        BAIRRO: bairro.value.trim(),
        ESTADO: estado.value.trim(),
        CIDADE: cidade.value.trim(),
        LINKINSTAGRAM: linkInstagram.value.trim()
      };

      alert("Cadastro criado!");
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
