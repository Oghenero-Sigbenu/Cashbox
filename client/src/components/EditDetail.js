import React, { Component } from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave, faTimes } from '@fortawesome/free-solid-svg-icons';
// import Header from './common/Header';
// import Alert from './common/Alert';
import Input from "./common/Input"
import { editAttribute, getUserAttribute } from '../action/attributes';

class EditAttribute extends Component {
  constructor(props) {
    super(props);
    const { userAttribute } = this.props;
    this.state = {
      height: userAttribute && userAttribute.height ? userAttribute.height : "",
      weight: userAttribute && userAttribute.weight ? userAttribute.weight : "",
      hair_colour: userAttribute && userAttribute.hair_colour ? userAttribute.hair_colour : "",
      disable: true,
      show: true
    }

    this.navigate = this.navigate.bind(this);
    this.getValue = this.getValue.bind(this);
    this.submit = this.submit.bind(this);

  }

  componentDidMount() {
    const id = +this.props.match.params.id;
	// 	this.props.getUserById(id);
		this.props.getUserAttribute(id);
  }
  navigate(path) {
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.history.push(path);
    }, 500);
  }

  getValue(e, disable) {
    const { weight, height, hair_colour } = this.state;
		const { value, name } = e.target;
		console.log(value)
		this.setState({
			[name]: value,
			close: false,
      disable: disable || ( weight === "" || height === "" || hair_colour === "") ? true : false
    })

    
  }

  submit(path) {
    const id = +this.props.match.params.id;
    const userId = id; 
    const { weight, height, hair_colour } = this.state;
    console.log(weight, height, hair_colour, userId)
    this.props.editAttribute({weight, height, hair_colour, userId});
    this.setState({
      show: false
    });
    setTimeout(() => {
      this.props.history.push(path);
    }, 500);

  }

  render() {
    const { weight, height, hair_colour, disable } = this.state;
    const { userAttribute } = this.props;
    console.log(userAttribute)
    // const alertMsg = msg ? <Alert classStyle="red" msg={msg} /> : "";

    return (
      <>
        {/* <Header /> */}
        <div className="container">
          <div style={{ width: '100%' }}>
            <h2>Edit Profile</h2>
            {/* <div className="alert-style">{alertMsg}</div> */}
            <Input  label="Weight(kg)" type="text" value={weight} name="weight" handleChange={this.getValue} />
            <Input placeHolder="5Inch" label="Height(Inch)" type="email" value={height} name="height" handleChange={this.getValue} />
            <Input placeHolder="Black" label="Hair Colour" type="text" value={hair_colour} name="hair_colour" handleChange={this.getValue} />
          </div>

          <div className="bottom-menu two">
            <div className="menu-item">
              <div className="menu-content" onClick={() => this.navigate(`/detail/${userAttribute.userId}`)}>
                <FontAwesomeIcon icon={faTimes} />
                <p>Cancel</p>
              </div>
            </div>
            {!disable ?
              <div className="menu-item">
                <div className="menu-content" onClick={() => this.submit(`/detail/${userAttribute && userAttribute.userId}`)}>
                  <FontAwesomeIcon icon={faSave} />
                  <p>Save</p>
                </div>
              </div>
              : "" 
             } 
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
	const { isLoading, user, isUpdated } = state.User;
	const {  userAttribute } = state.Attributes;
	return {
		isLoading,
		user,
		userAttribute,isUpdated
	}
};

export default connect(mapStateToProps, {editAttribute, getUserAttribute})(EditAttribute);

