document.getElementById('tax-form').addEventListener('submit', function(event) {
    event.preventDefault();
    calculateTax();
});

function calculateTax() {
    const taxRegime = document.getElementById('tax-regime').value;
    const annualIncome = parseFloat(document.getElementById('annual-income').value);
    const deductions = parseFloat(document.getElementById('deductions').value) || 0;
    const age = parseInt(document.getElementById('age').value);
    const gender = document.getElementById('gender').value;
    const assesseeType = document.getElementById('assessee-type').value;
    const nationality = document.getElementById('nationality').value;

    let taxableIncome = annualIncome - deductions;
    let taxLiability = 0;

    if (taxRegime === 'old') {
        taxLiability = calculateOldRegimeTax(taxableIncome, age, gender, assesseeType, nationality);
    } else if (taxRegime === 'new') {
        taxLiability = calculateNewRegimeTax(taxableIncome, age, gender, assesseeType, nationality);
    } else if (taxRegime === 'finance-bill-2025') {
        taxLiability = calculateFinanceBill2025Tax(taxableIncome, age, gender, assesseeType, nationality);
    }

    displayTaxBreakdown(taxLiability);
}

function calculateOldRegimeTax(taxableIncome, age, gender, assesseeType, nationality) {
    let tax = 0;
    // Example slabs
    if (taxableIncome <= 250000) {
        tax = 0;
    } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 1000000) {
        tax = 12500 + (taxableIncome - 500000) * 0.2;
    } else {
        tax = 112500 + (taxableIncome - 1000000) * 0.3;
    }
    return tax;
}

function calculateNewRegimeTax(taxableIncome, age, gender, assesseeType, nationality) {
    let tax = 0;
    // Example slabs
    if (taxableIncome <= 250000) {
        tax = 0;
    } else if (taxableIncome <= 500000) {
        tax = (taxableIncome - 250000) * 0.05;
    } else if (taxableIncome <= 750000) {
        tax = 12500 + (taxableIncome - 500000) * 0.1;
    } else if (taxableIncome <= 1000000) {
        tax = 37500 + (taxableIncome - 750000) * 0.15;
    } else if (taxableIncome <= 1250000) {
        tax = 75000 + (taxableIncome - 1000000) * 0.2;
    } else if (taxableIncome <= 1500000) {
        tax = 125000 + (taxableIncome - 1250000) * 0.25;
    } else {
        tax = 187500 + (taxableIncome - 1500000) * 0.3;
    }
    return tax;
}

function calculateFinanceBill2025Tax(taxableIncome, age, gender, assesseeType, nationality) {
    let tax = 0;
    // Example slabs based on hypothetical Finance Bill 2025 amendments
    if (taxableIncome <= 300000) {
        tax = 0;
    } else if (taxableIncome <= 600000) {
        tax = (taxableIncome - 300000) * 0.05;
    } else if (taxableIncome <= 900000) {
        tax = 15000 + (taxableIncome - 600000) * 0.1;
    } else if (taxableIncome <= 1200000) {
        tax = 45000 + (taxableIncome - 900000) * 0.15;
    } else if (taxableIncome <= 1500000) {
        tax = 90000 + (taxableIncome - 1200000) * 0.2;
    } else {
        tax = 150000 + (taxableIncome - 1500000) * 0.25;
    }
    return tax;
}

function displayTaxBreakdown(taxLiability) {
    const taxBreakdownDiv = document.getElementById('tax-breakdown');
    taxBreakdownDiv.innerHTML = `
        <h2>Tax Calculation Breakdown</h2>
        <p>Tax Liability: ₹${taxLiability.toFixed(2)}</p>
        <!-- Add more breakdown details as necessary -->
    `;
}