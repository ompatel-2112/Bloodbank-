document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('bloodRequestForm');
    const hospitalList = document.getElementById('hospitalList');
    const resultsContainer = document.getElementById('results');

    // Simulated Blood Stock Data (Pre-filled for Demo)**
    // In a real app, this would come from a database/API.
    const simulatedStock = [
        { name: "Global Heart Hospital", location: "vadodra,kirti sthambh", group: "O+", units: 15, contact: "123-456-7890" },
        { name: "City General Hospital", location: "vadodra,kareli bug", group: "A+", units: 5, contact: "987-654-3210" },
        { name: "sahay Blood Bank", location: "Airport road", group: "O-", units: 2, contact: "555-123-4567" },
        { name: "Blood24x7", location: "vip road ", group: "A+", units: 10, contact: "111-222-3333" },
        { name: "Helthcare center", location: "city center", group: "AB+", units: 4, contact: "444-555-6666" }
        // Add more simulated hospitals here
    ];

    resultsContainer.style.display = 'none'; // Hide results initially

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // 1. Capture User Inputs
        const requiredGroup = document.getElementById('bloodGroup').value;
        const requestedLocation = document.getElementById('location').value.toLowerCase();
        const requestedUnits = parseInt(document.getElementById('units').value);
        const urgency = document.getElementById('urgency').value;

        // 2. Logic Engine: Match Request with Available Stock
        const matches = simulatedStock.filter(hospital => {
            const hasRequiredGroup = hospital.group === requiredGroup;
            const hasEnoughUnits = hospital.units >= requestedUnits;
            // Simple location match: check if the input location is a substring of the hospital location
            const isNearby = hospital.location.toLowerCase().includes(requestedLocation) || requestedLocation.includes(hospital.location.toLowerCase());

            // **Matching Rule:** Must have the group, enough units, AND be in the vicinity.
            return hasRequiredGroup && hasEnoughUnits && isNearby;
        });

        // 3. Display Results
        hospitalList.innerHTML = ''; // Clear previous results

        if (matches.length > 0) {
            matches.forEach(hospital => {
                const listItem = document.createElement('li');
                
                // Add an alert badge for critical urgency (UI enhancement)
                const urgencyBadge = urgency === 'critical' ? 
                    `<span style="color:#e74c3c; font-weight:bold;">CRITICAL PRIORITY: </span>` : '';

                listItem.innerHTML = `
                    <p class="hospital-name">${urgencyBadge} ${hospital.name}</p>
                    <p>Group: **${hospital.group}** | Units: **${hospital.units} Available**</p>
                    <p>Location: ${hospital.location}</p>
                    <p class="hospital-contact">Call: ${hospital.contact}</p>
                `;
                hospitalList.appendChild(listItem);
            });
            resultsContainer.style.display = 'block';
        } else {
            const noMatchItem = document.createElement('li');
            noMatchItem.innerHTML = `<p style="color:#c0392b; font-weight:bold;">❌ No immediate matches found for ${requiredGroup} near ${requestedLocation} with ${requestedUnits} units. Please call emergency services or try a wider search area.</p>`;
            hospitalList.appendChild(noMatchItem);
            resultsContainer.style.display = 'block';
        }

        // Scroll to results for better UX
        resultsContainer.scrollIntoView({ behavior: 'smooth' });
    });
});