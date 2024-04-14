import { useState } from "react"
import NameInput from "./NameInput"
import NewlywedDiscountInput from "./NewlywedDiscountInput"
import PersonalDiscountInput from "./PersonalDiscountInput"
import FamilyDiscountInput from "./FamilyDiscountInput"
import PersonalIncomeTaxExemptionInput from "./PersonalIncomeTaxExemptionInput"
import GrossSalaryInput from "./GrossSalaryInput"
import { useMemo } from "react"
import calculateNetSalary from "../helpers/calculateNetSalary"
import { PersonProfileContext } from "../helpers/PersonProfileContext"
import ProfileAvatarInput from "./ProfileAvatar"
// what a person is:
// const person = {
    //     uuid,
    //     name, 
    //     grossSalary,
    //     personalIncomeTaxExemption,
    //     personalDiscount,
    //     newlywedDiscount,
    //     familyDiscount,
    // }
export default function PersonProfile({personProfile, updatePersonProfile})
{
    const [uuid, setuuid] = useState(personProfile.uuid) // this should never change though!

    // ------ This is just config for flexibility
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
    // ------

    // const [personProfileName, setPersonProfileName] = useState(personProfile.personProfileName)
    // const [grossSalary, setGrossSalary] = useState(personProfile.grossSalary)
    // const [personalIncomeTaxExemption, setPersonalIncomeTaxExemption] = useState(personProfile.personalIncomeTaxExemption)
    // const [newlywedDiscount, setNewlywedDiscount] = useState(personProfile.newlywedDiscount)
    // const [personalDiscount, setPersonalDiscount] = useState(personProfile.personalDiscount)
    // const [familyDiscount, setFamilyDiscount] = useState(personProfile.familyDiscount)
    // const [personAvatar, setPersonAvatar] = useState("https://static.vecteezy.com/system/resources/previews/019/495/211/large_2x/cute-woman-girl-avatar-user-person-people-short-hair-flat-style-vector.jpg")
    
    return(
        <>
        
            <div className="flex flex-col">
                <PersonProfileContext.Provider 
                    value= {
                        {
                            updatePersonProfile,
                            personProfile
                        }
                    }
                >
                    <ProfileAvatarInput />
                    <NameInput />
                    <GrossSalaryInput
                        minGross={minGross} 
                        maxGross={maxGross}
                        changeButtons={changeButtons}
                    />
                    <PersonalIncomeTaxExemptionInput />
                    <NewlywedDiscountInput/>
                    <PersonalDiscountInput />
                    <FamilyDiscountInput />
                </PersonProfileContext.Provider>
            </div>
        </>
    )

}