import { useState } from "react"
import NetSalaryCalculator from "./NetSalaryCalculator"
import NameInput from "./NameInput"

export default function PersonProfile() {
    return(
        <>
            <div className="flex flex-col">
                {/*TODO: Person avatar*/}
                <NameInput/>
                <NetSalaryCalculator />
            </div>
        </>
    )

}