import React, { useState, useEffect } from 'react'

const CatchsizeForm = (props) => {
  const initialFieldValues = {
    catchTypeName: '',
    catchTypeWeight: '',
    catchTypeIsDeleted: '0',
  }

  var [values, setValues] = useState(initialFieldValues)

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

  const handleFormSubmit = (e) => {
    e.preventDefault()
    props.addOrEdit(values)
  }

  return (
    // <></>
    <form autoComplete='off' onSubmit={handleFormSubmit}>
      <div className='form-group input-group row'>
        <div className='col-sm-5 mb-5 mb-sm-0'>
          <label>Catch Type</label>
          <input
            className='form-control'
            name='catchTypeName'
            value={values.catchTypeName}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-5 mb-5 mb-sm-0'>
          <label>Catch Weight</label>
          <input
            className='form-control'
            name='catchTypeWeight'
            value={values.catchTypeWeight}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className='col-sm-2'>
          <label>Deleted</label>
          <select
            className='form-control'
            name='catchTypeIsDeleted'
            value={values.catchTypeIsDeleted}
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
        />
      </div>
    </form>
  )
}

export default CatchsizeForm
