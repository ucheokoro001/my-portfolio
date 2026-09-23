// =========================
// MOBILE MENU
// =========================

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");


// OPEN / CLOSE MENU

menuBtn.addEventListener("click", function (event) {

    event.stopPropagation();

    navLinks.classList.toggle("active");

});


// CLOSE MENU WHEN CLICKING A LINK

const links = document.querySelectorAll(".nav-links a");

links.forEach(function (link) {

    link.addEventListener("click", function () {

        navLinks.classList.remove("active");

    });

});


// CLOSE MENU WHEN CLICKING OUTSIDE

document.addEventListener("click", function (event) {

    const clickedInsideMenu =
        navLinks.contains(event.target);

    const clickedMenuButton =
        menuBtn.contains(event.target);


    if (
        !clickedInsideMenu &&
        !clickedMenuButton
    ) {

        navLinks.classList.remove("active");

    }

});


// =========================
// PROJECT BUTTONS
// =========================

function openProject() {

    window.open(
        "taste-haven/index.html",
        "_blank"
    );

}


function showComingSoon(button) {
    button.textContent = "Coming Soon";
    button.disabled = true;
    button.style.cursor = "default";
}