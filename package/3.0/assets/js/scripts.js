document.addEventListener("DOMContentLoaded", function() {
    const path = window.location.pathname;
    const match = path.match(/(.*\/)(?:v?\d+\.\d+|latest)\//);
    const base_path = match ? match[1] : path.substring(0, path.lastIndexOf('/') + 1);
    const json_url = `${base_path}versions.json`;
    const stargazers_element = document.querySelector('header div div:nth-child(3) a');

    if (!stargazers_element) {
        console.warn("Could not find the stargazers element to attach the version selector.");
        return;
    }
    fetch(json_url)
        .then(response => response.json())
        .then(data => {
            const container = document.createElement("div");
            container.style.display = "flex";
            container.style.alignItems = "center";
            container.style.marginLeft = "12px"; // Space between stars and version

            // 2. Create the select element
            const select = document.createElement("select");
            select.id = "version-selector";
            select.style.padding = "4px 8px";
            select.style.border = "1px solid #444";
            select.style.borderRadius = "6px";
            select.style.fontSize = "12px";
            select.style.fontWeight = "600";
            select.onchange = function() { window.location.href = this.value; };

            // 3. Populate options
            const currentPath = window.location.pathname;
            data.forEach(v => {
                const opt = document.createElement("option");
                const isLatest = v.aliases.includes("latest");

                // If it's the latest, point to the /latest/ alias instead of the version folder
                opt.value = isLatest ? `${base_path}/latest/` : `${base_path}/${v.version}/`;

                opt.textContent = isLatest ? `${v.title} (latest)` : v.title;

                if (currentPath.includes(`/${v.version}/`) || (isLatest && currentPath.includes('/latest/'))) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            });

            container.appendChild(select);

            stargazers_element.insertAdjacentElement('afterend', container);
        })
        .catch(error => console.error("Error loading versions:", error));
});