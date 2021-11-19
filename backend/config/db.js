import mongoose from 'mongoose'

const DBConn = async () => {
	try {
		const conn = await mongoose.connect('mongodb://localhost:27017/social');
		console.log(`Database connected to ${conn.connection.host}`);
	} catch (error) {
		console.log(error);
	}
}

export default DBConn