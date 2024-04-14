export default function calculateNetSalary (
    grossSalary,
    personalIncomeTaxExemption,
    newlywedDiscount,
    personalDiscount,
    familyDiscount,
) 
{
    let totalTax = grossSalary * .185 // TB 
    if(personalIncomeTaxExemption === false) {
        totalTax += grossSalary * .15
    }
    
    if(familyDiscount !== false) {
        let totalFamilyDiscount = 0
        if(familyDiscount["discounted"] === 1) {
            totalFamilyDiscount = 10_000 * familyDiscount["dependants"] 
        } else if(familyDiscount["discounted"] === 2) {
            totalFamilyDiscount = 20_000 * familyDiscount["dependants"] 
        } else {
            totalFamilyDiscount = 33_000 * familyDiscount["dependants"] 
        }
        totalTax = totalTax > totalFamilyDiscount ? totalTax - totalFamilyDiscount : 0
    } 
    if(newlywedDiscount !== false && newlywedDiscount["isApplicable"] === true) {
        totalTax -= 5_000
    }
    if(personalDiscount === true) {
        totalTax = totalTax > 77_300 ? totalTax - 77_300 : 0
    }
    
    const netSalary = parseFloat(grossSalary) - parseFloat(totalTax)
    return Math.round(netSalary)
}