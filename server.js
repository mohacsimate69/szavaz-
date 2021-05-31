const express = require("express");
const app = express();
app.get("/hello", function(request, response)  {
    response.end("helloszia")
})
app.listen(9000);
app.use(express.static("public"));