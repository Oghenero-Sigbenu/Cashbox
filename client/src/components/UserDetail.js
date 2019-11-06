import React, { Component } from "react";
import { connect } from 'react-redux';
import {NavLink} from "react-router-dom";

//actions
import { getUserById } from '../action/user';
import {  getUserAttribute, addAttribute, deleteAttribute } from '../action/attributes';

//components
import Modal from "./common/Modal";
import Input from "./common/Input";
import Spinner from "./common/Spinner";

class UserDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowing: false,
			show: true,
			weight: "",
			height: "",
			hair_colour: "",
			disable: true,
		}
		this.getValue = this.getValue.bind(this);
		this.submit = this.submit.bind(this);
		this.delete = this.delete.bind(this);
		this.navigate = this.navigate.bind(this);
	};
	componentDidMount() {
		const id = +this.props.match.params.id;
		this.props.getUserById(id);
		this.props.getUserAttribute(id)
	};
	navigate(path) {
		this.setState({
		  show: false
		});
		setTimeout(() => { 
		  this.props.history.push(path);
		}, 500);
	  };
	getValue(e, disable) {
		const { weight, height, hair_colour } = this.state;
		const { value, name } = e.target;
		this.setState({
			[name]: value,
			close: false,
			disable: disable || ( weight === "" || height === "" || hair_colour === "") ? true : false
		})
		
	};

	submit() {
		const { user } = this.props;
		const userId = user.id;
		const { weight, height, hair_colour, } = this.state;
		this.props.addAttribute(
			{ weight, height, hair_colour, userId}
		)
		this.setState({
			isShowing: false
		})
	};

	openModal = () => {
		this.setState({
			isShowing: true
		})
	};

	delete = () => {
		const id = +this.props.match.params.id;
		const userId = id;
		console.log(userId )
		this.props.deleteAttribute(userId)

	}
	closeModal = () => {
		this.setState({
			isShowing: false
		})
	};

	

	render() {
		const { user, userAttribute, isLoading,isCreated } = this.props;
		const { isShowing } = this.state;
		console.log(user,isCreated ,)
		return (
			<div className="Container">
				{isLoading ? <Spinner/> :
				<>
				<NavLink to="/"><h2>User Biodata</h2></NavLink>
				<div className="detail">
				<span><h4>First Name:</h4>{user && user.first_name}</span>
				<span><h4>Surname:</h4>{user && user.surname}</span>
				<span><h4>DOB:</h4>{user && user.DOB}</span>
				<span><h4>Age:</h4>{user && user.age}</span>
				</div>
				<div className="atribute">
					<h3>Attriutes</h3>
				{isLoading ? <Spinner/> :
				<div className="attributes">
					<span><h4>Height:</h4>{userAttribute && userAttribute.height}</span>
					<span><h4>Weight:</h4>{userAttribute && userAttribute.weight}</span>
					<span><h4>Hair Color:</h4>{userAttribute && userAttribute.hair_colour}</span>
				</div>
				  }
				</div>
				<div className="btn">
				<NavLink to={`/edit/${userAttribute && userAttribute.userId}`}><button>Edit</button></NavLink>
				<button onClick={this.delete}>Delete</button>
				{userAttribute ? "" :  <button onClick={this.openModal}>Add attributes</button>}
				</div>
				<Modal show={isShowing} handleClose={this.closeModal} open={this.openModal}>
					<div>
						<Input label="Height(Inch):" placeHolder="5.5" name="height" handleChange={this.getValue} />
						<Input label="Hair Color:" placeHolder="Black" name="hair_colour" handleChange={this.getValue} />
						<Input label="Weight(kg):" placeHolder="65" name="weight" handleChange={this.getValue} />
						<button onClick={this.submit}>Add</button>
					</div>
				</Modal>
				</>
				}
			</div>
		)
	}
};


const mapStateToProps = (state) => {
	const { isLoading, user,  } = state.User;
	const {  userAttribute, isCreated } = state.Attributes;
	return {
		isLoading,
		user,
		userAttribute,isCreated 
	}
};

export default connect(mapStateToProps, { getUserById, addAttribute, getUserAttribute, deleteAttribute })(UserDetail);

