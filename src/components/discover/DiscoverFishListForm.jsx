import React, { useState, useEffect } from 'react'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'
// import 'firebase/database'
// import 'firebase/storage'
import { storage } from '../../firebase'
import { v4 as uuid } from 'uuid'

// const defaultImageSrc = '/img/image_placeholder.png'

const DiscoverFishListForm = (props) => {
  const initialFieldValues = {
    fishCommonName: '',
    fishScientificName: '',
    fishDescription: '',
    fishAvailability: '',
    fishThreatToHuman: '0',
    fishIucnStatus: '',
    isDeleted: '0',
    fishImage: '',
    forTinuwa: '0',
    forFried: '0',
    forKilawin: '0',
    forSinugba: '0'
  }
  var [iucnStatusObjects, setiucnStatusObjects] = useState({})
  var [values, setValues] = useState(initialFieldValues)
  var [contactObjects, setContactObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('discover/iucnstatus').on('value', (snapshot) => {
      if (snapshot.val() != null)
      setiucnStatusObjects({
          ...snapshot.val(),
        })
      else setiucnStatusObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('discover/fishlist').on('value', (snapshot) => {
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
    values.fishImage = imageUrl
  } else {
    values.fishImage
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
          <label>Fish Description</label>
          <input
            className='form-control'
            name='fishDescription'
            value={values.fishDescription}
            onChange={handleInputChange}
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish Season/Month Available</label>
          <input
            className='form-control'
            name='fishAvailability'
            value={values.fishAvailability}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Is this fish threat to human?</label>
          <select
            className='form-control'
            name='fishThreatToHuman'
            value={values.fishThreatToHuman}
            onChange={handleInputChange}
          >
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Fish IUCN Status</label>
          <select
            className='form-control'
            name='fishIucnStatus'
            value={values.fishIucnStatus}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
          {Object.keys(iucnStatusObjects).map((id) => {
            return (
              <React.Fragment key={id}>
                {iucnStatusObjects[id].isDeleted == '0' ? (
                  <option value={iucnStatusObjects[id].iucnStatus}>
                    {iucnStatusObjects[id].iucnStatus
                    }
                  </option>
                ) : (
                  ''
                )}
              </React.Fragment>
            )
          })}
        </select>
        </div>

        <div className='col-sm-4 mb-4 mb-sm-0'>
          <label>Local Fish Name</label>
          <input
            className='form-control'
            name='fishLocalName'
            value={values.fishLocalName}
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


      <div className='form-group input-group row'>
      <div className='col-sm-12 mb-2 mb-sm-0'>
          <label>Best way to cook the fish?</label>
        </div>
      </div>
      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-2 mb-sm-0'>
          <label>Tinuwa</label>
          <select
            className='form-control'
            name='forTinuwa'
            value={values.forTinuwa}
            onChange={handleInputChange}
          >
            <option value='0'>False</option>
            <option value='1'>True</option>
          </select>
        </div>
        <div className='col-sm-2 mb-2 mb-sm-0'>
          <label>Sinugba</label>
          <select
            className='form-control'
            name='forSinugba'
            value={values.forSinugba}
            onChange={handleInputChange}
          >
            <option value='0'>False</option>
            <option value='1'>True</option>
          </select>
        </div>
        <div className='col-sm-2 mb-2 mb-sm-0'>
          <label>Fried</label>
          <select
            className='form-control'
            name='forFried'
            value={values.forFried}
            onChange={handleInputChange}
          >
            <option value='0'>False</option>
            <option value='1'>True</option>
          </select>
        </div>
        <div className='col-sm-2 mb-2 mb-sm-0'>
          <label>Kilawin</label>
          <select
            className='form-control'
            name='forKilawin'
            value={values.forKilawin}
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

export default DiscoverFishListForm