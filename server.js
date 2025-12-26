const express = require("express");
const { Connection, Request } = require("tedious");

const app = express();
app.use(express.json()); // To parse JSON bodies

// --------------------
// 1. Database Configuration
// --------------------
const config = {
    server: 'DESKTOP-LL5AMB2\\SQLEXPRESS', // Update with your instance
    authentication: {
        type: 'default',
        options: {
            userName: 'sa',       // Your SQL username
            password: '12345678'  // Your SQL password
        }
    },
    options: {
        database: 'TaskManagerDB',
        encrypt: true,
        trustServerCertificate: true,
        connectTimeout: 15000
    }
};

// --------------------
// 2. Function to run stored procedure
// --------------------
function updateTaskStatus(taskId, newStatus) {
    return new Promise((resolve, reject) => {
        const connection = new Connection(config);

        connection.on("connect", (err) => {
            if (err) {
                reject(err);
            } else {
                const request = new Request(
                    "UpdateTaskStatus",
                    (err) => {
                        connection.close();
                        if (err) reject(err);
                        else resolve("Status updated successfully.");
                    }
                );

                // Add procedure parameters
                request.addParameter("TaskID", TYPES.Int, taskId);
                request.addParameter("NewStatus", TYPES.NVarChar, newStatus);

                connection.callProcedure(request);
            }
        });

        connection.connect();
    });
}

// --------------------
// 3. API Endpoint
// --------------------
app.post("/update-status", async (req, res) => {
    const { taskId, newStatus } = req.body;

    if (!taskId || !newStatus) {
        return res.status(400).send("taskId and newStatus are required.");
    }

    try {
        const result = await updateTaskStatus(taskId, newStatus);
        res.send(result);
    } catch (err) {
        res.status(400).send(err.message);
    }
});

// --------------------
// 4. Start Server
// --------------------
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});