const { Connection } = require('tedious');

// 1. Configuration
const config = {
    server: 'DESKTOP-LL5AMB2\\SQLEXPRESS', // Your SQL Server instance
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',      // Your SQL username
            password: '12345678' // Your SQL password
        }
    },
    options: {
        database: 'TaskManagerDB', // Your database
        encrypt: true,             // Use true for secure connections
        trustServerCertificate: true, // Required for local self-signed certs
        connectTimeout: 15000
    }
};

// 2. Initialize Connection
const connection = new Connection(config);

// 3. Handle Connection Events
connection.on('connect', (err) => {
    if (err) {
        console.error("Connection Failed:", err.message);
    } else {
        console.log("Connected Successfully to TaskManagerDB");
        // You can run queries here later
    }
});

// 4. Global Error Handling
connection.on('error', (err) => {
    console.error("Unexpected Database Error:", err.code);
});

// 5. Start the connection
connection.connect();