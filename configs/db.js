// const mongoose = require('mongoose');



// const connectDB = () => {
//   mongoose
//     .connect('mongodb://localhost:27017')
//     .then(() => console.log('Connected to DB'))
//     .catch((error) => console.log(error));
// };


// module.exports = {
//   connectDB
//   };
// connectDB();

// require('dotenv').config();
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     await mongoose.connect('mongodb+srv://adirechavi:vowwbPQvCPPk6iyE@cluster0.z3r5r.mongodb.net/yekev?retryWrites=true&w=majority&appName=Cluster0'
//       , {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB Atlas');

//   } catch (error) {
//     console.error('Error connecting to MongoDB:', error);
//     process.exit(1);
//   }
// };

require('dotenv').config(); // Load environment variables

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("❌ MONGO_URI is missing in environment variables");
    }

    await mongoose.connect(process.env.MONGO_URI);
    mongoose.set('strictQuery', true);
    
    console.log('✅ Connected to MongoDB Atlas');
  } catch (error) {
    console.error('❌ MongoDB Connection Error:', error);
    process.exit(1);
  }
};



module.exports = connectDB;
connectDB();







