// ==========================
// LOAD COMPONENTS
// ==========================

async function loadComponent(id, filePath) {

    const element = document.getElementById(id);

    if (!element) return;

    try {

        const response = await fetch(filePath);

        const html = await response.text();

        element.innerHTML = html;

    }

    catch(error) {

        console.error(`Failed to load ${filePath}`, error);

    }

}


// ==========================
// DETECT BASE PATH
// ==========================

function getBasePath() {

    const path = window.location.pathname;

    // Beginner pages

    if (path.includes("/Python/Beginner/")) {

        return "../../";

    }

    // Python / SQL / Interview pages

    if (
        path.includes("/Python/")
        || path.includes("/SQL/")
        || path.includes("/Interview-Questions/")
    ) {

        return "../";

    }

    // Root homepage

    return "";

}


// ==========================
// LOAD NAVBAR + FOOTER
// ==========================

document.addEventListener("DOMContentLoaded", () => {

    const base = getBasePath();

    loadComponent(
        "navbar",
        base + "components/navbar.html"
    );

    loadComponent(
        "footer",
        base + "components/footer.html"
    );

    loadQuestions();

});


// ==========================
// GLOBAL QUESTION STORAGE
// ==========================

let allQuestions = [];


// ==========================
// LOAD QUESTIONS
// ==========================

async function loadQuestions() {

    const container =
        document.getElementById("questions-container");

    // Only run on question pages

    if (!container) return;


    try {

        const response = await fetch(
            "../../data/python-beginner.json"
        );

        allQuestions = await response.json();


        // Get category from URL

        const params =
            new URLSearchParams(window.location.search);

        const category =
            params.get("category");


        // Apply filtering

        if (category) {

            const filtered =
                allQuestions.filter(
                    q => q.category === category
                );

            renderQuestions(filtered);

            updatePageTitle(category);

        }

        else {

            renderQuestions(allQuestions);

        }


        // Setup dropdown filtering

        setupCategoryFilter();

    }

    catch(error) {

        console.error("Question loading error:", error);

    }

}


// ==========================
// RENDER QUESTIONS
// ==========================

function renderQuestions(questions) {

    const container =
        document.getElementById("questions-container");

    if (!container) return;

    container.innerHTML = "";


    questions.forEach((question, index) => {

        const difficultyBadge =
            getDifficultyBadge(question.difficulty);


        container.innerHTML += `

<div class="card shadow-sm border-0 mb-4">

    <div class="card-body p-4">

        <div class="d-flex justify-content-between align-items-start flex-wrap">

            <div>

                <span class="badge bg-primary mb-2">

                    ${question.category}

                </span>

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


// ==========================
// CATEGORY FILTER
// ==========================

function setupCategoryFilter() {

    const filter =
        document.getElementById("categoryFilter");

    if (!filter) return;


    filter.addEventListener("change", () => {

        const selected = filter.value;


        if (selected === "All") {

            renderQuestions(allQuestions);

            return;

        }


        const filtered =
            allQuestions.filter(
                q => q.category === selected
            );

        renderQuestions(filtered);

    });

}


// ==========================
// UPDATE PAGE TITLE
// ==========================

function updatePageTitle(category) {

    const title =
        document.getElementById("page-title");

    const subtitle =
        document.getElementById("page-subtitle");


    if (title) {

        title.innerText =
            `🐍 ${category} Questions`;

    }


    if (subtitle) {

        subtitle.innerText =
            `Practice ${category.toLowerCase()} questions with solutions.`;

    }

}


// ==========================
// LOAD SOLUTION FILE
// ==========================

async function loadSolution(button, filePath) {

    const container =
        button.parentElement.querySelector(".solution-container");


    if (!container) return;


    // Toggle solution

    if (container.style.display === "block") {

        container.style.display = "none";

        button.innerText = "Load Solution";

        return;

    }


    try {

        const response = await fetch(filePath);

        const code = await response.text();


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


// ==========================
// ESCAPE HTML
// ==========================

function escapeHtml(text) {

    return text
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

}