import { useState } from "react"
// Available discounts - Each of them are boolean values, inside the applicableDiscounts object:
//
// noPersonalIncomeTax
// Applicable when the Gross Salary does not exceed 499 952 Ft. 
// For incomes above this threshold, taxes are applied only on the EXCEEDING amount.



export default function GrossSalaryInput({grossSalary, setGrossSalary, minGross, maxGross, changeButtons}) {
    const handleSetGrossSalary = (value) => {
        if(value > maxGross) {
            setGrossSalary(maxGross)
        } else if(value < minGross) {
            setGrossSalary(minGross)
        } else {
            setGrossSalary(value)
        }
    }
    return (
        <>
            <label 
                htmlFor="gross-salary"
                className="label"
            >   
                Bruttó Bér
            </label>
            <input 
                type="text"
                name="gross-salary"
                id="gross-salary"
                min={minGross}
                max={maxGross}
                className="input input-bordered"
                onChange= {
                    (e) => handleSetGrossSalary(e.target.value)
                } 
                value={grossSalary}
            />
            <div className="flex gap-5">
                <input 
                    type="range" 
                    name="gross-salary" 
                    id="gross-salary"
                    className="range range-xs my-5"
                    min={minGross} 
                    max={maxGross} 
                    value={grossSalary} 
                    onChange={(e) => setGrossSalary(e.target.value)}
                />
                <div className="flex flex-row gap-3">
                    {
                        changeButtons.map((button) => (
                            <button 
                                key={button.id}
                                className="btn btn-outline"
                                onClick={ (e) => {handleSetGrossSalary(grossSalary * (1 + (button.changePercent / 100)))}
                                }
                            >
                                {button.changePercent > 0 ? `+${button.changePercent}` : button.changePercent}%
                            </button>)
                        )
                    }
                </div>
            </div>

        </>
    )
}