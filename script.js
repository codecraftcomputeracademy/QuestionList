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

    // Find nearest solution container
    const container =
        button.closest(".accordion-body")
              .querySelector(".solution-container");

    if (!container) return;


    // Toggle visibility

    if (container.style.display === "block") {

        container.style.display = "none";

        button.innerText = "Load Solution";

        return;
    }


    try {

        // Fetch solution file

        const response = await fetch(filePath);

        const code = await response.text();


        // Display solution

        container.innerHTML = `
<pre><code>${escapeHtml(code)}</code></pre>
`;


        container.style.display = "block";

        button.innerText = "Hide Solution";

    }

    catch(error) {

        console.error(error);

        container.innerHTML = `
<div class="alert alert-danger">
    Failed to load solution file.
</div>
`;

        container.style.display = "block";

    }

}


// Escape HTML safely

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

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

// ==========================
// LOAD QUESTIONS
// ==========================

async function loadQuestions() {

    const container =
        document.getElementById("questions-container");

    if (!container) return;


    try {

        // Load JSON

        const response = await fetch(
            "../../data/python-beginner.json"
        );

        const questions = await response.json();


        // Generate HTML

        questions.forEach((question, index) => {

            const difficultyBadge =
                getDifficultyBadge(question.difficulty);

            container.innerHTML += `

<div class="card shadow-sm border-0 mb-4">

    <div class="card-body p-4">

        <div class="d-flex justify-content-between align-items-start flex-wrap">

            <div>

                <h2 class="h4 fw-bold">

                    Question ${index + 1} — ${question.title}

                </h2>

                <p class="text-muted mb-0">

                    ${question.description}

                </p>

            </div>

            ${difficultyBadge}

        </div>


        <!-- Accordion -->

        <div class="accordion mt-4" id="accordion${index}">

            <div class="accordion-item border-0">

                <h2 class="accordion-header">

                    <button
                        class="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#solution${index}">

                        View Solution

                    </button>

                </h2>

                <div
                    id="solution${index}"
                    class="accordion-collapse collapse">

                    <div class="accordion-body">

                        <button
                            class="btn btn-outline-primary mb-3"
                            onclick="loadSolution(
                                this,
                                '${question.solution}'
                            )">

                            Load Solution

                        </button>

                        <div class="solution-container"></div>

                    </div>

                </div>

            </div>

        </div>

    </div>

</div>
`;
        });

    }

    catch(error) {

        console.error(error);

    }

}


// ==========================
// DIFFICULTY BADGES
// ==========================

function getDifficultyBadge(level) {

    if (level === "Easy") {

        return `
<span class="badge bg-success fs-6 mt-2">
    Easy
</span>
`;
    }

    if (level === "Medium") {

        return `
<span class="badge bg-warning text-dark fs-6 mt-2">
    Medium
</span>
`;
    }

    return `
<span class="badge bg-danger fs-6 mt-2">
    Hard
</span>
`;
}


// Load questions automatically

loadQuestions();