import React from 'react'
import CreateList from '../components/CreateList'
import CreateHobbyList from '../components/CreateHobbyList'
import Lists from '../components/Lists'
import HobbyList from '../components/HobbyList'
import Layout from '../components/shared/Layout'
import { UserContext } from '../index'
import Contact from '../components/Contact'
import Hobbyist from '../components/Hobbyist'

function HomePage() {
  const user = React.useContext(UserContext)
  // console.log(user.uid)

  return (
    <Layout>
      {/* <CreateList user={user} /> */}
      {/* <CreateHobbyList user={user} /> */}
      {/* <Contact user={user} /> */}
      {/* <Lists user={user} /> */}
      {/* <HobbyList user={user} /> */}
      <Hobbyist user={user} />
    </Layout>
  )
}

export default HomePage
