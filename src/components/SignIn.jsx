import React from 'react'
// import homeSvg from '../../static/home.svg'
import * as db from '../firestore'

function SignIn() {
  return (
    // <div>
    //   <section className='text-gray-500 bg-gray-900 body-font'>
    //     <div className='container mx-auto flex px-5 py-24 items-center justify-center flex-col'>
    //       <img
    //         className='lg:w-2/6 md:w-3/6 w-5/6 mb-10 object-cover object-center rounded'
    //         alt='hero'
    //         src={homeSvg}
    //       />
    //       <div className='text-center lg:w-2/3 w-full'>
    //         <h1 className='title-font sm:text-4xl text-3xl mb-4 font-medium italic text-white'>
    //           FishingBuddy
    //         </h1>
    //         <p className='leading-relaxed mb-8 '>Social app with marketplace</p>
    //         <div className='flex justify-center'>
    //           <button
    //             onClick={db.signInWithGoogle}
    //             className='inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'
    //           >
    //             Sign In With Google
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </section>
    // </div>

    // <div>
    //   <button
    //     onClick={db.signInWithGoogle}
    //     className='inline-flex text-white bg-green-500 border-0 py-2 px-6 focus:outline-none hover:bg-green-600 rounded text-lg'
    //   >
    //     Sign In With Google
    //   </button>
    // </div>

    <div>
      <div className='bg-gradient-primary'>
        <div className='container'>
          <div className='row justify-content-center'>
            <div className='col-xl-10 col-lg-12 col-md-9'>
              <div className='card o-hidden border-0 shadow-lg my-5'>
                <div className='card-body p-0'>
                  <div className='row'>
                    <div className='col-lg-6 d-none d-lg-block bg-login-image'></div>
                    <div className='col-lg-6'>
                      <div className='p-5'>
                        <div className='text-center'>
                          <h1 className='h4 text-gray-900 mb-4'>
                            Welcome Back!
                          </h1>
                        </div>
                        <form className='user'>
                          <div className='form-group'>
                            <input
                              type='email'
                              className='form-control form-control-user'
                              id='exampleInputEmail'
                              placeholder='Enter Email Address...'
                            />
                          </div>
                          <div className='form-group'>
                            <input
                              type='password'
                              className='form-control form-control-user'
                              id='exampleInputPassword'
                              placeholder='Password'
                            />
                          </div>
                          <div className='form-group'>
                            <div className='custom-control custom-checkbox small'>
                              <input
                                type='checkbox'
                                className='custom-control-input'
                                id='customCheck'
                              />
                              <label className='custom-control-label'>
                                Remember Me
                              </label>
                            </div>
                          </div>
                          <a
                            href='index.html'
                            className='btn btn-primary btn-user btn-block'
                          >
                            Login
                          </a>
                          <hr />

                          {/* <a
                            href='index.html'
                            className='btn btn-facebook btn-user btn-block'
                          >
                            <i className='fab fa-facebook-f fa-fw'></i> Login
                            with Facebook
                          </a> */}
                        </form>
                        <button
                          onClick={db.signInWithGoogle}
                          className='btn btn-google btn-user btn-block'
                        >
                          <i className='fab fa-google fa-fw'></i> Login with
                          Google
                        </button>
                        <hr />
                        <div className='text-center'>
                          <a className='small' href='forgot-password.html'>
                            Forgot Password?
                          </a>
                        </div>
                        <div className='text-center'>
                          <a className='small' href='register.html'>
                            Create an Account!
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SignIn
