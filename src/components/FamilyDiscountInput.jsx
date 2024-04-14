import { useContext } from 'react'
import { PersonProfileContext } from '../helpers/PersonProfileContext'

export default function FamilyDiscountInput() {
    const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)
    const handleSetFamilyDiscount = (familyDiscount) => {
        updatePersonProfile(
            personProfile,
            "familyDiscount",
            familyDiscount
        )
    }
    return (
    <>
        <div className="flex flex-row items-center gap-3 justify-between">
            <label
                htmlFor="familyDiscount"
                className="label"
            >
                Családi adókedvezmény
            </label>
            <input 
                id="familyDiscount"
                type="checkbox"
                className="toggle"
                onChange={() => {
                        if(personProfile.familyDiscount !== false) {
                            handleSetFamilyDiscount(false)
                        } else {
                            const defaultFamilyDiscount = {"dependants": 1, "discounted": 1} 
                            handleSetFamilyDiscount(defaultFamilyDiscount)
                        }
                    }
                }       
            />
        </div>
        {
            personProfile.familyDiscount !== false && (
                <>
                    <span>Eltartottak száma:</span> 
                    <input id="dependants"
                        type="number"
                        min={1}
                        value={personProfile.familyDiscount["dependants"]}
                        className="input input-bordered"
                        onChange= {
                            (event) =>
                            {
                                const dependants = event.target.value < 1 ? 1 : event.target.value
                                const newFamilyDiscount =  {
                                    ...personProfile.familyDiscount,
                                    "dependants": dependants, 
                                    "discounted": personProfile.familyDiscount["discounted"] > dependants ? dependants : personProfile.familyDiscount["discounted"]
                                }
                                handleSetFamilyDiscount(newFamilyDiscount)
                            }
                        }
                    />
                    <span>Ebből kedvezményezettek:</span>
                    <input id="discounted"
                        type="number"
                        min={1}
                        max={personProfile.familyDiscount["dependants"] > 3 ? 3 : personProfile.familyDiscount["dependants"]} // Maximum 3 can be discounted
                        value={personProfile.familyDiscount["discounted"]}
                        className="input input-bordered"
                        onChange= {
                            (event) => {
                                const newFamilyDiscount =  
                                {
                                    ...personProfile.familyDiscount,
                                    "discounted": event.target.value < 1 ? 1 : event.target.value  
                                }
                                handleSetFamilyDiscount(newFamilyDiscount)
                            }
                        }
                    />
                </>
            )
        }
    </>
    )
}

