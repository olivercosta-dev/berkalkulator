import { useState } from "react";
export default function FamilyDiscountInput({familyDiscount, setFamilyDiscount}) {
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
                        if(familyDiscount !== false) {
                            setFamilyDiscount(false)
                        } else {
                            setFamilyDiscount({"dependants": 1, "discounted": 1})
                        }
                    }
                }       
            />
        </div>
        {
            familyDiscount !== false && (
                <>
                    <span>Eltartottak száma:</span> 
                    <input id="dependants"
                        type="number"
                        min={1}
                        value={familyDiscount["dependants"]}
                        className="input input-bordered"
                        onChange= {
                            (event) => 
                            {
                                const dependants = event.target.value < 1 ? 1 : event.target.value
                                setFamilyDiscount(
                                {
                                    ...familyDiscount,
                                    "dependants": dependants, 
                                    "discounted": familyDiscount["discounted"] > dependants ? dependants : familyDiscount["discounted"]
                                })
                            }
                        }
                    />
                    <span>Ebből kedvezményezettek:</span>
                    <input id="discounted"
                        type="number"
                        min={1}
                        max={familyDiscount["dependants"] > 3 ? 3 : familyDiscount["dependants"]} // Maximum 3 can be discounted
                        value={familyDiscount["discounted"]}
                        className="input input-bordered"
                        onChange= {
                            (event) => setFamilyDiscount(
                                {
                                    ...familyDiscount,
                                    "discounted": event.target.value < 1 ? 1 : event.target.value  
                                }
                            )
                        }
                    />
                </>
            )
        }
    </>
    )
}

