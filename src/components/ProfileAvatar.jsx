import { useContext } from 'react'
import { PersonProfileContext } from '../helpers/PersonProfileContext'
export default function ProfileAvatarInput() {
  
  const {updatePersonProfile, personProfile} = useContext(PersonProfileContext)

  return (
    <>
      <label 
        htmlFor="name"
        className='label'
      >
        Profilkép URL
      </label>
      <input 
        type="text"
        id="name"
        className="input input-bordered"
        value= {personProfile.profileImageUrl}
        onChange={(e) => {
            updatePersonProfile(personProfile, "profileImageUrl", e.target.value)
          }
        } placeholder="Adja meg profilképét"
      />
    </>
  )
}