const app = require("./app");

const PORT = process.env.PORT || 3050;

app.listen(PORT, () => console.log(`Listen to the port ${PORT} `));
