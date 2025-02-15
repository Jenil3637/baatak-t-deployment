import express, { urlencoded } from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./db/database.js";
import CartRoutes from "./routes/Cart.routes.js";
import UserRoutes from "./routes/User.routes.js";
import MenuRoutes from "./routes/menu.routes.js";
import OrderRoutes from "./routes/OrderHistory.routes.js";  
import path from "path";

// Load environment variables
dotenv.config();

const app = express();

const __dirname = path.resolve();
// Middleware configuration
app.use(express.json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));


// CORS Configuration 
const corsOptions = {
    origin: [
        "https://baattak.onrender.com" ,  
        "http://localhost:5173" ,
        "http://localhost:5000" ,
        "http://localhost:5174" ,
        "https://baattak-billing.vercel.app"
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Allow sending cookies and other credentials
    allowedHeaders: ['Content-Type', 'Authorization'], // Include custom headers if needed
};

// Apply CORS middleware
app.use(cors(corsOptions));

// Routes
app.use("/api/v1/customer", CartRoutes);
app.use("/api/v1/customer", UserRoutes);
app.use("/api/v1/customer", MenuRoutes)
app.use("/api/v1/customer", OrderRoutes)

// Database connection and server start
app.use(express.static(path.join(__dirname, "frontend/dist")));
app.get("*" , (_, res) => {
    res.sendFile(path.resolve(__dirname, "frontend" , "dist", "index.html"));
})

const port = process.env.PORT || 3001;

app.listen(port, async () => {
    try {
        await connectDB();
        console.log(`Server is running on port ${port}`);
    } catch (error) {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1); // Exit the process if the database connection fails
    }
});
