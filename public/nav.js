document.querySelector('.menu, .overlayNav').addEventListener("click", navFunction);
    function navFunction(){
      document.querySelector('.menu').classList.toggle('clicked');
      document.querySelector('#nav').classList.toggle('show');
}