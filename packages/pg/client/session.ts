import makePgSession from "connect-pg-simple";
import makeSession from "express-session";
import pool from "./pool";

const PgSession = makePgSession(makeSession);

// app.use(session)
const session = makeSession({
    store: new PgSession({
        pool, // Provide the database connection pool
    }),
    secret: 'your_session_secret',
    resave: false,
    saveUninitialized: false,
    cookie: { secure: false }, // Adjust as per your requirements
});

export default session;