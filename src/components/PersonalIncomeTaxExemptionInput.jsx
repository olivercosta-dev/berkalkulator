import { useContext } from "react"
import { PersonProfileContext } from "../helpers/PersonProfileContext"

export default function PersonalIncomeTaxExemptionInput() {
    const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)
    return (
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
                checked = {personProfile.personalIncomeTaxExemption !== false}
                onChange={() => {
                    updatePersonProfile(personProfile, "personalIncomeTaxExemption", !personProfile.personalIncomeTaxExemption)
                }}
            />
        </div>
    )
}