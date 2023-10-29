import { Link } from 'react-router-dom';
import login from '../../assets/images/login/login.svg'
import { useContext } from 'react';
import { AuthContext } from '../../providers/AuthProvider';
import Swal from 'sweetalert2';

const Login = () => {
    const {signIn} = useContext(AuthContext);

    const handleLogin = e =>{
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email,password);

        signIn(email, password)
        .then(result=>{
            console.log(result.user);
            Swal.fire({
                icon: 'success',
                title: 'Congratulation',
                text: 'User logged in Successfully',
                
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

                        <img src={login} alt=""  />
                    </div>
                    <div className="card flex-shrink-0 w-full py-5 px-9 max-w-sm border-2 bg-base-100">
                        <form onSubmit={handleLogin} className="card-body">
                            <h1 className="text-5xl text-center font-bold">Login</h1>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Email</span>
                                </label>
                                <input type="email" placeholder="email" className="input input-bordered" name='email' required />
                            </div>
                            <div className="form-control">
                                <label className="label">
                                    <span className="label-text">Password</span>
                                </label>
                                <input type="password" placeholder="password" className="input input-bordered" name='password' required />
                                <label className="label">
                                    <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                                </label>
                            </div>
                            <div className="form-control mt-6">
                                <button className="btn bg-red-500 text-white">Login</button>
                            </div>
                        </form>
                        <p className='text-center'>New to Here? <Link className='text-red-600 font-bold' to="/signup">Sign Up</Link></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;