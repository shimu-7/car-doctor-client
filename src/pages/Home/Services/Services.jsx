import { useEffect, useState } from "react";
import ServiceCard from "./ServiceCard";
import { axiosSecure } from "../../../hooks/useAxiosSecure";
import axios from "axios";


const Services = () => {

    const [services, setServices] = useState([]);
    const [asc, setAsc] = useState(true);
    const [search, setSearch]  = useState('')

    useEffect(()=>{
        // fetch('http://localhost:5000/services')
        // .then(res=>res.json())
        // .then(data=>setServices(data))

        axiosSecure(`http://localhost:5000/services?sort=${asc ? 'asc' : 'desc'}&&search=${search}`)
        .then(res=> setServices(res.data));
    },[asc,search])

    const handleSort = () =>{
        setAsc(!asc)
    }
    const handleSearch = e =>{
        e.preventDefault();
        const searchText = e.target.search.value;
        console.log(searchText);
        setSearch(searchText)
    }


    return (
        <div>
            <div className="text-center mt-10">
                <h3 className="text-2xl text-red-500 font-bold">Services</h3>
                <h3 className="text-4xl font-bold">Our Service Area</h3>
                <p>the majority have suffered alteration in some form, by injected humour, or randomized <br /> words which do not look even slightly believable. </p> 
                <form onSubmit={handleSearch}>
                    <input className=" border" type="text" name="search" />
                    <input className="btn btn-accent" type="submit" value="Search" />
                </form>
                <button onClick={handleSort} className="btn my-5 btn-accent">
                    {
                       asc ? 'Price: High to Low' : 'Price:  Low to High'
                    }
                    </button>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5">
                {
                    services.map(service=><ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;