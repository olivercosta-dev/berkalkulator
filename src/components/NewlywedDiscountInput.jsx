import {differenceInYears, addMonths, startOfMonth} from 'date-fns'
// import Datepicker from "react-tailwindcss-datepicker"

export default function NewlywedDiscountInput({newlywedDiscount,setNewlywedDiscount}) {
    return(
        <>
            <div className="flex flex-row items-center gap-3 justify-between">
                <label 
                    className="label" 
                    htmlFor="newlywedDiscount"
                >
                    Friss Házasok kedvezménye
                </label>
                <input id="newlywedDiscount" 
                    type="checkbox"
                    className="toggle"
                    onChange = { () =>{
                            if(newlywedDiscount === false) {
                                setNewlywedDiscount(
                                    {
                                        "weddingDate":(new Date()).toISOString().split('T')[0],
                                        "isApplicable": false
                                    }
                                )
                            } else {
                                setNewlywedDiscount(false)
                            }
                        }
                    }
                />
            </div>
            {
                newlywedDiscount !== false && (
                    <>
                        <label htmlFor="">Házasságkötés Dátuma</label>


                        <input type="date"
                            name=""
                            id=""
                            value={newlywedDiscount["weddingDate"]}
                            onChange={ (event) => {
                                    let isApplicable = false;
                                    const today = new Date()
                                    const weddingDate = new Date(event.currentTarget.value)
                                    const difference = differenceInYears(today, weddingDate)
                                    
                                    const firstApplicableDate = startOfMonth(addMonths(weddingDate, 1))

                                    isApplicable = difference <= 2 && today >= firstApplicableDate

                                    setNewlywedDiscount(
                                        {
                                            "weddingDate" : weddingDate.toISOString().split('T')[0],
                                            "isApplicable": isApplicable
                                        }
                                    )
                                }
                            }
                        />
                        <span>{newlywedDiscount["isApplicable"] ? "Jogosult" : "Nem jogosult"}</span>
                    </>
                )
            }
        </>
    )
}