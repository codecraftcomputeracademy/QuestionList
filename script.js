// ==========================
// LOAD COMPONENT
// ==========================

async function loadComponent(id, file) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(file);

        const html = await response.text();

        element.innerHTML = html;

    }

    catch(error) {

        console.error("Component load error:", error);

    }

}


// ==========================
// LOAD NAVBAR + FOOTER
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    // Detect depth automatically

    let depth = "";

    const path = window.location.pathname;

    if (path.includes("/Python/Beginner/")) {

        depth = "../../";

    }

    else if (
        path.includes("/Python/")
        || path.includes("/SQL/")
        || path.includes("/Interview-Questions/")
    ) {

        depth = "../";

    }

    loadComponent(
        "navbar",
        depth + "components/navbar.html"
    );

    loadComponent(
        "footer",
        depth + "components/footer.html"
    );

});


// ==========================
// LOAD SOLUTION FILE
// ==========================

async function loadSolution(button, filePath) {

    const container =
        button.parentElement.querySelector(".solution-container");

    if (!container) return;

    // Toggle

    if (container.style.display === "block") {

        container.style.display = "none";

        return;
    }

    try {

        const response = await fetch(filePath);

        const code = await response.text();

        container.innerHTML = `
<pre><code>${escapeHtml(code)}</code></pre>
`;

        container.style.display = "block";

    }

    catch(error) {

        container.innerHTML = `
<p class="text-danger">
    Failed to load solution.
</p>
`;

    }

}


// ==========================
// ESCAPE HTML
// ==========================

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}