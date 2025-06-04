document.addEventListener('DOMContentLoaded', () => {
    // Collapse navbar on mobile after click
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            const navbar = document.querySelector('.navbar-collapse');
            if (navbar.classList.contains('show')) {
                bootstrap.Collapse.getInstance(navbar).hide();
            }
        });
    });

    // Load and render project cards
    fetch('assets/data/projects.json')
        .then(res => res.json())
        .then(data => {
            const container = document.getElementById("project-sections");
            for (const [category, projects] of Object.entries(data)) {
                const section = document.createElement("div");
                section.innerHTML = `
          <div class="pt-1" id="${category}"></div>
          <h1 class="text-primary fs-2 fw-bold mt-2 mb-4">${category}</h1>
          <div class="row">
            ${projects.map(p => `
              <div class="col-md-4 mb-4">
                <div class="card bg-dark h-100 shadow-sm text-light">
                  <div class="ratio ratio-16x9 bg-dark">
                    <img src="${p.img}" class="img-fluid object-fit-contain w-100 h-100" alt="${p.title}">
                  </div>
                  <div class="card-body d-flex flex-column">
                    <h2 class="card-title fs-4">
                      <a href="${p.link}" target="_blank" class="text-decoration-none text-success">
                        ${p.title}
                      </a>
                    </h2>
                    <p class="card-text text-light">${p.description}</p>
                    <p class="fst-italic small mt-auto text-white-50">${p.tech}</p>
                  </div>
                </div>
              </div>
            `).join("")}
          </div>
        `;
                container.appendChild(section);
            }
        });
});