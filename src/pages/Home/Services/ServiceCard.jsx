import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const ServiceCard = ({ service }) => {
    const { title, img, price, _id } = service;
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl">
                <figure className="px-10 pt-10">
                    <img src={img} alt="Shoes" className="rounded-xl h-60" />
                </figure>
                <div className="card-body  ">
                    <h2 className="card-title">{title}</h2>
                    <p className="text-red-500 font-medium">Price: ${price}</p>
                    <div className="card-actions justify-end">
                        <Link to={`/book/${_id}`}>
                            <button className="btn btn-primary">Book Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

ServiceCard.propTypes = {

    service: PropTypes.object
}

export default ServiceCard;