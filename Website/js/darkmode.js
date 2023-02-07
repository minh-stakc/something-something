function toggleDarkMode() {

    const bodyElement = document.body;
    bodyElement.classList.toggle("dark-mode");
    bodyElement.style.transition = "background-color 0.5s ease-in";

    const navbarItems = bodyElement.getElementsByClassName("nav-link");
    for (let i = 0; i < navbarItems.length; i++){
        navbarItems[i].classList.toggle("nav-link-dark");
    }

    document.getElementsByClassName('dropdown-menu')[0].classList.toggle("dropdown-menu-dark");

    const darkModeToggleText = document.querySelector('.dark-mode-text');
    if(darkModeToggleText.innerHTML === 'Toggle Dark Mode'){
        darkModeToggleText.innerHTML = 'Toggle Light Mode';
        darkModeToggleText.style.color = 'black';
    }else{
        darkModeToggleText.innerHTML = 'Toggle Dark Mode';
        darkModeToggleText.style.color = 'white';
    }

    document.getElementsByClassName('home-page')[0].classList.toggle("text-black");

    const healthMonitorCards = document.getElementsByClassName('card-body');
for (let i = 0; i < healthMonitorCards.length; i++){~ 
        healthMonitorCards[i].classList.toggle("dark-mode");
        healthMonitorCards[i].style.transition = "background-color 0.25s ease-in";
    }
    const EnviMonitorLists = document.getElementsByClassName('list-group-item');
    for (let i = 0; i < EnviMonitorLists.length; i++){
        EnviMonitorLists[i].classList.toggle("dark-mode");
        EnviMonitorLists[i].classList.toggle("dark-mode-border-color");
        EnviMonitorLists[i].style.transition = "background-color 0.25s ease-in";
    }
}