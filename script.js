// ==========================
// LOAD NAVBAR
// ==========================

async function loadNavbar() {

    const navbar = document.getElementById("navbar");

    if (!navbar) return;

    let path = "/QuestionList/components/navbar.html";

    const response = await fetch(path);

    const html = await response.text();

    navbar.innerHTML = html;

}


// ==========================
// LOAD FOOTER
// ==========================

async function loadFooter() {

    const footer = document.getElementById("footer");

    if (!footer) return;

    let path = "/QuestionList/components/footer.html";

    const response = await fetch(path);

    const html = await response.text();

    footer.innerHTML = html;

}


// Initialize common components
loadNavbar();
loadFooter();

// Function to load solution file dynamically

async function loadSolution(button, filePath) {

    // Find nearest solution container
    const container = button.nextElementSibling;

    // Toggle solution visibility
    if (container.style.display === "block") {

        container.style.display = "none";
        button.innerText = "View Solution";
        return;
    }

    // Fetch solution file
    const response = await fetch(filePath);

    // Read solution text
    const code = await response.text();

    // Display solution
    container.innerHTML = `
<pre><code>${escapeHtml(code)}</code></pre>
`;

    container.style.display = "block";

    button.innerText = "Hide Solution";
}


// Escape HTML characters
function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}