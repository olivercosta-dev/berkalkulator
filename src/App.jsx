import PersonProfile from "./components/PersonProfile"
import { useReducer, useState } from "react"
import calculateNetSalary from "./helpers/calculateNetSalary"
import { v4 as uuidv4 } from 'uuid';
import { personProfileReducer, addPerson, removePerson, updatePersonProfile } from "./helpers/personProfileReducer"
import React from "react";
export default function App() {
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
    const initialPersonProfiles =
        [
            {
                uuid: uuidv4(),
                profileImageUrl: "https://daisyui.com/tailwind-css-component-profile-2@56w.png",
                personProfileName: "John Doe",
                grossSalary: 200_000,
                personalIncomeTaxExemption: false,
                newlywedDiscount: false,
                personalDiscount: false,
                familyDiscount: false
            }
        ]

    const [personProfiles, dispatchPersonProfile] = useReducer(personProfileReducer, initialPersonProfiles)
    // const [netSalary, setNetSalary] = useState(null)
    const [currentPersonIndex, setCurrentPersonIndex] = useState(0)
    const handleAddPersonProfile = (personProfile) => dispatchPersonProfile(addPerson(personProfile))
    const handleRemovePersonProfile = (personProfile) => dispatchPersonProfile(removePerson(personProfile))
    const handleUpdatePersonProfile = (personProfile, attributeToUpdate, newValue) => dispatchPersonProfile(updatePersonProfile(personProfile, attributeToUpdate, newValue))

    return (
        <>
            <div className="flex flex-wrap">
                <div className='md:w-1/2 tabs tabs-lifted' role="tablist">
                    {
                        personProfiles.map((personProfile, index) => {
                            return (
                                <React.Fragment key={personProfile.uuid}>
                                    <input type="radio"
                                        name="my_tabs_2"
                                        role="tab"
                                        className="tab whitespace-nowrap"
                                        aria-label={personProfile.personProfileName}
                                        onChange={() => setCurrentPersonIndex(index)}
                                        checked={index === currentPersonIndex}
                                    />
                                    <div role='tabpanel' className='tab-content bg-base-100 border-base-300 rounded-box p-6'>
                                        <button className="btn btn-xxl" onClick={() => handleRemovePersonProfile(personProfile)}>🗑️</button>
                                        <PersonProfile
                                            personProfile={personProfile}
                                            updatePersonProfile={handleUpdatePersonProfile}
                                        />
                                        <div className="stats">
                                            <div className="stat">
                                                <div className="stat-title w-4">Nettó jövedelem</div>
                                                <div className="stat-value">
                                                    {
                                                        calculateNetSalary(
                                                            personProfile.grossSalary,
                                                            personProfile.personalIncomeTaxExemption,
                                                            personProfile.newlywedDiscount,
                                                            personProfile.personalDiscount,
                                                            personProfile.familyDiscount
                                                        )
                                                        + ' Ft'
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </React.Fragment>
                            )
                        })
                    }
                    <button
                        className='btn btn-square btn-sm'
                        onClick={() => {
                            const uuid = uuidv4()
                            const newPersonProfile = {
                                uuid,
                                personProfileName: "John Doe",
                                grossSalary: 200_000,
                                personalIncomeTaxExemption: false,
                                newlywedDiscount: false,
                                personalDiscount: false,
                                familyDiscount: false,
                                profileImageUrl: "https://daisyui.com/tailwind-css-component-profile-2@56w.png"
                            }
                            handleAddPersonProfile(newPersonProfile)
                        }}
                    >
                        +
                    </button>
                </div>
                <div className='md:w-1/2'>
                    <div className="overflow-x-auto">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Név</th>
                                    <th>Bruttó Bér</th>
                                    <th>Nettó</th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    personProfiles.map((personProfile, index) => {
                                        return (
                                            <tr key={personProfile.uuid} className={currentPersonIndex === index ? "bg-base-200" : ""}>
                                                <td>
                                                    <div className="flex items-center gap-3">
                                                        <div className="avatar">
                                                            <div className="mask mask-squircle w-12 h-12">
                                                                <img src={personProfile.profileImageUrl} />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <div className="font-bold">{personProfile.personProfileName}</div>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td>
                                                    {personProfile.grossSalary}
                                                </td>
                                                <td>
                                                    {
                                                        calculateNetSalary(
                                                            personProfile.grossSalary,
                                                            personProfile.personalIncomeTaxExemption,
                                                            personProfile.newlywedDiscount,
                                                            personProfile.personalDiscount,
                                                            personProfile.familyDiscount
                                                        )
                                                    }
                                                </td>
                                                <th>
                                                    <button className="btn btn-ghost btn-xs" onClick={() => setCurrentPersonIndex(index)}>Részletek</button>
                                                </th>
                                            </tr>
                                        )
                                    }
                                    )
                                }
                                <tr>
                                    <td>Összesen</td>
                                    <td>{personProfiles.reduce((acc, currentProf) => parseFloat(acc) + parseFloat(currentProf.grossSalary), 0)}</td>
                                    <td>{personProfiles.reduce((acc, currentProf) =>
                                        acc + calculateNetSalary(
                                            currentProf.grossSalary,
                                            currentProf.personalIncomeTaxExemption,
                                            currentProf.newlywedDiscount,
                                            currentProf.personalDiscount,
                                            currentProf.familyDiscount),
                                        0)
                                    }
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </>
    )
}