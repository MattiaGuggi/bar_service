import React from 'react'
import { useUser } from '../components/UserContext'

const Profile = () => {
  const { user } = useUser();
  return (
    <div>
      Profile
    </div>
  )
}

export default Profile
