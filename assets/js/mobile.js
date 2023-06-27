const botaoMenu = document.querySelector('#menu__botao');

botaoMenu.addEventListener('click', ()=>{
    const menuNav = document.querySelector('.menu__nav');
    menuNav.classList.toggle('menu__nav-ativo')

    const imgMenuHamburguer = "url('./assets/Mobile/Ícones/menu-hamburguer.svg')"
    const imgMenuFechar = "url('./assets/Mobile/Ícones/menu-fechar.svg')"

    menuNav.classList.contains('menu__nav-ativo')?
    botaoMenu.style.backgroundImage = imgMenuFechar :
    botaoMenu.style.backgroundImage = imgMenuHamburguer 
})

const swiper = new Swiper('.swiper', {
    speed: 400,
    spaceBetween: 0,
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
      },
  });