import { useContext, useState } from "react"
import { PersonProfileContext } from "../helpers/PersonProfileContext"
// Available discounts - Each of them are boolean values, inside the applicableDiscounts object:
//
// noPersonalIncomeTax
// Applicable when the Gross Salary does not exceed 499 952 Ft. 
// For incomes above this threshold, taxes are applied only on the EXCEEDING amount.



export default function GrossSalaryInput(
{
    minGross,
    maxGross, 
    changeButtons,
}
) 
{
    const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)

    const handleSetGrossSalary = (value) => {
        if(value > maxGross) {
            updatePersonProfile(personProfile, "grossSalary", maxGross)
        } else if(value < minGross) {
            updatePersonProfile(personProfile, "grossSalary", minGross)
        } else {
            updatePersonProfile(personProfile, "grossSalary", value)
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
                value={personProfile.grossSalary}
            />
            <div className="flex gap-5">
                <input 
                    type="range" 
                    name="gross-salary"
                    id="gross-salary"
                    className="range range-xs my-5"
                    min={minGross} 
                    max={maxGross} 
                    value={personProfile.grossSalary} 
                    onChange={(e) => handleSetGrossSalary(e.target.value)}
                />
                <div className="flex flex-row gap-3">
                    {
                        changeButtons.map((button) => (
                            <button 
                                key={button.id}
                                className="btn btn-outline"
                                onClick={ (e) => {handleSetGrossSalary(personProfile.grossSalary * (1 + (button.changePercent / 100)))}
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