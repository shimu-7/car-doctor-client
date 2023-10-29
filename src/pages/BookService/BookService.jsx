import { useContext } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from 'sweetalert2'

const BookService = () => {

    const service = useLoaderData();
    console.log(service);
    const { title, price, _id, img } = service
    const {user} = useContext(AuthContext);

    const handleBookService  = e =>{
        e.preventDefault();
        const name = e.target.name.value;
        const date = e.target.date.value;
        const email = user?.email;
        //const due= e.target.due.value;

       // console.log(name, date , email, due);

        const booking={
            customerName: name,
            email,
            img,
            date,
            service: title,
            service_id: _id,
            price: price
        }
        console.log(booking)

        fetch('http://localhost:5000/bookings',{
            method: 'POST',
            headers:{
                'content-type': 'application/json'
            },
            body: JSON.stringify(booking)
        })
        .then(res=>res.json())
        .then(data=>{
            console.log(data);
            if(data.insertedId)
            {
                Swal.fire({
                    icon: 'success',
                    title: 'Congratulation',
                    text: 'Order Placed Successfully',
                    
                  })
            }
        })

    }


    return (
        <div>
            <h2 className="text-3xl text-center font-semibold">Book service {title}</h2>
            <form onSubmit={handleBookService}  className="card-body">
                <div className="grid md:grid-cols-2 gap-4">
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Name</span>
                        </label>
                        <input type="text" placeholder="Name" defaultValue={user?.displayName} name="name" className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Date</span>
                        </label>
                        <input type="date" name="date" className="input input-bordered" required />

                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Email</span>
                        </label>
                        <input type="email" name="email" defaultValue={user?.email} className="input input-bordered" required />
                    </div>
                    <div className="form-control">
                        <label className="label">
                            <span className="label-text">Due Amount</span>
                        </label>
                        <input type="text" name="due" defaultValue={'$'+price} className="input input-bordered" required />

                    </div>
                </div>
                <div className="form-control mt-6">
                   <input className="btn btn-block" type="submit" value="Submit" />
                </div>
            </form>
        </div>
    );
};

export default BookService;