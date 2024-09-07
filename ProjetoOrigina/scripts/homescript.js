function menuShow() {
    let menuMobile = document.querySelector('.mobile-menu');
    if (menuMobile.classList.contains('open')) {
        menuMobile.classList.remove('open');
        document.querySelector('.icon').src = "assets/menu_white_36dp.svg"
    }else{
        menuMobile.classList.add('open');
        document.querySelector('.icon').src = "assets/close_white_36dp.svg"
    }
}

const historia = document.querySelector('#historia-list')
historia.addEventListener('click', () => {
    console.log('Redireciona para "Historia"!')
})

const editoriais = document.querySelector('#editoriais-list')
    editoriais.addEventListener('click', () => {
    console.log('Redireciona para "Editoriais"!')
})

const faleConosco = document.querySelector('#faleconosco-list')
faleConosco.addEventListener('click', () => {
console.log('Redireciona para "Fale Conosco"!')
})

const oGrupo = document.querySelector('#ogrupo-list')
oGrupo.addEventListener('click', () => {
console.log('Redireciona para "O Grupo"!')
})

const conceito = document.querySelector('#conceito-list')
    conceito.addEventListener('click', () => {
    console.log('Redireciona para "Conceito"!')
})


window.addEventListener("scroll", function(){
    let header = document.querySelector('#header')
    header.classList.toggle('rolagem',window.scrollY > 525
    )
})

function changeLogoOnScroll() {
    const headerLogo = document.querySelector('.origina img');
    const scrollPosition = window.scrollY;

    if (scrollPosition > 525) { 
        headerLogo.src = 'assets/origin_logo_preta.svg'; 
    } else {
        headerLogo.src = 'assets/origina_logo_branca.svg'; 
    }
}

window.addEventListener('scroll', changeLogoOnScroll);