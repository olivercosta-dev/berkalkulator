import { useState } from 'react'

export default function NameInput() {
  const [name, setName] = useState("John Doe")
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
        value={name}
        onChange={(e) => setName(e.target.value)} placeholder="Enter name"
      />
    </>
  )
}