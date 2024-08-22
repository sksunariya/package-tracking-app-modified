import packages from './app-data/packageData.js';
import Authentication from './utilityClasses/Authentication.js';

const auth = new Authentication();

// Check if the user is authenticated
if (!auth.isAuthenticated()) {
    window.location.href = 'index.html';  
}

// Function to update the package table display
function updatePackageTable(packages) {
    const packageList = document.getElementById('package-list');
    packageList.innerHTML = '';

    packages.forEach(pkg => {
        if (pkg.customerName === auth.loggedInUser.username) { 
            const packageItem = document.createElement('div');
            packageItem.classList.add('package-item');
            let buttonHtml = '';

            // Show cancel button only if the package is not cancelled
            if (pkg.status !== 'Cancelled') {
                buttonHtml = `<button onclick="cancelOrder(${pkg.id})">Cancel Order</button>`;
            }

            packageItem.innerHTML = `
                <p><strong>${pkg.customerName}</strong> - ${pkg.status}</p>
                <p>Weight: ${pkg.weight}kg | Value: $${pkg.value} | Shipping: ${pkg.shippingMethod}</p>
                <p>Remarks: ${pkg.remarks}</p>
                ${buttonHtml}
            `;
            packageList.appendChild(packageItem);
        }
    });
}

// Function to cancel an order
function cancelOrder(packageId) {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
        const reason = prompt('Enter reason for cancellation:');
        if (reason) {
            pkg.status = 'Cancelled';
            pkg.remarks = `Customer cancelled the order. Reason: ${reason}`;
            updatePackageTable(packages);  // Update UI after cancellation
        }
    }
}

// Attach functions to the window object
window.cancelOrder = cancelOrder;

// Initial call to populate the package list
updatePackageTable(packages);

if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        auth.logout();  // Logout and redirect to login page
    });
}
