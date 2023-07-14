const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const User = require('./models/User')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const auth = require('./middleware/auth');

dotenv.config();

const app = express();
app.use(express.json())

// connect DB

// routes
app.post('/register', async (req, res) => {
    try {
        const { name, lastname, email, password } = req.body;
    
        if (!name && !lastname && !email && !password) {
            res.status(404).send('Please enter')
        };
        
        // Check Old User
        const oldUser = await User.findOne({email});
    
        if (oldUser) {
            return res.status(404).send('User already exists')
        };
    
        // Encrypt Password
        encryptPassword = await bcrypt.hash(password, 10)
    
        // Add data to Database
        const user = await User.create({
            name,
            lastname,
            email: email.toLowerCase(),
            password: encryptPassword
        });
    
        // Create Token
        const token = jwt.sign(
            { user_id: user._id , email },
            process.env.JWT,
            {
                expiresIn: "1d"
            }
        )
        
        // Save user token
        user.token = token;
    
        // return new user
        res.status(200).json(user);
    } catch (error) {
        console.log(error);
    }
});

app.post('/login', async (req, res) => {
    try {
        // Get User Input
        const { email, password } = req.body;

        // Validate user input
        if (!email && !password) {
            res.status(404).send('All input is required');
        };

        // Validate is user exists
        const user = await User.findOne({ email });

        // compare password
        if (user && (await bcrypt.compare(password, user.password))) {
            // create token
            const token = jwt.sign(
                { user_id: user._id , email },
                process.env.JWT,
                {
                    expiresIn: "1d"
                }
            )

            // Save user token
            user.token = token;

            res.status(200).json(user);
        }

        res.status(404).send('Invalid credentials');
    } catch (error) {
        console.log(error);
    }
});

app.post('/welcome', auth, (req, res) => {
    res.status(200).send('Welcome');
})

// Start Server
const port = process.env.PORT;

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(port, console.log(`Server listening on port ${port}...`));
    } catch (error) {
        console.log(error);
    }
};

start();