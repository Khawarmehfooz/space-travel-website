// Navigation
const nav = document.querySelector(".primary-navigation");
const navToggle = document.querySelector(".mobile-nav-toggle")
navToggle.addEventListener("click", () => {
    const visibility = nav.getAttribute("data-visible");
    if (visibility === "false") {
        nav.setAttribute("data-visible", true);
        navToggle.setAttribute("aria-expanded", true)
    } else {
        nav.setAttribute("data-visible", false);
        navToggle.setAttribute("aria-expanded", false)
    }
})
// Tabs

const tabList = document.querySelector("[role='tablist']");
const tabs = tabList.querySelectorAll('[role="tab"]')
let tabFocus = 0;
function changeTabFocus(e) {
    const keydownLeft = 37, keydownRight = 39;
    if (e.keycode === keydownLeft || e.keycode === keydownRight) {
        tabs[tabFocus].setAttribute("tabindex", -1)
    }
    if (e.keyCode === keydownRight) {
        tabFocus++;
        if (tabFocus >= tabs.length) {
            tabFocus = 0;

        }
    }
    if (e.keyCode === keydownLeft) {
        tabFocus--;
        if (tabFocus < 0) {
            tabFocus = tabs.length - 1;

        }
    }
    tabs[tabFocus].setAttribute("tabindex", 0);
    tabs[tabFocus].focus();
}
tabList.addEventListener("keydown", changeTabFocus)

function changeTabPanel(e) {
    const targetTab = e.target;
    const targetPanel = targetTab.getAttribute('aria-controls');
    const tabContainer = targetTab.parentNode;
    const mainContainer = tabContainer.parentNode;
    const targetImage = targetTab.getAttribute("data-image");

    tabContainer.querySelector('[aria-selected="true"]').setAttribute("aria-selected", false)
    targetTab.setAttribute("aria-selected", true)

    mainContainer.querySelectorAll('[role="tabpanel"]').forEach((panel) => {
        panel.setAttribute('hidden', true);
    })

    mainContainer.querySelector([`#${targetPanel}`]).removeAttribute("hidden")

    mainContainer.querySelectorAll('picture').forEach((pic) => {
        pic.setAttribute('hidden', true);
    })
    mainContainer.querySelector([`#${targetImage}`]).removeAttribute("hidden")


}
tabs.forEach((tab) => {
    tab.addEventListener('click', changeTabPanel)
})