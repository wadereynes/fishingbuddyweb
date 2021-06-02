import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
// import 'firebase/database'
// import 'firebase/storage'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

// const defaultImageSrc = '/img/image_placeholder.png'

const BfarRegulationsForm = (props) => {
  const initialFieldValues = {
    regulationName: '',
    regulationDescription: '',
    regulationSource: '',
    isDeleted: '0',
    // imageFile: null,
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('discover/fishingregulations/bfarregulations').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])

  useEffect(() => {
    if (props.currentId == '')
      setValues({
        ...initialFieldValues,
      })
    else
      setValues({
        ...props.contactObjects[props.currentId],
      })
  }, [props.currentId, props.contactObjects])

  const handleInputChange = (e) => {
    var { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const [imageUrl, setImageUrl] = useState()
  const readImages = async (e) => {
    const file = e.target.files[0]
    const id = uuid()
    const imagesRef = storage.ref('images').child(id)

    await imagesRef.put(file)
    imagesRef.getDownloadURL().then((url) => {
      setImageUrl(url)
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  const enabled = values.regulationName != null;

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Regulation Name</label>
          <input
            className='form-control'
            name='regulationName'
            value={values.regulationName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Regulation Description</label>
          <input
            className='form-control'
            name='regulationDescription'
            value={values.regulationDescription}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Source</label>
          <input
            className='form-control'
            name='source'
            value={values.source}
            onChange={handleInputChange}
          />
        </div>
        
        <div className='col-sm-2 mb-2 mb-sm-0'>
          <label>Deleted</label>
          <select
            className='form-control'
            name='isDeleted'
            value={values.isDeleted}
            onChange={handleInputChange}
          >
            <option value='0'>False</option>
            <option value='1'>True</option>
          </select>
        </div>
      </div>

      <div className='form-group'>
        <input
          type='submit'
          value={props.currentId == '' ? 'Save' : 'Update'}
          className='btn btn-primary btn-block'
          disabled={!enabled}
        />
      </div>
    </form>
  )
}

export default BfarRegulationsForm
