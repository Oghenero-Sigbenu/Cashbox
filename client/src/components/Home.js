import React, { Component } from "react";
import { connect } from 'react-redux';
// import {NavLink} from "react-router-dom";

//actions
import { getAllUsers, getUserByName, setSelectedUser } from '../action/user';
import { addAttribute } from '../action/attributes';

//components
import Modal from "./common/Modal";
import Input from "./common/Input";

class Home extends Component {
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
    this.search = this.search.bind(this);
    this.navigate = this.navigate.bind(this);
	};
	componentDidMount() {
		this.props.getAllUsers()
		// this.props.setSelectedUser()
	};

	navigate(path) {
    this.setState({
      show: false
    });
    setTimeout(() => { 
      this.props.history.push(path);
    }, 500);
  };

  search = () => {
	const {name} = this.state;
	const surname = name;
	console.log(name)
	
	this.props.getUserByName(surname)
};

	getValue(e, disable) {
		const { weight, height, hair_colour} = this.state;
		const { value, name } = e.target;
		console.log(value)
    this.setState({
        [name]: value,
        close: false,
		disable: disable || (weight === "" || height === "" || hair_colour === "") ? true : false
    })
    
	};
	
	openModal = (user) => {
		console.log(user)
		this.props.setSelectedUser(user)
		this.setState({
			isShowing: true
		})
	};

	closeModal = () => {
		this.setState({
			isShowing: false
		})
	};

	addAttributes= (path) => {
		const {selectedUser} = this.props;
		const userId = selectedUser.id;
		const { weight, height, hair_colour,} = this.state;
		console.log(weight, height, hair_colour,userId)
		this.props.addAttribute(
			{weight, height, hair_colour,userId}
		)
		
		

		this.setState({
			isShowing: false,
			show: false
		})
		setTimeout(() => { 
			this.props.history.push(path);
		  }, 500);
	};
	
	render() {
		const { users , oneUser,isFound} = this.props;
		const { isShowing } = this.state;
		console.log(oneUser,isFound )
		return (
			<div>
				<div>
					<div><h2>Biodata</h2></div>
					<div><Input name="name" handleChange={this.getValue}/><button onClick={this.search}>Search</button></div>
				</div>
				{isFound ? 
				<div>
				<table>
					<tbody>
						<tr>
							<th>First Name</th>
							<th>Surname</th>
							<th>DOB</th>
							<th>Age</th>
							<th>Actions</th>
						</tr>
								<tr >
									<td>{oneUser.first_name}</td>
									<td>{oneUser.surname}</td>
									<td>{oneUser.DOB}</td>
									<td>{oneUser.age}</td>
									<td><button onClick={() => this.navigate(`/detail/${oneUser.id}`)}>Add attributes</button></td>
				<Modal show={isShowing} handleClose={this.closeModal} open={this.openModal}>
					<div>
						<Input label="Height(Inch):" placeHolder="5.5" name="height" handleChange={this.getValue}/>
						<Input label="Hair Color:" placeHolder="Black" name="hair_colour" handleChange={this.getValue} />
						<Input label="Weight(kg):" placeHolder="65" name="weight" handleChange={this.getValue} />
						<button onClick={() =>this.addAttributes()}>Add</button>
					</div>
				</Modal>
								</tr>
						
					</tbody>
				</table>
			</div> :
			<div>
				<table>
					<tbody>
						<tr>
							<th>First Name</th>
							<th>Surname</th>
							<th>DOB</th>
							<th>Age</th>
							<th>Actions</th>
						</tr>
						{users && users.map((user, index) => {
							return (
								<tr key={index}>
									<td>{user.first_name}</td>
									<td>{user.surname}</td>
									<td>{user.DOB}</td>
									<td>{user.age}</td>
									<td><button onClick={() => this.navigate(`/detail/${user.id}`)}>Add attributes</button></td>
				<Modal show={isShowing} handleClose={this.closeModal} open={this.openModal}>
					<div>
						<Input label="Height(Inch):" placeHolder="5.5" name="height" handleChange={this.getValue}/>
						<Input label="Hair Color:" placeHolder="Black" name="hair_colour" handleChange={this.getValue} />
						<Input label="Weight(kg):" placeHolder="65" name="weight" handleChange={this.getValue} />
						<button onClick={() =>this.addAttributes()}>Add</button>
					</div>
				</Modal>
								</tr>
							);
						})}
					</tbody>
				</table>
			</div>
			}
			</div>
		)
	}
};


const mapStateToProps = (state) => {
	const { users, isLoading, selectedUser, oneUser,isFound} = state.User;
	return {
		users,
		isLoading,
		selectedUser,oneUser,isFound
	}
};

export default connect(mapStateToProps, { getAllUsers, getUserByName, setSelectedUser,addAttribute })(Home);

