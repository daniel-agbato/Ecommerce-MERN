import React, { useEffect } from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Table, Button, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Message from "../../components/Message";
import Loader from "../../components/Loader";
import { getOrderList } from "../../reducers/orderReducers";

const OrderListScreen = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { userInfo } = useSelector((store) => store.user);
	const { orders, isLoading, error } = useSelector((store) => store.orderList);

	useEffect(() => {
		if (userInfo && userInfo.isAdmin) {
			dispatch(getOrderList());
		} else {
			navigate("/login");
		}
	}, [dispatch, navigate, userInfo]);

	return (
		<>
			<Row className="align-items-center">
				<Col>
					<h1>Orders</h1>
				</Col>
			</Row>
			{isLoading ? (
				<Loader />
			) : error ? (
				<Message variant="danger">{error}</Message>
			) : (
				<Table striped bordered hover responsive className="table-sm">
					<thead>
						<tr>
							<th>ID</th>
							<th>USER</th>
							<th>DATE</th>
							<th>TOTAL</th>
							<th>PAID</th>
							<th>DELIVERED</th>
							<th>ACTIONS</th>
						</tr>
					</thead>
					<tbody>
						{orders.map((order) => (
							<tr key={order._id}>
								<td>{order._id}</td>
								<td>{order.user && order.user.name}</td>
								<td>{order.createdAt.substring(0, 10)}</td>
								<td>${order.totalPrice}</td>
								<td>
									{order.isPaid ? (
										order.paidAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									{order.isDelivered ? (
										order.deliveredAt.substring(0, 10)
									) : (
										<i className="fas fa-times" style={{ color: "red" }}></i>
									)}
								</td>
								<td>
									<LinkContainer to={`/order/${order._id}`}>
										<Button variant="light" className="btn-sm">
											Details
										</Button>
									</LinkContainer>
								</td>
							</tr>
						))}
					</tbody>
				</Table>
			)}
		</>
	);
};

export default OrderListScreen;
