import { useContext } from 'react'
import { PersonProfileContext } from '../helpers/PersonProfileContext'
export default function NameInput() {
  
  const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)

  return (
    <>
      <label 
        htmlFor="name"
        className='label'
      >
        Családtag neve
      </label>
      <input 
        type="text"
        id="name"
        className="input input-bordered"
        value= {personProfile.personProfileName}
        onChange={(e) => {
          // setName(e.target.value)
            updatePersonProfile(personProfile, "personProfileName", e.target.value)
          }
        } placeholder="Adja meg a családtag névet"
      />
    </>
  )
}