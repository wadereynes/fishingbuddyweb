import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import LuretypeForm from './LuretypeForm'
import firebaseDb from '../../firebase'
import * as db from '../../firestore'

const Luretype = () => {
  var [contactObjects, setContactObjects] = useState({})
  var [currentId, setCurrentId] = useState('')

  useEffect(() => {
    firebaseDb.ref('hobbyist/lureType').on('value', (snapshot) => {
      if (snapshot.val() != null)
        setContactObjects({
          ...snapshot.val(),
        })
      else setContactObjects({})
    })
  }, [])

  const addOrEdit = (obj) => {
    if (currentId == '')
      firebaseDb.ref('hobbyist/lureType').push(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    else
      firebaseDb.ref(`hobbyist/lureType/${currentId}`).set(obj, (err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
  }

  const onDelete = (key) => {
    if (window.confirm('Are you sure to delete this record?')) {
      firebaseDb.ref(`hobbyist/lureType/${key}`).remove((err) => {
        if (err) console.log(err)
        else setCurrentId('')
      })
    }
  }

  return (
    <>
      <div
        style={{ display: 'none' }}
        className='lex flex-col text-center w-full mb-12'
      >
        <div className='row'>
          <div className='col-md-12'>
            <table className='table table-border table-stripped'>
              <thead className='thead-light'>
                <tr>
                  <th>Rod Type</th>
                  <th>Rod Brand</th>
                  <th>Rod Price</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(contactObjects).map((id) => {
                  return (
                    <tr key={id}>
                      <td>{contactObjects[id].rodType}</td>
                      <td>{contactObjects[id].rodBrand}</td>
                      <td>{contactObjects[id].rodPrice}</td>
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

      {/* Page Wrapper */}
      <div id='wrapper'>
        {/* Sidebar  */}
        <ul
          className='navbar-nav bg-gradient-primary sidebar sidebar-dark accordion'
          id='accordionSidebar'
        >
          {/* Sidebar - Brand  */}
          <a
            className='sidebar-brand d-flex align-items-center justify-content-center'
            href='index.html'
          >
            <div className='sidebar-brand-text mx-3'>FISHINGBUDDY</div>
          </a>

          {/* Divider  */}
          <hr className='sidebar-divider my-0' />

          {/* Nav Item - Dashboard  */}
          <li className='nav-item'>
            <a className='nav-link' href='index.html'>
              <i className='fas fa-fw fa-tachometer-alt'></i>
              <span>Dashboard</span>
            </a>
          </li>

          {/* Divider  */}
          <hr className='sidebar-divider' />

          {/* Heading  */}
          <div className='sidebar-heading'>All Users</div>

          <li className='nav-item'>
            <Link className='nav-link' to='/users'>
              <i className='fas fa-fw fa-users'></i>
              <span>Users</span>
            </Link>
          </li>

          {/* Nav Item - Utilities Collapse Menu  */}
          <hr className='sidebar-divider my-0' />

          <li className='nav-item'>
            <Link className='nav-link' to='/fishinggears'>
              <i className='fas fa-fw fa-fish'></i>
              <span>Products</span>
            </Link>
          </li>

          {/* Divider */}
          <hr className='sidebar-divider my-0' />

          <li className='nav-item'>
            <Link className='nav-link' to='/socialcatch'>
              <i className='fas fa-fw fa-fish'></i>
              <span>Social Catch</span>
            </Link>
          </li>

          <hr className='sidebar-divider' />

          {/* Heading  */}
          <div className='sidebar-heading'>Discover Page</div>

          {/* Nav Item - Pages Collapse Menu  */}

          {/* Nav Item - Tables  */}
          {/* <li className='nav-item active'>
              <a className='nav-link' href='tables.html'>
              <i className='fas fa-fw fa-table'></i>
              <span>Hobbyist</span>
              </a>
          </li> */}

          <li className='nav-item active'>
          <a
              href='/'
              className='nav-link'
              data-toggle='collapse'
              data-target='#collapseTwo'
              aria-expanded='true'
              aria-controls='collapseTwo'
          >
              <i className='fas fa-fw fa-table'></i>
              <span>Discover</span>
          </a>
          <div
              id='collapseTwo'
              className='collapse show'
              aria-labelledby='headingTwo'
              data-parent='#accordionSidebar'
          >
              <div className='bg-white py-2 collapse-inner rounded'>
              <Link to='/discoverfishlist'>
                  <a className='collapse-item'>Fish List</a>
              </Link>
              <Link to='/fishingregulations'>
                  <a className='collapse-item'>Fishing Regulations</a>
              </Link>
              <Link to='/fishingtechniques'>
                  <a className='collapse-item'>Fishing Techniques</a>
              </Link>
              <Link to='/fishinghotspots'>
                  <a className='collapse-item'>Fishing Hotspots</a>
              </Link>
            <Link to='/iucnstatus'>
                <a className='collapse-item'>IUCN Status</a>
            </Link>
              </div>
          </div>
          </li>

            <hr className='sidebar-divider' />

          {/* Heading  */}
          <div className='sidebar-heading'>All Hobbyist</div>

          {/* Nav Item - Pages Collapse Menu  */}

          {/* Nav Item - Tables  */}
          {/* <li className='nav-item active'>
              <a className='nav-link' href='tables.html'>
                <i className='fas fa-fw fa-table'></i>
                <span>Hobbyist</span>
              </a>
            </li> */}

          <li className='nav-item active'>
            <a
              href='/'
              className='nav-link'
              data-toggle='collapse'
              data-target='#collapseTwo'
              aria-expanded='true'
              aria-controls='collapseTwo'
            >
              <i className='fas fa-fw fa-table'></i>
              <span>Hobbyist</span>
            </a>
            <div
              id='collapseTwo'
              className='collapse show'
              aria-labelledby='headingTwo'
              data-parent='#accordionSidebar'
            >
              <div className='bg-white py-2 collapse-inner rounded'>
                <a className='collapse-item active'>Lure Type</a>
                <Link to='/rodtype'>
                  <a className='collapse-item'>Rod Type</a>
                </Link>
                <Link to='/reeltype'>
                  <a className='collapse-item'>Reel Type</a>
                </Link>
                <Link to='/braidlinetype'>
                  <a className='collapse-item'>Braidline Type</a>
                </Link>
                <Link to='/leaderlinetype'>
                  <a className='collapse-item'>Leaderline Type</a>
                </Link>
                <Link to='/environmenttype'>
                  <a className='collapse-item'>Environment Type</a>
                </Link>
                <Link to='/catchtype'>
                  <a className='collapse-item'>Catch Type</a>
                </Link>
                <Link to='/hobbyisttype'>
                  <a className='collapse-item'>Hobbyist Type</a>
                </Link>
              </div>
            </div>
          </li>

          {/* Divider  */}
          <hr className='sidebar-divider d-none d-md-block' />

          {/* Sidebar Toggler (Sidebar)  */}
          <div className='text-center d-none d-md-inline'>
            <button
              className='rounded-circle border-0'
              id='sidebarToggle'
            ></button>
          </div>
        </ul>
        {/* End of Sidebar  */}

        {/* Content Wrapper  */}
        <div id='content-wrapper' className='d-flex flex-column'>
          {/* Main Content  */}
          <div id='content'>
            {/* Topbar  */}
            <nav className='navbar navbar-expand navbar-light bg-white topbar mb-4 static-top shadow'>
              {/* Sidebar Toggle (Topbar)  */}
              <form className='form-inline'>
                <button
                  id='sidebarToggleTop'
                  className='btn btn-link d-md-none rounded-circle mr-3'
                >
                  <i className='fa fa-bars'></i>
                </button>
              </form>

              {/* Topbar Search  */}
              <form className='d-none d-sm-inline-block form-inline mr-auto ml-md-3 my-2 my-md-0 mw-100 navbar-search'>
                <div className='input-group'>
                  <input
                    type='text'
                    className='form-control bg-light border-0 small'
                    placeholder='Search for...'
                    aria-label='Search'
                    aria-describedby='basic-addon2'
                  />
                  <div className='input-group-append'>
                    <button className='btn btn-primary' type='button'>
                      <i className='fas fa-search fa-sm'></i>
                    </button>
                  </div>
                </div>
              </form>

              {/* Topbar Navbar  */}
              <ul className='navbar-nav ml-auto'>
                <li className='nav-item dropdown no-arrow d-sm-none'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='searchDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <i className='fas fa-search fa-fw'></i>
                  </a>
                  {/* Dropdown - Messages  */}
                  <div
                    className='dropdown-menu dropdown-menu-right p-3 shadow animated--grow-in'
                    aria-labelledby='searchDropdown'
                  >
                    <form className='form-inline mr-auto w-100 navbar-search'>
                      <div className='input-group'>
                        <input
                          type='text'
                          className='form-control bg-light border-0 small'
                          placeholder='Search for...'
                          aria-label='Search'
                          aria-describedby='basic-addon2'
                        />
                        <div className='input-group-append'>
                          <button className='btn btn-primary' type='button'>
                            <i className='fas fa-search fa-sm'></i>
                          </button>
                        </div>
                      </div>
                    </form>
                  </div>
                </li>

                <div className='topbar-divider d-none d-sm-block'></div>

                {/* Nav Item - User Information  */}
                <li className='nav-item dropdown no-arrow'>
                  <a
                    className='nav-link dropdown-toggle'
                    href='#'
                    id='userDropdown'
                    role='button'
                    data-toggle='dropdown'
                    aria-haspopup='true'
                    aria-expanded='false'
                  >
                    <span className='mr-2 d-none d-lg-inline text-gray-600 small'>
                      {/* {user.displayName.toUpperCase()} */}
                    </span>
                    <img
                      className='img-profile rounded-circle'
                      src='img/undraw_profile.svg'
                    />
                  </a>
                  {/* Dropdown - User Information  */}
                  <div
                    className='dropdown-menu dropdown-menu-right shadow animated--grow-in'
                    aria-labelledby='userDropdown'
                  >
                    <a className='dropdown-item' href='#'>
                      <i className='fas fa-user fa-sm fa-fw mr-2 text-gray-400'></i>
                      Profile
                    </a>
                    <a className='dropdown-item' href='#'>
                      <i className='fas fa-cogs fa-sm fa-fw mr-2 text-gray-400'></i>
                      Settings
                    </a>
                    <a className='dropdown-item' href='#'>
                      <i className='fas fa-list fa-sm fa-fw mr-2 text-gray-400'></i>
                      Activity Log
                    </a>
                    <div className='dropdown-divider'></div>
                    <a
                      className='dropdown-item'
                      data-toggle='modal'
                      data-target='#logoutModal'
                      onClick={db.logOut}
                    >
                      <i className='fas fa-sign-out-alt fa-sm fa-fw mr-2 text-gray-400'></i>
                      Logout
                    </a>
                  </div>
                </li>
              </ul>
            </nav>
            {/* End of Topbar  */}

            {/* Begin Page Content  */}
            <div className='container-fluid'>
              {/* Page Heading  */}
              <h1 className='h3 mb-2 text-gray-800'>Hobbyist (Lure Type)</h1>
              <p className='mb-4'>Hobbyist Fishing Setup Data Entry</p>
              <Link to='/' class='btn btn-primary btn-icon-split btn-sm mb-3'>
                <span class='icon text-white-50'>
                  <i class='fas fa-arrow-right'></i>
                </span>
                <span class='text'>Back to Hobbyist</span>
              </Link>
              <LuretypeForm {...{ addOrEdit, currentId, contactObjects }} />
              {/* DataTales Example  */}
              <div className='card shadow mb-4'>
                <div className='card-header py-3'>
                  <h6 className='m-0 font-weight-bold text-primary'>
                    Hobbyist List
                  </h6>
                </div>
                <div className='card-body'>
                  <div className='table-responsive'>
                    <table
                      className='table table-bordered'
                      id='dataTable'
                      width='100%'
                      cellspacing='0'
                    >
                      <thead>
                        <tr>
                          <th>Actions</th>
                          <th>ID</th>
                          <th>Name</th>
                          <th>isDeleted</th>
                        </tr>
                      </thead>

                      <tbody>
                        {Object.keys(contactObjects).map((id) => {
                          return (
                            <tr key={id}>
                              <td>
                                <a
                                  onClick={() => {
                                    setCurrentId(id)
                                  }}
                                  style={{ margin: '0 10px 0 0' }}
                                  className='btn-sm btn btn-primary'
                                >
                                  <i className='fas fa-edit'></i>
                                </a>
                                <a
                                  onClick={() => {
                                    onDelete(id)
                                  }}
                                  className='btn-sm btn btn-danger'
                                >
                                  <i className='fas fa-trash'></i>
                                </a>
                              </td>
                              <td>{id}</td>
                              <td>{contactObjects[id].lureTypeName}</td>
                              <td>
                                {contactObjects[id].lureTypeIsDeleted == '0'
                                  ? 'False'
                                  : 'True'}
                              </td>
                            </tr>
                          )
                        })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* End of Main Content */}

          {/* Footer  */}
          <footer className='sticky-footer bg-white'>
            <div className='container my-auto'>
              <div className='copyright text-center my-auto'>
                <span>Copyright &copy; FISHINGBUDDY 2021</span>
              </div>
            </div>
          </footer>
          {/* End of Footer  */}
        </div>
        {/* End of Content Wrapper  */}
      </div>
      {/* End of Page Wrapper  */}
    </>
  )
}

export default Luretype
