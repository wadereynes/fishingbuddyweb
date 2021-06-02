import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'


const SocialcatchForm = (props) => {
  const initialFieldValues = {
    fishCatchName: '',
    fishCatchDescription: '',
    fishCatchTimestamp: '',
    shipsFrom: '',
    sellCatch: '0',
    userID: '',
    pricePerKilo: '',
    stocksQuantity: '',
    isDeleted: '0',
    fishCatchImage: '',
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('socialcatch').on('value', (snapshot) => {
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
    values.fishCatchImage = imageUrl
  } else {
    values.fishCatchImage
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  const enabled = values.fishCatchImage.length > 0

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Catch Name</label>
          <input
            className='form-control'
            name='fishCatchName'
            value={values.fishCatchName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Catch Description</label>
          <input
            className='form-control'
            name='fishCatchDescription'
            value={values.fishCatchDescription}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label className='mr-10'>Fish Catch Image</label>
          <input type='file' accept='image/*' onChange={readImages} />
          <input
            className='form-control'
            name='fishCatchImage'
            value={values.fishCatchImage}
            onChange={handleInputChange}
            disabled
          />
        </div>
      </div>

      <div className='form-group input-group row'>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Ships From</label>
          <input
            className='form-control'
            name='shipsFrom'
            value={values.shipsFrom}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Sell Catch</label>
          <select
            className='form-control'
            name='sellCatch'
            value={values.sellCatch}
            onChange={handleInputChange}
          >
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>


        <div className='col-sm-4 mb-2 mb-sm-0'>
          <label>Stocks Quantity</label>
          <input
            className='form-control'
            type='number'
            name='stocksQuantity'
            value={values.stocksQuantity}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>User ID</label>
          <input
            className='form-control'
            name='userID'
            value={values.userID}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Price per kilo</label>
          <input
            className='form-control'
            name='pricePerKilo'
            type='number'
            value={values.pricePerKilo}
            onChange={handleInputChange}
            required
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
      <div className='form-group input-group row'>
      <div className='col-sm-12 mb-2 mb-sm-0'>
          <label>Best way to cook the fish?</label>
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

export default SocialcatchForm
