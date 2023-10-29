import { Link } from 'react-router-dom';
import signup from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import { updateProfile } from 'firebase/auth';
import Swal from 'sweetalert2';

const SignUp = () => {

    const {createUser}= useContext(AuthContext)


    const handleSignUp = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(name,email,password);

        createUser(email, password)
        .then(result =>{
            console.log(result.user);
            updateProfile(result.user,{
                displayName: name
            })
            .then()
            .catch()
            Swal.fire({
                icon: 'success',
                title: 'Congratulation',
                text: 'User Sign Up Successfully',
                
              })
        })
        .catch(error=>{
            console.log(error.message);
        })
    }
    return (
        <div>
            <div className="hero min-h-screen ">
                <div className="hero-content flex-col lg:flex-row ">
                    <div className=" mr-12 w-1/2">

                        <img src={signup} alt="" />
                    </div>
                    <div className="card flex-shrink-0 w-full py-5 px-9 max-w-sm border-2 bg-base-100">
                        <form onSubmit={handleSignUp} className="card-body">
                            <h1 className="text-5xl text-center font-bold">Sign Up</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Name</span>
                                </label>
                                <input type="text" placeholder="Name" className="input input-bordered" name='name' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Confirm Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-red-500 text-white">Sign Up</button>
                            </div>
                        </form>
                        <p className='text-center'>Already have an Account? <Link className='text-red-600 font-bold' to="/login">Log In</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SignUp;