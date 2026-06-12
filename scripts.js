function focusonproducts() {
    const section = document.getElementById("products_section");

    section.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "nearest"
    });

    section.setAttribute("tabindex", "-1");

    // Focus after the scroll animation
    setTimeout(() => {
        section.focus({ preventScroll: true });
    }, 800);
}