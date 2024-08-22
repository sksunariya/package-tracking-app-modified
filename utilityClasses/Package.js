export default class Package {
    constructor(customerName, weight, value) {
        this.id = Package.generateId();  
        this.customerName = customerName;
        this.weight = weight;
        this.value = value;
        this.status = 'Registered';
        this.shippingMethod = this.calculateShippingMethod();
        this.remarks = value >= 1000 ? 'Needs approval from Accounts Department' : 'None';  
    }

    calculateShippingMethod() {
        return this.weight > 10 ? 'Freight' : 'Standard';
    }

    static generateId() {
        return Math.floor(Math.random() * 1000000);  
    }
}
