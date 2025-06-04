document.addEventListener('DOMContentLoaded', () => {
  // Collapse navbar on mobile after clicking a link
  const navLinks = document.querySelectorAll('.nav-link');
  const navbarCollapseEl = document.querySelector('.navbar-collapse');
  const collapseInstance = bootstrap.Collapse.getOrCreateInstance(navbarCollapseEl);

  // Collapse menu first, then scroll -> prevents overshoot on mobile
  navLinks.forEach(link => {
    link.addEventListener('click', ev => {
      const targetSel = link.getAttribute('href');           // e.g. "#Python"
      const targetEl = document.querySelector(targetSel);
      if (!targetEl) return;                                  // safety check

      const menuOpen = navbarCollapseEl.classList.contains('show');
      if (menuOpen) {
        ev.preventDefault();                                  // stop instant jump

        // After the collapse animation finishes, scroll smoothly
        navbarCollapseEl.addEventListener(
          'hidden.bs.collapse',
          () => targetEl.scrollIntoView({ behavior: 'smooth', block: 'start' }),
          { once: true }                                      // run only once
        );

        collapseInstance.hide();                              // start animation
      }
      // Desktop or already-collapsed → let the default anchor behaviour run
    });
  });

  // Load and render project cards
  fetch('assets/data/projects.json')
    .then(res => res.json())
    .then(data => {
      const container = document.getElementById("project-sections");
      for (const [category, projects] of Object.entries(data)) {
        const section = document.createElement("div");
        const cleanCategory = category.replace(/_/g, ' ');
        section.innerHTML = `
                    <div id="${category}" style="scroll-margin-top: 4.5rem;"></div>
                    <h1 class="text-primary fs-2 fw-bold mt-2 mb-4">${cleanCategory}</h1>
                    <div class="row">
                        ${projects.map(p => `
                            <div class="col-md-4 mb-4">
                                <div class="card bg-dark h-100 shadow-sm text-light">
                                    <div class="ratio ratio-16x9 bg-dark">
                                        <img src="${p.img}" class="img-fluid object-fit-contain w-100 h-100" alt="${p.title}">
                                    </div>
                                    <div class="card-body d-flex flex-column">
                                        <h2 class="card-title fs-4">
                                            <a href="${p.link}" target="_blank" class="text-decoration-underline text-success">
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
