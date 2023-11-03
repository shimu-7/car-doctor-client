import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../providers/AuthProvider";
import BookingRow from "./BookingRow";
import Swal from "sweetalert2";
import axios from "axios";
import useAxiosSecure from "../../hooks/useAxiosSecure";


const Bookings = () => {
    const { user } = useContext(AuthContext);
    const [bookings, setBookings] = useState([]);
    const axiosSecure = useAxiosSecure()

    const url = `https://car-doctor-server-seven-delta.vercel.app/bookings?email=${user?.email}`;
    const url2 = `/bookings?email=${user?.email}`;
    

    useEffect(() => {

        // axiosSecure.get(url2)
        // .then(res=>{
        //     setBookings(res.data);
        //     console.log('axiosSecure',bookings.length)
        // })
        axios.get(url,{
            withCredentials: true
        })
        .then(res=>{
            setBookings(res.data);
            console.log('axios')
        })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setBookings(data);
        //     })
    }, [url,axiosSecure])
    
    const handleDelete = id => {
        const proceed = confirm('Are you Sure');
        if (proceed) {
            fetch(`https://car-doctor-server-seven-delta.vercel.app/bookings/${id}`, {
                method: 'DELETE'
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount) {
                        Swal.fire({
                            icon: 'success',
                            title: 'Great',
                            text: 'Something went wrong!',

                        })
                        const remaining = bookings.filter(booking => booking._id !== id)
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleConfirm = id => {
        fetch(`https://car-doctor-server-seven-delta.vercel.app/bookings/${id}`, {
            method: 'PATCH',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: 'confirm' })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                if (data.modifiedCount > 0) {
                    alert('updated successfully')
                    const remaining = bookings.filter(booking => booking._id !== id)
                    const updated = bookings.find(booking => booking._id === id)
                    updated.status='confirm';
                    const newBookings = [updated,...remaining]
                    setBookings(newBookings)
                }
            })
    }

   

   
    return (
        <div>
            <h2 className="text-4xl text-center font-bold">Your Bookings: {bookings.length}</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>

                            </th>
                            <th>Image</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Price</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            bookings.map(booking => <BookingRow handleDelete={handleDelete} key={booking._id} handleConfirm={handleConfirm} booking={booking}></BookingRow>)
                        }


                    </tbody>

                </table>
            </div>
        </div>
    );
};

export default Bookings;