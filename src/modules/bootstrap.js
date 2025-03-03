import authRouter from "./auth/auth.routes.js"
import commentRouter from "./comment/comment.routes.js"
import postRouter from "./post/post.routes.js"
import userRouter from "./user/user.routes.js"


export const bootstrap = (app) => {
    app.use('/users' , userRouter),
    app.use('/auth' , authRouter),
    app.use('/posts' , postRouter),
    app.use('/comments' , commentRouter)

}