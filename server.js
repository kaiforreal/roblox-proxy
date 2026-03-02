const express = require("express");
const axios = require("axios");

const app = express();
app.use(express.json());

app.post("/presence", async (req, res) => {
    try {
        const userIds = req.body.userIds;

        const response = await axios.post(
            "https://presence.roblox.com/v1/presence/users",
            { userIds: userIds }
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