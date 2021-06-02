import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

const BfarNewsForm = (props) => {
  const initialFieldValues = {
    newsTitle: '',
    newsImage: '',
    newsSource: '',
    isDeleted: '0'
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('discover/news').on('value', (snapshot) => {
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

  if (typeof imageUrl !== 'undefined' && imageUrl != null) {
    values.newsImage = imageUrl
  } else {
    values.newsImage
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  const enabled = values.newsImage.length > 0

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>News Title</label>
          <input
            className='form-control'
            name='newsTitle'
            value={values.newsTitle}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label className='mr-10'>News Image</label>
          <input type='file' accept='image/*' onChange={readImages} />
          <input
            className='form-control'
            name='newsImage'
            value={values.newsImage}
            onChange={handleInputChange}
            disabled
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Source</label>
          <input
            className='form-control'
            name='newsSource'
            value={values.newsSource}
            onChange={handleInputChange}
          />
        </div>
        
        <div className='col-sm-4 mb-2 mb-sm-0'>
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

export default BfarNewsForm
