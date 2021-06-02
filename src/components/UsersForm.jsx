import React, { useState, useEffect } from 'react'
import firebaseDb from '../firebase'
import * as db from '../firestore'

const UsersForm = (props) => {
  var [rodObjects, setRodObjects] = useState({})
  var [reelObjects, setReelObjects] = useState({})
  var [braidlineObjects, setBraidlineObjects] = useState({})
  var [leaderlineObjects, setLeaderlineObjects] = useState({})
  var [lureObjects, setLureObjects] = useState({})
  var [environmentObjects, setEnvironmentObjects] = useState({})
  var [catchObjects, setCatchObjects] = useState({})
  var [hobbyistObjects, setHobbyistObjects] = useState({})

  useEffect(() => {
    firebaseDb.ref('hobbyist/rodTypes').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setRodObjects({
          ...snapshot.val(),
        })
      else setRodObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/reelType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setReelObjects({
          ...snapshot.val(),
        })
      else setReelObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/braidlineType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setBraidlineObjects({
          ...snapshot.val(),
        })
      else setBraidlineObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/leaderlineType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setLeaderlineObjects({
          ...snapshot.val(),
        })
      else setLeaderlineObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/lureType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setLureObjects({
          ...snapshot.val(),
        })
      else setLureObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/environmentType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setEnvironmentObjects({
          ...snapshot.val(),
        })
      else setEnvironmentObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/catchType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setCatchObjects({
          ...snapshot.val(),
        })
      else setCatchObjects({})
    })
  }, [])

  useEffect(() => {
    firebaseDb.ref('hobbyist/hobbyistType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setHobbyistObjects({
          ...snapshot.val(),
        })
      else setHobbyistObjects({})
    })
  }, [])

  const initialFieldValues = {
    rodTypes: '',
    rodName: '',
    rodBrand: '',
    rodPrice: '0',
    rodTypeIndex: '0',
    reelType: '',
    reelName: '',
    reelBrand: '',
    reelPrice: '0',
    reelTypeIndex: '0',
    braidlineType: '',
    braidlineName: '',
    braidlineBrand: '',
    braidlinePrice: '0',
    braidlineIndex: '0',
    leaderlineType: '',
    leaderlineName: '',
    leaderlineBrand: '',
    leaderlinePrice: '0',
    leaderlineIndex: '0',
    lureType: '',
    lureName: '',
    lureBrand: '',
    lurePrice: '0',
    lureIndex: '0',
    environmentType: '',
    environmentTypeIndex: '0',
    catchType: '',
    catchTypeIndex: '0',
    hobbyistType: '',
    hobbyistTypeIndex: '0',
    isDeleted: '0',
    totalPrice: '',
  }

  var [values, setValues] = useState(initialFieldValues)

  useEffect(() => {
    if (props.currentId == '')
      setValues({
        ...initialFieldValues,
      })
    else
      setValues({
        ...props.hobbyistObjects[props.currentId],
      })
  }, [props.currentId, props.hobbyistObjects])

  const handleInputChange = (e) => {
    var { name, value } = e.target
    setValues({
      ...values,
      [name]: value,
    })
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
  }

  values.totalPrice =
    Number(values.rodPrice) +
    Number(values.reelPrice) +
    Number(values.braidlinePrice) +
    Number(values.leaderlinePrice) +
    Number(values.lurePrice)

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Rod Type</label>
          <select
            className='form-control'
            name='rodTypes'
            value={values.rodTypes}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(rodObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {rodObjects[id].rodTypeIsDeleted == '0' ? (
                    <option value={rodObjects[id].rodTypeName}>
                      {rodObjects[id].rodTypeName
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
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Rod Type Index</label>
          <input
            className='form-control'
            name='rodTypeIndex'
            value={values.rodTypeIndex}
            onChange={Object.keys(rodObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { rodObjects[id].rodTypeName == values.rodTypes ? (
                    values.rodTypeIndex = rodObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3 mb-3 mb-sm-0'>
          <label>Rod Name</label>
          <input
            className='form-control'
            name='rodName'
            value={values.rodName}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='col-sm-3 mb-3 mb-sm-0'>
          <label>Rod Brand</label>
          <input
            className='form-control'
            name='rodBrand'
            value={values.rodBrand}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Rod Price</label>
          <input
            className='form-control'
            name='rodPrice'
            type='number'
            value={values.rodPrice}
            onChange={handleInputChange}
            required
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-4 mb-sm-0'>
          <label>Reel Type</label>
          <select
            className='form-control'
            name='reelType'
            value={values.reelType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(reelObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {reelObjects[id].reelTypeIsDeleted == '0' ? (
                    <option value={reelObjects[id].reelTypeName}>
                      {reelObjects[id].reelTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Reel Type Index</label>
          <input
            className='form-control'
            name='reelTypeIndex'
            value={values.reelTypeIndex}
            onChange={Object.keys(reelObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { reelObjects[id].reelTypeName == values.reelType ? (
                    values.reelTypeIndex = reelObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Reel Name</label>
          <input
            className='form-control'
            name='reelName'
            value={values.reelName}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-3'>
          <label>Reel Brand</label>
          <input
            className='form-control'
            name='reelBrand'
            value={values.reelBrand}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-2'>
          <label>Reel Price</label>
          <input
            className='form-control'
            name='reelPrice'
            type='number'
            value={values.reelPrice}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Braidline Type</label>
          <select
            className='form-control'
            name='braidlineType'
            value={values.braidlineType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(braidlineObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {braidlineObjects[id].braidlineTypeIsDeleted == '0' ? (
                    <option value={braidlineObjects[id].braidlineTypeName}>
                      {braidlineObjects[id].braidlineTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Braidline Index</label>
          <input
            className='form-control'
            name='braidlineIndex'
            value={values.braidlineIndex}
            onChange={Object.keys(braidlineObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { braidlineObjects[id].braidlineTypeName == values.braidlineType ? (
                    values.braidlineIndex = braidlineObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Braidline Name</label>
          <input
            className='form-control'
            name='braidlineName'
            value={values.braidlineName}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-3'>
          <label>Braidline Brand</label>
          <input
            className='form-control'
            name='braidlineBrand'
            value={values.braidlineBrand}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-2'>
          <label>Braidline Price</label>
          <input
            className='form-control'
            name='braidlinePrice'
            type='number'
            value={values.braidlinePrice}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Leaderline Type</label>
          <select
            className='form-control'
            name='leaderlineType'
            value={values.leaderlineType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(leaderlineObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {leaderlineObjects[id].leaderlineTypeIsDeleted == '0' ? (
                    <option value={leaderlineObjects[id].leaderlineTypeName}>
                      {leaderlineObjects[id].leaderlineTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Leaderline Index</label>
          <input
            className='form-control'
            name='leaderlineIndex'
            value={values.leaderlineIndex}
            onChange={Object.keys(leaderlineObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { leaderlineObjects[id].leaderlineTypeName == values.leaderlineType ? (
                    values.leaderlineIndex = leaderlineObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Leaderline Name</label>
          <input
            className='form-control'
            name='leaderlineName'
            value={values.leaderlineName}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-3'>
          <label>Leaderline Brand</label>
          <input
            className='form-control'
            name='leaderlineBrand'
            value={values.leaderlineBrand}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-2'>
          <label>Leaderline Price</label>
          <input
            className='form-control'
            name='leaderlinePrice'
            type='number'
            value={values.leaderlinePrice}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Lure Type</label>
          <select
            className='form-control'
            name='lureType'
            value={values.lureType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(lureObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {lureObjects[id].lureTypeIsDeleted == '0' ? (
                    <option value={lureObjects[id].lureTypeName}>
                      {lureObjects[id].lureTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Lure Type Index</label>
          <input
            className='form-control'
            name='lureIndex'
            value={values.lureIndex}
            onChange={Object.keys(lureObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { lureObjects[id].lureTypeName == values.lureType ? (
                    values.lureIndex = lureObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Lure Name</label>
          <input
            className='form-control'
            name='lureName'
            value={values.lureName}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-3'>
          <label>Lure Brand</label>
          <input
            className='form-control'
            name='lureBrand'
            value={values.lureBrand}
            onChange={handleInputChange}
          />
        </div>
        <div className='col-sm-2'>
          <label>Lure Price</label>
          <input
            className='form-control'
            name='lurePrice'
            type='number'
            value={values.lurePrice}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-3 mb-3 mb-sm-0'>
          <label>Environment Type</label>
          <select
            className='form-control'
            name='environmentType'
            value={values.environmentType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(environmentObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {environmentObjects[id].fishingEnviTypeIsDeleted == '0' ? (
                    <option value={environmentObjects[id].fishingEnviTypeName}>
                      {environmentObjects[id].fishingEnviTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Environment Index</label>
          <input
            className='form-control'
            name='environmentTypeIndex'
            value={values.environmentTypeIndex}
            onChange={Object.keys(environmentObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { environmentObjects[id].fishingEnviTypeName == values.environmentType ? (
                    values.environmentTypeIndex = environmentObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Catch Type</label>
          <select
            className='form-control'
            name='catchType'
            value={values.catchType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(catchObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {catchObjects[id].catchTypeIsDeleted == '0' ? (
                    <option value={catchObjects[id].catchTypeName}>
                      {catchObjects[id].catchTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Catch Type Index</label>
          <input
            className='form-control'
            name='catchTypeIndex'
            value={values.catchTypeIndex}
            onChange={Object.keys(catchObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { catchObjects[id].catchTypeName == values.catchType ? (
                    values.catchTypeIndex = catchObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
      </div>

      <div className='form-group input-group row'>
        <div className='col-sm-3'>
          <label>Hobbyist Type</label>
          <select
            className='form-control'
            name='hobbyistType'
            value={values.hobbyistType}
            onChange={handleInputChange}
            required
          >
            <option value=''>Select</option>
            {Object.keys(hobbyistObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  {hobbyistObjects[id].hobbyistTypeIsDeleted == '0' ? (
                    <option value={hobbyistObjects[id].hobbyistTypeName}>
                      {hobbyistObjects[id].hobbyistTypeName}
                    </option>
                  ) : (
                    ''
                  )}
                </React.Fragment>
              )
            })}
          </select>
        </div>
        <div className='col-sm-2 mb-3 mb-sm-0'>
          <label>Hobbyist Type Index</label>
          <input
            className='form-control'
            name='hobbyistTypeIndex'
            value={values.hobbyistTypeIndex}
            onChange={Object.keys(hobbyistObjects).map((id) => {
              return (
                <React.Fragment key={id}>
                  { hobbyistObjects[id].hobbyistTypeName == values.hobbyistType ? (
                    values.hobbyistTypeIndex = hobbyistObjects[id].recommenderIndex
                  ) : (
                    '0'
                  )}
                </React.Fragment>
              )
            })}
            disabled
          />
        </div>
        <div className='col-sm-3'>
          <label>Total Price</label>
          <input
            className='form-control disable'
            name='totalPrice'
            value={values.totalPrice}
            onChange={handleInputChange}
            disabled
          />
        </div>
        <div className='col-sm-2'>
          <label>Deleted</label>
          <select
            className='form-control'
            name='isDeleted'
            value={values.isDeleted}
            onChange={handleInputChange}
          >
            <option value='0'>No</option>
            <option value='1'>Yes</option>
          </select>
        </div>
      </div>

      <div className='form-group'>
        <input
          type='submit'
          value={props.currentId == '' ? 'Save' : 'Update'}
          className='btn btn-primary btn-block'
        />
      </div>
    </form>
  )
}

export default UsersForm
