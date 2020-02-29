document.addEventListener('DOMContentLoaded', function() {
  const dropdownBtn = document.getElementById('dropdown-btn');
  const myDropdown = document.getElementById('my-dropdown');
  dropdownBtn.addEventListener('click', function() {
    myDropdown.classList.toggle('show');
  });
  document.addEventListener('click', function(e) {
    const isClickInside = dropdownBtn.contains(e.target);

    if (!isClickInside) {
      myDropdown.classList.remove('show');
    }
  });
  const myNavbar = document.getElementById('my-navbar');
  const hamburgerMenu = document.getElementById('hamburger-menu');
  hamburgerMenu.addEventListener('click', function() {
    myNavbar.classList.toggle('responsive')
  });
});

