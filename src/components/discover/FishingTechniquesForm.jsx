import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
// import 'firebase/database'
// import 'firebase/storage'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

// const defaultImageSrc = '/img/image_placeholder.png'

const FishingTechniquesForm = (props) => {
  const initialFieldValues = {
    fishingTechniqueName: '',
    fishingTechniqueStepsToFollow: '',
    fishingTechniqueDescription: '',
    isDeleted: '0',
    fishingTechniqueImage: '',
    // imageFile: null,
  }

  var [values, setValues] = useState(initialFieldValues)

  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('discover/fishingtechniques').on('value', (snapshot) => {
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

  // const showPreview = (e) => {
  //   if (e.target.files && e.target.files[0]) {
  //     let imageFile = e.target.files[0]
  //     const reader = new FileReader()
  //     reader.onload = (x) => {
  //       setValues({
  //         ...values,
  //         imageFile,
  //         fishCatchImage: x.target.result,
  //       })
  //     }
  //     reader.readAsDataURL(imageFile)
  //   } else {
  //     setValues({
  //       ...values,
  //       imageFile: null,
  //       fishCatchImage: defaultImageSrc,
  //     })
  //   }
  // }

  // function handleChange(e) {
  //   setFile(e.target.files[0])
  // }

  // const [file, setFile] = useState(null)
  // const [url, setURL] = useState('')

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
    values.fishingTechniqueImage = imageUrl
  } else {
    values.fishingTechniqueImage
  }

  // console.log(imageUrl)

  // if (imageUrl) {
  //   values.fishCatchImage = imageUrl
  // } else {
  //   values.fishCatchImage
  // }
  // values.fishCatchImage = imageUrl

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
    window.location.reload(false)
  }

  // function handleUpload(e) {
  //   e.preventDefault()
  //   const uploadTask = storage.ref(`/images/${file.name}`).put(file)
  //   uploadTask.on('state_changed', console.log, console.error, () => {
  //     storage
  //       .ref('images')
  //       .child(file.name)
  //       .getDownloadURL()
  //       .then((url) => {
  //         setFile(null)
  //         setURL(url)
  //       })
  //   })
  // }

  const enabled = values.fishingTechniqueImage.length > 0

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fishing Technique Name</label>
          <input
            className='form-control'
            name='fishingTechniqueName'
            value={values.fishingTechniqueName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Steps to Follow</label>
          <input
            className='form-control'
            name='fishingTechniqueStepsToFollow'
            value={values.fishingTechniqueStepsToFollow}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label className='mr-10'>Fishing Technique Image</label>
          <input type='file' accept='image/*' onChange={readImages} />
          <input
            className='form-control'
            name='fishingTechniqueImage'
            value={values.fishingTechniqueImage}
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
          <label>Technique Description</label>
          <input
            className='form-control'
            name='fishingTechniqueDescription'
            value={values.fishingTechniqueDescription}
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

export default FishingTechniquesForm