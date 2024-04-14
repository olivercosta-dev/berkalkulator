import { differenceInYears, addMonths, startOfMonth } from 'date-fns'
import Datepicker from "react-tailwindcss-datepicker"
import { useContext, useState } from 'react'
import { PersonProfileContext } from '../helpers/PersonProfileContext'
import { useMediaQuery } from 'react-responsive'

//* weddingDate: string (YYYY-MM-dd)
//* isApplicable: bool

export default function NewlywedDiscountInput() {
    const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)

    const [date, setDate] = useState({
        startDate: (new Date()).toISOString().split('T')[0],
        endDate: (new Date()).toISOString().split('T')[0]
    })

    const resetNewlywedDiscount = () => {
        if (personProfile.newlywedDiscount === false) {
            updatePersonProfile(
                personProfile,
                "newlywedDiscount",
                {
                    "weddingDate": (new Date(date.startDate)).toISOString().split('T')[0],
                    "isApplicable": false
                }
            )
        } else {
            updatePersonProfile(personProfile,"newlywedDiscount", false)
        }
    }
    const isSmallScreen = useMediaQuery({ maxWidth: 640 })

    const handleSetDate = (newDate) => {
        setDate(newDate)

        let isApplicable = false;
        const today = new Date()
        const weddingDate = new Date(newDate.startDate)
        const difference = differenceInYears(today, weddingDate)

        const firstApplicableDate = startOfMonth(addMonths(weddingDate, 1))

        isApplicable = difference <= 2 && today >= firstApplicableDate
        updatePersonProfile(
            personProfile,
            "newlywedDiscount",
            {
                "weddingDate": weddingDate.toISOString().split('T')[0],
                "isApplicable": isApplicable
            }
        )
    }
    function isApplicableBadge() {
        return (
            <>
                <div className="badge badge-success gap-2">
                    Jogosult
                </div>
            </>
        )
    }
    function isNotApplicableBade() {
        return (
            <>
                <div className="badge badge-error gap-2">
                    Nem jogosult
                </div>
            </>
        )
    }
    return (
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
                    checked={personProfile.newlywedDiscount !== false}
                    onChange={resetNewlywedDiscount}
                />
            </div>
            {
                personProfile.newlywedDiscount !== false && (
                    <>
                    {/* Open the modal using document.getElementById('ID').showModal() method */}
                        <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>Dátum Hozzáadása</button>
                        <dialog id="my_modal_1" className="modal modal-bottom sm:modal-middle">
                        <div className="modal-box overflow-visible">
                            <h3 className="font-bold text-lg">Adja meg a házasságkötés dátumát!</h3>
                            <label htmlFor="">Házasságkötés Dátuma</label>
                            <Datepicker
                                asSingle={true}
                                useRange={false}
                                readOnly={true}
                                popoverDirection={isSmallScreen ? 'up' : 'down'}
                                value={date}
                                onChange={newDate => handleSetDate(newDate)}
                            />
                            <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn">Mentés</button>
                            </form>
                            </div>
                        </div>
                        </dialog>
                        {personProfile.newlywedDiscount["isApplicable"] ? isApplicableBadge() : isNotApplicableBade()}
                    </>
                )
            }
        </>
    )
}