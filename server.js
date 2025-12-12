// import express from "express";
// import fetch from "node-fetch";
// import cors from "cors";

// const app = express();
// app.use(cors());

// app.get("/cats", async (req, res) => {
//     try {
//         const response = await fetch( "https://cataas.com/api/cats?skip=0&limit=10" );
//         const data = await response.json();
//         res.json(data);
//         //console.log("Get Cats");
//     } catch (err) {
//         console.error(err);
//         res.status(500).json({ error: "Catless Catastrophy" });
//     }
// });

// app.listen(3000, () => console.log("Start Catfall"));

import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/cats", async (req, res) => {
    try {
        const { tags = "", limit = 10 } = req.query;

        let apiUrl = `https://cataas.com/api/cats?limit=${limit}`;

        if (tags) {
        // only add tags if it's not empty
        apiUrl = `https://cataas.com/api/cats?width=500&height=500&tags=${encodeURIComponent(tags)}&limit=${limit}`;
        }
        const response = await fetch(apiUrl);
        const data = await response.json();

        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Catless Catastrophy" });
    }
});

app.get("/tags", async (req, res) => {
    try {
        const response = await fetch("https://cataas.com/api/tags");
        const data = await response.json(); 
        res.json(data);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Could not fetch tags" });
    }
});

app.listen(3000, () => console.log("Start Catfall"));