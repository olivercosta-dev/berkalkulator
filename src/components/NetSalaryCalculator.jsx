import FamilyDiscountInput from "./FamilyDiscountInput"
import GrossSalaryInput from "./GrossSalaryInput"
import NewlywedDiscountInput from "./NewlywedDiscountInput"

import { useEffect, useMemo, useState } from "react"

export default function NetSalaryCalculator() {
    const changeButtons = [
        {
            "id": 3,
            "changePercent": -5
        },
        {
            "id": 4,
            "changePercent": -1
        },
        {
            "id": 1,
            "changePercent": +1
        },
        {
            "id": 2,
            "changePercent": +5
        }
    ]
    const minGross = 100_000
    const maxGross = 10_000_000
    const defaultGrossSalary = minGross + (maxGross - minGross) * 0.01
    const [grossSalary, setGrossSalary] = useState(defaultGrossSalary)
    
    // const [netSalary, setNetSalary] = useState(defaultGrossSalary * (1 - 0.15 - 0.18))
    
    const [personalIncomeTaxExemption, setPersonalIncomeTaxExemption] = useState(false)
    const [personalDiscount, setPersonalDiscount] = useState(false)
    const [newlywedDiscount, setNewlywedDiscount] = useState(false)
    const [familyDiscount, setFamilyDiscount] = useState(false)

    const netSalary = useMemo(() => {
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
        // Must be at the end!
        if(personalDiscount === true) {
            totalTax = totalTax > 77_300 ? totalTax - 77_300 : 0
        }
        return grossSalary - totalTax
    },[
        grossSalary,
        personalIncomeTaxExemption, 
        personalDiscount, 
        familyDiscount, 
        newlywedDiscount
    ])
   
    return (
        <>
            <GrossSalaryInput 
                grossSalary={grossSalary} 
                setGrossSalary={setGrossSalary} 
                minGross={minGross} 
                maxGross={maxGross}
                changeButtons={changeButtons} 
            />
            <div className="flex flex-row items-center gap-3 justify-between">
                <label 
                    htmlFor="personalIncomeTaxExemption"
                    className="label"
                >
                    25 éven aluliak SZJA kedvezménye
                </label>
                <input
                    id="personalIncomeTaxExemption"
                    type="checkbox"
                    className="toggle"
                    onChange={() => setPersonalIncomeTaxExemption(!personalIncomeTaxExemption)}
                />
            </div>
            <div className="flex flex-row items-center justify-between">
                <label 
                    htmlFor="personalDiscount"
                    className="label"
                >
                    Személyi adókedvezmény
                </label>
                <input 
                    id="personalDiscount" 
                    className="toggle"
                    type="checkbox" 
                    onChange={() => setPersonalDiscount(!personalDiscount)}
                />
            </div>
            <FamilyDiscountInput familyDiscount={familyDiscount} setFamilyDiscount={setFamilyDiscount} />
            <NewlywedDiscountInput newlywedDiscount={newlywedDiscount} setNewlywedDiscount={setNewlywedDiscount}/>
            <p>Nettó jövedelem: {netSalary}</p>
        </>
    )
}