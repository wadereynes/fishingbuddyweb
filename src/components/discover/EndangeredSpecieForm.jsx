import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
// import 'firebase/database'
// import 'firebase/storage'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

// const defaultImageSrc = '/img/image_placeholder.png'

const EndangeredSpecieForm = (props) => {
  const initialFieldValues = {
    fishCommonName: '',
    fishScientificName: '',
    source: '',
    fishIucnStatus: '',
    isDeleted: '0',
    fishImage: '',
    // imageFile: null,
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('discover/fishingregulations/endangeredspecies').on('value', (snapshot) => {
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
    values.fishImage = imageUrl
  } else {
    values.fishImage
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  const enabled = values.fishImage.length > 0

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Common Name</label>
          <input
            className='form-control'
            name='fishCommonName'
            value={values.fishCommonName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Scientific Name</label>
          <input
            className='form-control'
            name='fishScientificName'
            value={values.fishScientificName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label className='mr-10'>Fish Image</label>
          <input type='file' accept='image/*' onChange={readImages} />
          <input
            className='form-control'
            name='fishImage'
            value={values.fishImage}
            onChange={handleInputChange}
            disabled
          />

          {
            // <img
            //   className='mb-4'
            //   src={URL.createObjectURL(values.fishCatchImage)}
            // />
            // <img src={values.fishCatchImage} />
          }
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
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish IUCN Status</label>
          <input
            className='form-control'
            name='fishIucnStatus'
            value={values.fishIucnStatus}
            onChange={handleInputChange}
            required
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

export default EndangeredSpecieForm
