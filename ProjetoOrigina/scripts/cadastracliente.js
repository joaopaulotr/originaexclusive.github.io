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
      let fantasia = document.querySelector('#nome-fantasia').value.trim();
      let razao = document.querySelector('#razao-social').value.trim();
      let email = document.querySelector('#email').value.trim();
      let telefone = document.querySelector('#tel').value.trim();
      let cnpj = document.querySelector('#CNPJ').value.trim();
      let inscricaoEstadual = document.querySelector('#inscricao-estadual').value.trim();      
      let inscricaoEstadualUF = document.querySelector('#UF-inscricao-estadual').value.trim();
      let cpf = document.querySelector('#CPF').value.trim();
      let cep = document.querySelector('#cep').value.trim();
      let endereco = document.querySelector('#endereco').value.trim();
      let numero = document.querySelector('#num').value.trim();
      let complemento = document.querySelector('#complemento').value.trim();
      let bairro = document.querySelector('#bairro').value.trim();
      let estado = document.querySelector('#estado').value.trim();
      let cidade = document.querySelector('#cidade').value.trim();
      let linkInstagram = document.querySelector('#link-insta').value.trim();

      // Validações dos campos
      if (fantasia.length <= 0) {
        console.log('Nome Fantasia Inválido!');
        erro++;
      }

      if (validaLetra.test(razao)) {
        console.log('Razão inválida!');
        erro++;
      }

      const emailValido = await validacaoEmail(email);
      if (emailValido) {
        console.log('E-mail inválido!');
        erro++;
      }

      if (telefone.length <= 0) {
        console.log('Telefone incorreto!');
        erro++;
      }

      if ((cnpj.length != 18) || !(validaCnpj.test(cnpj))) {
        console.log('CNPJ incorreto!');
        erro++;
      }

      if (!(validaInscricaoEstadual.test(inscricaoEstadual))) {
        console.log('Inscrição Estadual inválida!');
        erro++;
      }

      if (!(validaCpf.test(cpf)) || (cpf.length != 14)) {
        console.log('CPF incorreto!');
        erro++;
      }

      if (!validaCEP.test(cep)) {
        console.log('CEP inválido!');
        erro++;
      }

      if (endereco.length <= 0) {
        console.log('Endereço inválido!');
        erro++;
      }

      if (!(validaNumero.test(numero)) || numero.length <= 0) {
        console.log('Número inválido!');
        erro++;
      }

      if (bairro.length <= 0) {
        console.log('Bairro inválido!');
        erro++;
      }

      if (estado.length <= 0) {
        console.log('Estado inválido!');
        erro++;
      }

      if (validaCidade.test(cidade)) {
        console.log('Cidade inválida!');
        erro++;
      }

      if (linkInstagram.length <= 0) {
        console.log('Perfil do Instagram inválido!');
        erro++;
      }

      // Se houver erros, não prosseguir
      if (erro > 0) {
        console.log('Erro na validação. Corrija os campos!');
        return;
      }

      // Se não houver erros, prosseguir com o cadastro
      const payload = {
        FANTASIA: fantasia,
        RAZAO: razao,
        EMAIL: email,
        TELEFONE: "'" + telefone,
        CNPJ: cnpj,
        INSCRICAOESTADUAL: inscricaoEstadual,
        INSCRICAOESTADUALUF: inscricaoEstadualUF,
        CPF: cpf,
        CEP: cep,
        ENDERECO: endereco,
        NUMERO: numero,
        COMPLEMENTO: complemento,
        BAIRRO: bairro,
        ESTADO: estado,
        CIDADE: cidade,
        LINKINSTAGRAM: linkInstagram
      };

      await createRow(payload);
      console.log("Cadastro criado!");
    });
  }
});
