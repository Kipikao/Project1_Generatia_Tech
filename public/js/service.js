const primaryNav = document.querySelector(".primary-nav");
const navToggel = document.querySelector(".mobile_nav_toggel");

navToggel.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible");

    if (visibility === "false") {
        primaryNav.setAttribute("data-visible", true);
        navToggel.setAttribute("aria-expanded", true);
     } else if (visibility === "true"){
        primaryNav.setAttribute("data-visible", false);
        navToggel.setAttribute("aria-expanded", false);
    }
});