document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('stockUpdateForm');
    const updateMessage = document.getElementById('updateMessage');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        // In a real application, you would collect all input values and send them
        // to a server-side API (e.g., via fetch) to update a database.
        
        const hospitalName = document.getElementById('hospitalName').value;
        
        // Simulated Success:
        updateMessage.textContent = `✅ Blood stock for **${hospitalName}** updated successfully! (Data is simulated and not saved)`;
        
        // Hide message after a few seconds
        setTimeout(() => {
            updateMessage.textContent = '';
        }, 5000);
    });
});