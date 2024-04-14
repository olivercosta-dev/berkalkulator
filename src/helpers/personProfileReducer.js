export const  personProfileReducer =  (personProfiles, action) => {
    let newPersonProfiles
    switch (action.type) {
        case 'add':
            newPersonProfiles = [...personProfiles, action.personProfile]
            break
        case 'remove':
            newPersonProfiles = personProfiles.filter((person) => person.uuid !== action.personProfile.uuid)
            break
        case 'update': {
            newPersonProfiles = personProfiles.map((personProfile) => {
                if(personProfile.uuid === action.personProfile.uuid) {
                    return {
                        ...personProfile,
                        [action.attributeToUpdate]: action.newValue
                    }
                } else {
                    return personProfile
                } 
            }
            )
            break
        }
        default:
            throw new Error('Unknown action type')
    }
    return newPersonProfiles
}

export const addPerson = personProfile => ({ type: 'add', personProfile: personProfile })

export const removePerson = personProfile => ({ type: 'remove', personProfile: personProfile })

export const updatePersonProfile = (personProfile, attributeToUpdate, newValue) => (
    {
        type: 'update',
        personProfile,
        attributeToUpdate,
        newValue
    }
)