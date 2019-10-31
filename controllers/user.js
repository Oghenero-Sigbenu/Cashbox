const User = require("../model/User");

exports.addUser = (req, res, next) => {
	const { first_name, surname, DOB, age, height, hair_colour, weight } = req.body;
	if (!first_name || !surname || !DOB || !age) {
		return res.status(500).json({ msg: "All fields are required" })
	}
	User.create({
		first_name, surname, DOB, age, height, hair_colour, weight
	})
		.then(user => {
			res.status(200).json({ msg: "User created successfully", data: user })
		})
		.catch(err => {
			res.status(500).json({ msg: "Error occured", err })
		})
};

exports.getAllUsers = (req, res, next) => {
	User.findAll({
		include: [{
			all: true
		}]
	})
		.then(user => {
			res.status(200).json({ msg: "User found successfully", data: user })
		})
		.catch(err => {
			res.status(500).json({ msg: "Error occured" })
		})
};

exports.getUserByName = (req, res, next) => {
	const name = req.params.name;
	// const { surname, first_name } = req.body;
	User.findOne({
		where: {
			surname: name
		},
		include: [{
			all: true
		}]
	})
		.then(user => {
			res.status(200).json({ msg: "User found successfully", data: user })
		})
		.catch(err => {
			res.status(500).json({ msg: "Error occured" })
		})
};

exports.getUserById = (req, res, next) => {
	const id = req.params.id;
	User.findOne({
		where: {
			id
		}
	})
		.then(user => {
			res.status(200).json({ msg: "User found successfully", data: user })
		})
		.catch(err => {
			res.status(500).json({ msg: "Error occured" })
		})
};

exports.createAttributes = (req, res, next) => {
	const { height, hair_colour, weight } = req.body;
	const id = req.params.id;
	User.findByPk(id)
		.then((user) => {
			if (user) {
				user.update({
					height,
					hair_colour,
					weight
				})
					.then(attribute => {
						return res.status(200).json({ msg: "Attribute updated succesfully", data: attribute });
					}).catch((err) => {
						return res.status(500).json({ msg: "Something went wrong", error: err });
					})
			} else {
				return res.status(404).json({ msg: "Attribute not found" });
			}
		})
		.catch((err) => {
			return res.status(500).json({ msg: "Something went wrong", error: err });
		})
};

exports.updateAttributes = (req, res, next) => {
	const { height, hair_colour, weight } = req.body;
	const id = req.params.id;
	User.findByPk(id)
		.then((user) => {
			if (user) {
				user.update({
					height,
					hair_colour,
					weight
				})
					.then(attribute => {
						return res.status(200).json({ msg: "Attribute updated succesfully", data: attribute });
					}).catch((err) => {
						return res.status(500).json({ msg: "Something went wrong", error: err });
					})
			} else {
				return res.status(404).json({ msg: "Attribute not found" });
			}
		})
		.catch((err) => {
			return res.status(500).json({ msg: "Something went wrong", error: err });
		})
};

exports.deleteAttribute = (req, res, next) => {
	const id = req.params.id;
	User.findByPk(id)
		.then((user) => {
			if (user) {
				console.log(user.height)
						var height  = user.height
						var weight = user.weight
				user.destroy({
					where:{ height, weight
					}
				})
					.then(() => {
						return res.status(200).json({ msg: "Attribute deleted succesfully" });
					})
					.catch((err) => {
						return res.status(500).json({ msg: "Something went wrong", error: err });
					})
			} else {
				return res.status(404).json({ msg: "Attribute not found",err});
			}
		})
		.catch((err) => {
			return res.status(500).json({ msg: "Something went wrong", error: err });
		})
};

