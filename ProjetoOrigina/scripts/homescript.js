function menuShow() {
  let menuMobile = document.querySelector(".mobile-menu");
  if (menuMobile.classList.contains("open")) {
    menuMobile.classList.remove("open");
    document.querySelector(".icon").src = "assets/menu_white_36dp.svg";
  } else {
    menuMobile.classList.add("open");
    document.querySelector(".icon").src = "assets/close_white_36dp.svg";
  }
}


window.addEventListener("scroll", function () {
  let header = document.querySelector("#header");
  header.classList.toggle("rolagem", window.scrollY > 525);
});

function changeLogoOnScroll() {
  const headerLogo = document.querySelector(".origina img");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 525) {
    headerLogo.src = "assets/origin_logo_preta.svg";
  } else {
    headerLogo.src = "assets/origina_logo_branca.svg";
  }
}

function changeMenuOnScroll() {
  const headerLogo = document.querySelector(".iconm");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 525) {
    headerLogo.src = "assets/menu_black_36dp.svg";
  } else {
    headerLogo.src ="assets/menu_white_36dp.svg";
  }
}

function changeCloseOnScroll() {
  const headerLogo = document.querySelector(".icon");
  const scrollPosition = window.scrollY;

  if (scrollPosition > 525) {
    headerLogo.src = "assets/close_black_36dp.svg";
  } else {
    headerLogo.src ="assets/close_white_36dp.svg";
  }
}

window.addEventListener("scroll", changeLogoOnScroll);
window.addEventListener("scroll", changeMenuOnScroll);
window.addEventListener("scroll", changeCloseOnScroll);


window.addEventListener('scroll', function() {
  var footer = document.querySelector('footer');
  var floatButton = document.querySelector('#btn-whatsapp');



  // Obtém a posição do footer em relação à viewport
  var footerRect = footer.getBoundingClientRect();
  var windowHeight = window.innerHeight;

  // Se o footer está visível na tela, reposiciona o botão
  if (footerRect.top <= windowHeight) {
    // Ajusta a posição do botão para não sobrepor o footer
    floatButton.style.bottom = (windowHeight - footerRect.top + 100) + 'px';
  } else {
    // Reseta o botão para a posição original quando o footer não está visível
    floatButton.style.bottom = '40px';
  }

});

document.querySelectorAll('#cadastro').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetSection = document.querySelector(this.getAttribute('href'));
    targetSection.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

