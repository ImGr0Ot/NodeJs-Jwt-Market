import mongoose from "mongoose";

mongoose.connect("mongodb://127.0.0.1/Marketdb",{
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(db => console.log("DB is conected, seguro"))
    .catch(error => console.log(error))