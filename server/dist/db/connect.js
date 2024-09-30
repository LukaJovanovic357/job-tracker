import mongoose from 'mongoose';
const connectDB = (url) => mongoose.connect(url, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
});
export default connectDB;
//# sourceMappingURL=connect.js.map