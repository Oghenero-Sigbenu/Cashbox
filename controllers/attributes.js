const Attributes = require("../model/Attributes");

exports.addAttributes = (req, res, next) => {
	const { height, hair_colour, weight, userId } = req.body;
	if (!height || !hair_colour || !weight) {
		return res.status(500).json({ msg: "All fields are required" })
	}
	Attributes.findOne({
		where: {
			userId
		}
	})
	.then(user => {
		if (user) {
			return res.status(500).json({ msg: "User already added attribute" })
		}else{
			Attributes.create({
				height, hair_colour, weight, userId
			})
				.then(attribute => {
					res.status(200).json({ msg: "Attributes created successfully", data: attribute })
				})
				.catch(err => {
					res.status(500).json({ msg: "Error occured", err })
				})
		}
	})
	.catch(err => {
		res.status(500).json({ msg: "Error occured", err })
	})
};

exports.getAttributes = (req, res, next) => {
	const id = req.params.id;
	Attributes.findByPk(id)
		.then((attributes) => {
			if (attributes) {
				return res.status(200).json({ msg: "Attributes found succesfully", data: attributes });
			} else {
				return res.status(404).json({ msg: "Attributes not found" });
			}
		})
		.catch((err) => {
			return res.status(500).json({ msg: "Something went wrong", error: err });
		})
};

exports.getUserAttribute = (req, res, next) => {
	const id = req.params.id;

	Attributes.findOne({
		where: {
			userId: id
		}
	})
		.then((attributes) => {
				return res.status(200).json({ msg: "Attributes found succesfully", data: attributes });
		})
		.catch((err) => {
			return res.status(500).json({ msg: "Something went wrong", error: err });
		})
};

exports.updateAttributes = (req, res, next) => {
	const { height, hair_colour, weight } = req.body;
	const id = req.params.id;
	Attributes.findOne({
        where:{
            userId: id
        }
    })
		.then((attribute) => {
			if (attribute) {
				attribute.update({
					height,
					hair_colour,
					weight
				})
					.then(attribute => {
						return res.status(200).json({ msg: "Attribute update succesfully", data: attribute });
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
	Attributes.findOne({
        where:{
            userId: id
        }
    })
		.then((attribute) => {
			if (attribute) {
				attribute.destroy()
					.then(() => {
						return res.status(200).json({ msg: "Attribute deleted succesfully" });
					})
					.catch((err) => {
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


