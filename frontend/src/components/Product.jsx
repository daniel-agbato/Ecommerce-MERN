import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import Rating from "../components/Rating";

const Product = ({ product }) => {
	return (
		<>
			<Card className="my-3 p-3 rounded">
				<Link to={`/product/${product._id}`}>
					<Card.Img src={product.image} variant="top" />
				</Link>
				<Card.Body>
					<Link to={`/product/${product._id}`}>
						<Card.Title as="div" src={product.image} variant="top">
							<strong>{product.name}</strong>
						</Card.Title>
					</Link>
					<Card.Text as="div">
						<Rating value={product.rating} reviews={product.numReviews} />
					</Card.Text>
					<Card.Text as="h3">${product.price}</Card.Text>
				</Card.Body>
			</Card>
		</>
	);
};

Product.propTypes = {
	product: PropTypes.object,
};

export default Product;
