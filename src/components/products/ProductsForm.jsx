import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'


const ProductsForm = (props) => {
  const initialFieldValues = {
    title: '',
    description: '',
    category: '',
    address: '',
    stock: '0',
    price: '0',
    fishId: '',
    ownerId: '',
    ownerName: '',
    urlPhoto: '',
    isDeleted: '0',
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('products').on('value', (snapshot) => {
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
    values.urlPhoto = imageUrl
  } else {
    values.urlPhoto
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  const enabled = values.title.length > 0

  return (
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Product title</label>
          <input
            className='form-control'
            name='title'
            value={values.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Category</label>
          <select
            className='form-control'
            name='category'
            value={values.category}
            onChange={handleInputChange}
          >
            <option value='0'>Rod</option>
            <option value='1'>Reel</option>
            <option value='2'>Braidline</option>
            <option value='3'>Leaderline</option>
            <option value='4'>Lure</option>
            <option value='5'>Net</option>
            <option value='6'>Fish</option>
          </select>
        </div>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Description</label>
          <input
            className='form-control'
            name='description'
            value={values.description}
            onChange={handleInputChange}
            required
          />
        </div>
        
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
            <label>Owner Id</label>
            <input
              className='form-control'
              name='ownerId'
              value={values.ownerId}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-sm-4 mb-4 mb-sm-0'>
            <label>Owner Name</label>
            <input
              className='form-control'
              name='ownerName'
              value={values.ownerName}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Seller Address</label>
          <input
            className='form-control'
            name='address'
            value={values.address}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Product Price</label>
          <input
            className='form-control'
            name='price'
            value={values.price}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Stocks</label>
          <input
            className='form-control'
            name='stock'
            value={values.stock}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Id</label>
          <input
            className='form-control'
            name='fishId'
            value={values.fishId}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-group input-group row'>
      <div className='col-sm-4 mb-4 mb-sm-0'>
          <label className='mr-10'>Product Image</label>
          <input type='file' accept='image/*' onChange={readImages} />
          <input
            className='form-control'
            name='urlPhoto'
            value={values.urlPhoto}
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

export default ProductsForm
