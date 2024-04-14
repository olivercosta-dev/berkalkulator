import { useContext } from 'react'
import { PersonProfileContext } from '../helpers/PersonProfileContext'

export default function PersonalDiscountInput() {
    const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)
    const handleSetPersonalDiscount = () => {
        updatePersonProfile(
            personProfile,
            "personalDiscount",
            !personProfile.personalDiscount
        )
    }
    return (
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
            checked={personProfile.personalDiscount !== false}
            onChange={handleSetPersonalDiscount}
        />
        </div>
    )
}