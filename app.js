import packages from './app-data/packageData.js';
import Package from './utilityClasses/Package.js';
import Authentication from './utilityClasses/Authentication.js';

const auth = new Authentication();

// Check if the user is authenticated
if (!auth.isAuthenticated()) {
    window.location.href = 'index.html';  
}


document.getElementById('packageForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const customerName = document.getElementById('customerName').value;
    const weight = parseFloat(document.getElementById('packageWeight').value);
    const value = parseFloat(document.getElementById('packageValue').value);

    const newPkg = new Package(customerName, weight, value);
    packages.push(newPkg);

    updatePackageTable(packages);
});


if (document.getElementById('packageTableBody')) {
    updatePackageTable(packages);
}

if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        auth.logout();
        window.location.href = 'index.html';
    });
}

// Function to update the package table display
function updatePackageTable(packages) {
    const packageList = document.getElementById('package-list');
    packageList.innerHTML = '';

    packages.forEach(pkg => {
        const packageItem = document.createElement('div');
        packageItem.classList.add('package-item');
        packageItem.innerHTML = `
            <p><strong>${pkg.customerName}</strong> - ${pkg.status}</p>
            <p>Weight: ${pkg.weight}kg | Value: $${pkg.value} | Shipping: ${pkg.shippingMethod}</p>
            <p>Remarks: ${pkg.remarks}</p>
            <button onclick="updateStatus(${pkg.id}, 'In Transit')">Mark as In Transit</button>
            <button onclick="updateStatus(${pkg.id}, 'Delivered')">Mark as Delivered</button>
            <button onclick="updateStatus(${pkg.id}, 'Lost', prompt('Enter reason:'))">Mark as Lost</button>
        `;
        packageList.appendChild(packageItem);
    });
}

// Function to update the status and remarks of a package
function updateStatus(packageId, status, reason = '') {
    const pkg = packages.find(p => p.id === packageId);
    if (pkg) {
        pkg.status = status;
        if (status === 'Lost') {
            pkg.remarks = "Item Lost. Reason: " + reason || 'Item Lost. Reason: No reason provided';
        } 
        updatePackageTable(packages);
    }
}

window.updateStatus = updateStatus;

// Initial call to populate the package list
updatePackageTable(packages);


if (document.getElementById('logoutBtn')) {
    document.getElementById('logoutBtn').addEventListener('click', function() {
        auth.logout(); 
    });
}