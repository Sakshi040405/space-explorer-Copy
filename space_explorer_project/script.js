
/* =========================================
   SPACE EXPLORER — COMPLETE JAVASCRIPT
   ========================================= */

document.addEventListener("DOMContentLoaded", () => {
    // -------------------------------------
    // 1. MOBILE NAVIGATION
    // -------------------------------------

    const menuToggle = document.getElementById("menuToggle");
    const navLinks = document.getElementById("navLinks");

    if (menuToggle && navLinks) {
        menuToggle.addEventListener("click", () => {
            const isOpen = navLinks.classList.toggle("open");

            menuToggle.setAttribute("aria-expanded", String(isOpen));
            menuToggle.textContent = isOpen ? "×" : "☰";
        });

        navLinks.querySelectorAll("a").forEach((link) => {
            link.addEventListener("click", () => {
                navLinks.classList.remove("open");
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.textContent = "☰";
            });
        });
    }

    // -------------------------------------
    // 2. FOOTER YEAR
    // -------------------------------------

    const currentYear = document.getElementById("currentYear");

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // -------------------------------------
    // 3. PLANET INFORMATION
    // -------------------------------------

    const planets = {
        mercury: {
            name: "Mercury",
            type: "TERRESTRIAL PLANET",
            description:
                "Mercury is the smallest planet in our solar system and the closest to the Sun. Its surface is covered with craters, and temperatures vary dramatically between day and night.",
            day: "58.6 Earth days",
            year: "88 Earth days",
            distance: "57.9 million km"
        },

        venus: {
            name: "Venus",
            type: "TERRESTRIAL PLANET",
            description:
                "Venus has a dense atmosphere rich in carbon dioxide and clouds containing sulfuric acid. Its powerful greenhouse effect makes it the hottest planet in our solar system.",
            day: "243 Earth days",
            year: "225 Earth days",
            distance: "108.2 million km"
        },

        earth: {
            name: "Earth",
            type: "TERRESTRIAL PLANET",
            description:
                "Earth is our home planet. Liquid water covers most of its surface, and its atmosphere helps support the extraordinary variety of life found here.",
            day: "About 24 hours",
            year: "365.25 days",
            distance: "149.6 million km"
        },

        mars: {
            name: "Mars",
            type: "TERRESTRIAL PLANET",
            description:
                "Mars is known as the Red Planet because of iron-rich dust on its surface. It has enormous volcanoes, deep canyons, polar ice, and evidence of ancient water activity.",
            day: "24.6 hours",
            year: "687 Earth days",
            distance: "227.9 million km"
        },

        jupiter: {
            name: "Jupiter",
            type: "GAS GIANT",
            description:
                "Jupiter is the largest planet in our solar system. It has powerful storms, including the Great Red Spot, and a large family of moons.",
            day: "9.9 hours",
            year: "11.86 Earth years",
            distance: "778.6 million km"
        },

        saturn: {
            name: "Saturn",
            type: "GAS GIANT",
            description:
                "Saturn is famous for its magnificent ring system, made mainly of pieces of ice and rock. It is a gas giant with many known moons.",
            day: "About 10.7 hours",
            year: "29.4 Earth years",
            distance: "1.43 billion km"
        },

        uranus: {
            name: "Uranus",
            type: "ICE GIANT",
            description:
                "Uranus is an ice giant with a blue-green appearance caused by methane in its atmosphere. Its extreme axial tilt makes it rotate almost on its side.",
            day: "About 17.2 hours",
            year: "84 Earth years",
            distance: "2.87 billion km"
        },

        neptune: {
            name: "Neptune",
            type: "ICE GIANT",
            description:
                "Neptune is a distant ice giant with a deep blue appearance and extremely fast winds. It takes many Earth years to complete one orbit around the Sun.",
            day: "About 16.1 hours",
            year: "165 Earth years",
            distance: "4.50 billion km"
        }
    };

    // -------------------------------------
    // 4. PLANET SEARCH
    // -------------------------------------

    const planetSearch = document.getElementById("planetSearch");
    const planetCards = document.querySelectorAll(".planet-card");
    const emptySearch = document.getElementById("emptySearch");

    if (planetSearch) {
        planetSearch.addEventListener("input", () => {
            const searchTerm = planetSearch.value.trim().toLowerCase();
            let visibleCount = 0;

            planetCards.forEach((card) => {
                const planetName = card.dataset.planet || "";
                const planetInfo = planets[planetName];

                const searchableText = [
                    planetName,
                    planetInfo ? planetInfo.description : "",
                    planetInfo ? planetInfo.type : ""
                ].join(" ").toLowerCase();

                const matches = searchableText.includes(searchTerm);

                card.hidden = !matches;

                if (matches) {
                    visibleCount++;
                }
            });

            if (emptySearch) {
                emptySearch.hidden = visibleCount !== 0;
            }
        });
    }

    // -------------------------------------
    // 5. PLANET DETAILS DIALOG
    // -------------------------------------

    const planetDialog = document.getElementById("planetDialog");
    const dialogClose = document.getElementById("dialogClose");
    const dialogCloseBottom = document.getElementById("dialogCloseBottom");

    const dialogPlanetArt = document.getElementById("dialogPlanetArt");
    const dialogPlanetType = document.getElementById("dialogPlanetType");
    const dialogPlanetName = document.getElementById("dialogPlanetName");
    const dialogPlanetDescription = document.getElementById(
        "dialogPlanetDescription"
    );
    const dialogDay = document.getElementById("dialogDay");
    const dialogYear = document.getElementById("dialogYear");
    const dialogDistance = document.getElementById("dialogDistance");

    function closePlanetDialog() {
        if (planetDialog && planetDialog.open) {
            planetDialog.close();
        }
    }

    function openPlanetDialog(planetKey) {
        const planet = planets[planetKey];

        if (!planet || !planetDialog) {
            return;
        }

        dialogPlanetName.textContent = planet.name;
        dialogPlanetType.textContent = planet.type;
        dialogPlanetDescription.textContent = planet.description;
        dialogDay.textContent = planet.day;
        dialogYear.textContent = planet.year;
        dialogDistance.textContent = planet.distance;

        // Reuse the selected planet's existing CSS illustration.
        dialogPlanetArt.className = "dialog-planet-art";

        const planetArt = document.querySelector(
            `[data-planet="${planetKey}"] .planet-art`
        );

        if (planetArt) {
            const artCopy = planetArt.cloneNode(true);
            dialogPlanetArt.appendChild(artCopy);
        }

        if (!planetDialog.open) {
            planetDialog.showModal();
        }
    }

    document.querySelectorAll("[data-open-planet]").forEach((button) => {
        button.addEventListener("click", () => {
            openPlanetDialog(button.dataset.openPlanet);
        });
    });

    if (dialogClose) {
        dialogClose.addEventListener("click", closePlanetDialog);
    }

    if (dialogCloseBottom) {
        dialogCloseBottom.addEventListener("click", closePlanetDialog);
    }

    if (planetDialog) {
        planetDialog.addEventListener("click", (event) => {
            if (event.target === planetDialog) {
                closePlanetDialog();
            }
        });
    }

    // -------------------------------------
    // 6. SPACE FACTS
    // -------------------------------------

    const spaceFacts = [
        "A day on Venus is longer than its year.",
        "Jupiter is the largest planet in our solar system.",
        "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth.",
        "Saturn's rings are made mostly of ice and rocky material.",
        "Mars has the largest volcano known in our solar system: Olympus Mons.",
        "Neptune takes about 165 Earth years to orbit the Sun.",
        "The Moon is slowly moving away from Earth by a few centimetres each year.",
        "There are billions of galaxies in the observable universe.",
        "A black hole's gravity is so strong that light cannot escape from inside its event horizon.",
        "Earth is the only world currently known to support life."
    ];

    const factText = document.getElementById("factText");
    const factCounter = document.getElementById("factCounter");
    const factPrevious = document.getElementById("factPrevious");
    const factNext = document.getElementById("factNext");

    let currentFactIndex = 0;

    function displayFact() {
        if (!factText || !factCounter) {
            return;
        }

        factText.textContent = spaceFacts[currentFactIndex];

        factCounter.textContent =
            `SPACE FACT ${String(currentFactIndex + 1).padStart(2, "0")}`;
    }

    if (factPrevious) {
        factPrevious.addEventListener("click", () => {
            currentFactIndex =
                (currentFactIndex - 1 + spaceFacts.length) % spaceFacts.length;

            displayFact();
        });
    }

    if (factNext) {
        factNext.addEventListener("click", () => {
            currentFactIndex = (currentFactIndex + 1) % spaceFacts.length;

            displayFact();
        });
    }

    displayFact();

    // -------------------------------------
    // 7. BIRTHDAY MOON PHASE CALCULATOR
    // -------------------------------------

    const birthdayForm = document.getElementById("birthdayForm");
    const birthDateInput = document.getElementById("birthDate");

    const moonDisc = document.getElementById("moonDisc");
    const moonEyebrow = document.getElementById("moonEyebrow");
    const moonTitle = document.getElementById("moonTitle");
    const moonDescription = document.getElementById("moonDescription");
    const moonMeta = document.getElementById("moonMeta");

    /*
       Synodic month: average interval between similar Moon phases.
       Reference new Moon: 6 January 2000 at 18:14 UTC.

       This calculates an approximate phase from the entered date.
       It is not a precise astronomical ephemeris.
    */

    const SYNODIC_MONTH = 29.530588853;
    const REFERENCE_NEW_MOON = Date.UTC(2000, 0, 6, 18, 14);

    const lunarPhases = [
        {
            name: "New Moon",
            start: 0,
            end: 1.84566,
            description:
                "The Moon is between Earth and the Sun, so the side facing Earth appears mostly dark."
        },
        {
            name: "Waxing Crescent",
            start: 1.84566,
            end: 5.53699,
            description:
                "A slim crescent of sunlight appears and grows brighter each evening."
        },
        {
            name: "First Quarter",
            start: 5.53699,
            end: 9.22831,
            description:
                "About half of the Moon's visible face is illuminated."
        },
        {
            name: "Waxing Gibbous",
            start: 9.22831,
            end: 12.91963,
            description:
                "More than half of the visible Moon is illuminated as it approaches fullness."
        },
        {
            name: "Full Moon",
            start: 12.91963,
            end: 16.61096,
            description:
                "The Moon's Earth-facing side appears fully illuminated."
        },
        {
            name: "Waning Gibbous",
            start: 16.61096,
            end: 20.30228,
            description:
                "After the Full Moon, the illuminated portion begins to decrease."
        },
        {
            name: "Last Quarter",
            start: 20.30228,
            end: 23.99361,
            description:
                "About half of the visible Moon is illuminated again, on the opposite side."
        },
        {
            name: "Waning Crescent",
            start: 23.99361,
            end: 27.68493,
            description:
                "A thin crescent remains before the next New Moon."
        },
        {
            name: "New Moon",
            start: 27.68493,
            end: SYNODIC_MONTH,
            description:
                "The lunar cycle is almost complete and the next New Moon is approaching."
        }
    ];

    function calculateMoon(dateString) {
        // Parse the selected calendar date as UTC to avoid local-time shifts.
        const parts = dateString.split("-").map(Number);

        if (parts.length !== 3 || parts.some(Number.isNaN)) {
            return null;
        }

        const [year, month, day] = parts;

        const selectedDate = new Date(Date.UTC(year, month - 1, day, 12));

        if (
            selectedDate.getUTCFullYear() !== year ||
            selectedDate.getUTCMonth() !== month - 1 ||
            selectedDate.getUTCDate() !== day
        ) {
            return null;
        }

        if (selectedDate.getTime() > Date.now()) {
            return null;
        }

        const daysSinceReference =
            (selectedDate.getTime() - REFERENCE_NEW_MOON) /
            (1000 * 60 * 60 * 24);

        const moonAge =
            ((daysSinceReference % SYNODIC_MONTH) + SYNODIC_MONTH) %
            SYNODIC_MONTH;

        const phaseFraction = moonAge / SYNODIC_MONTH;

        const illumination =
            ((1 - Math.cos(2 * Math.PI * phaseFraction)) / 2) * 100;

        const phase = lunarPhases.find((item) => {
            return moonAge >= item.start && moonAge < item.end;
        }) || lunarPhases[0];

        return {
            phase: phase.name,
            description: phase.description,
            age: moonAge,
            illumination,
            fraction: phaseFraction
        };
    }

    function updateMoonIllustration(moon) {
        if (!moonDisc) {
            return;
        }

        /*
          This CSS illustration approximates the lit and dark portions.
          It is not a photographic Moon image.
        */

        const angle = moon.fraction * 2 * Math.PI;
        const waxing = moon.fraction < 0.5;

        const terminatorWidth = Math.abs(Math.cos(angle)) * 100;

        moonDisc.style.setProperty(
            "--moon-shadow",
            `${terminatorWidth}%`
        );

        moonDisc.style.setProperty(
            "--moon-shadow-x",
            waxing ? "0%" : `${100 - terminatorWidth}%`
        );

        moonDisc.style.background =
            moon.illumination < 1
                ? "radial-gradient(circle at 35% 30%, #555b70, #171d32 75%)"
                : "radial-gradient(circle at 35% 30%, #f4f0df, #c6c8d5 55%, #747b98 100%)";

        // Adjust the dark overlay for a better phase illustration.
        if (moon.illumination > 98) {
            moonDisc.style.setProperty("--moon-shadow", "0%");
        }
    }

    function displayMoonResult(moon, dateString) {
        if (!moon) {
            moonEyebrow.textContent = "CHECK YOUR DATE";
            moonTitle.textContent = "Please enter a valid birthday";
            moonDescription.textContent =
                "Choose a real calendar date that is not in the future.";
            moonMeta.innerHTML = `
                <div><span>PHASE</span><strong>—</strong></div>
                <div><span>ILLUMINATION</span><strong>—</strong></div>
                <div><span>MOON AGE</span><strong>—</strong></div>
            `;
            return;
        }

        const birthday = new Date(`${dateString}T12:00:00`);

        const formattedDate = birthday.toLocaleDateString("en-IN", {
            day: "numeric",
            month: "long",
            year: "numeric"
        });

        moonEyebrow.textContent = `YOUR MOON ON ${formattedDate.toUpperCase()}`;
        moonTitle.textContent = moon.phase;
        moonDescription.textContent = moon.description;

        moonMeta.innerHTML = `
            <div>
                <span>PHASE</span>
                <strong>${moon.phase}</strong>
            </div>
            <div>
                <span>ILLUMINATION</span>
                <strong>${moon.illumination.toFixed(1)}%</strong>
            </div>
            <div>
                <span>MOON AGE</span>
                <strong>${moon.age.toFixed(1)} days</strong>
            </div>
        `;

        updateMoonIllustration(moon);
    }

    if (birthDateInput) {
        // Prevent selecting future birthdays in the date picker.
        birthDateInput.max = new Date().toISOString().slice(0, 10);
    }

    if (birthdayForm && birthDateInput) {
        birthdayForm.addEventListener("submit", (event) => {
            event.preventDefault();

            const selectedDate = birthDateInput.value;

            if (!selectedDate) {
                birthDateInput.focus();
                return;
            }

            const moon = calculateMoon(selectedDate);

            displayMoonResult(moon, selectedDate);

            const moonSection = document.getElementById("moon");

            if (moonSection) {
                // Keep the result visible on smaller screens.
                moonSection.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
            }
        });
    }

    // -------------------------------------
    // 8. INITIAL MOON ILLUSTRATION
    // -------------------------------------

    const initialMoon = {
        fraction: 0.25,
        illumination: 50
    };

    updateMoonIllustration(initialMoon);
});
