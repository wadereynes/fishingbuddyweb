import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import defaultImage from '../../static/default.svg'
import * as db from '../firestore'
import * as dbfire from '../firestore'
import Empty from './shared/Empty'
import Error from './shared/Error'
import Loading from './shared/Loading'
import useSWR from 'swr'
import firebaseDb from '../firebase'

function HobbyLists({ user }) {
  // const { data: lists, error } = useSWR(user.uid, dbfire.getUserLists)
  // const { data: hobbylists, error } = useSWR(user.uid, db.getHobbyLists)

  // if (error) return <Error message={error.message} />
  // if (!hobbylists) return <Loading />
  // if (hobbylists.length === 0) return <Empty />
  var [contactObjects, setContactObjects] = useState({})
  var [currentId, setCurrentId] = useState('')
  useEffect(() => {
    firebaseDb.ref('hobbylists').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
    })
  }, [])
  return (
    <>
      {/* <UserListCount count={lists.length} /> */}
      {/* display user list count */}
      <section className='text-gray-500 bg-gray-900 body-font'>
        <div className='container px-5 py-5 mx-auto'>
          <div className='flex flex-wrap -m-4'>
            {/* {lists.map((hobbylists) => (
              <ListItem key={hobbylists.id} list={hobbylists} />
            ))} */}
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Description</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contactObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{contactObjects[id].name}</td>
                      <td>{contactObjects[id].description}</td>
                      <td>
                        <button
                          onClick={() => {
                            setCurrentId(id)
                          }}
                        >
                          edit
                        </button>
                        <button>delete</button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </>
  )
}

export default HobbyLists
