import { connect } from "mongoose";




export const dbConn = connect('mongodb://localhost:27017/Assignment_5')
.then(() => {
    console.log("database Connected Successfully");
})