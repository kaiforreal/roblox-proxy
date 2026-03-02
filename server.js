const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/presence", async (req, res) => {
    try {
        const userIds = req.body.userIds; // array of numbers
        if (!userIds || userIds.length === 0) {
            return res.status(400).json({ error: "No userIds provided" });
        }

        const query = userIds.join(",");
        const response = await axios.post(
    "https://presence.roblox.com/v1/presence/users",
    { userIds }, // JSON body
    {
        headers: {
            "Content-Type": "application/json"
        }
    }
);

        res.json(response.data);
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "Failed to fetch presence" });
    }
});

app.listen(3000, () => {
    console.log("Proxy running on http://localhost:3000");
});
