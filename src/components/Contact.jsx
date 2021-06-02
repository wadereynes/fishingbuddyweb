import React, { useState, useEffect } from 'react'
import ContactForm from './ContactForm'
import firebaseDb from '../firebase'

const Contacts = ({ user }) => {
  var [contactObjects, setContactObjects] = useState({})
  var [currentId, setCurrentId] = useState('')

  useEffect(() => {
    firebaseDb.ref('contacts').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])

  const addOrEdit = (obj) => {
    if (currentId == '')
      firebaseDb.ref('contacts').push(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    else
      firebaseDb.ref(`contacts/${currentId}`).set(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
  }

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this record?')) {
      firebaseDb.ref(`contacts/${key}`).remove((err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    }
  }

  return (
    <>
      <div className='lex flex-col text-center w-full mb-12'>
        <h1>Register {user.displayName.toUpperCase()}</h1>
        <div className='row'>
          <div className='col-md-5'>
            <div className='row'>
              <ContactForm {...{ addOrEdit, currentId, contactObjects }} />
            </div>
          </div>
          <div className='col-md-7'>
            <table className='table table-border table-stripped'>
              <thead className='thead-light'>
                <tr>
                  <th>Full Name</th>
                  <th>Mobile</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contactObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{contactObjects[id].fullName}</td>
                      <td>{contactObjects[id].mobile}</td>
                      <td>{contactObjects[id].email}</td>
                      <td>
                        <a
                          className='btn text-primary'
                          onClick={() => {
                            setCurrentId(id)
                          }}
                        >
                          <i className='fas fa-pencil-alt'></i>
                        </a>
                        <a
                          className='btn text-danger'
                          onClick={() => {
                            onDelete(id)
                          }}
                        >
                          <i className='fas fa-trash-alt'></i>
                        </a>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

export default Contacts
