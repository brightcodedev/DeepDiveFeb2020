const express = require('express');
const app = express();
const port = 8080;
const questionRoutes = require("./routes/questions");
const choiceRoutes = require("./routes/choices");

app.use( express.json() );
app.use( express.urlencoded({
  extended: true
}));

app.use('/questions', questionRoutes);
app.use('/choices', choiceRoutes);

// app.get('/:id', (req, res) =>{
//   console.log(req.params);//Path variable localhost:8080/12
//   console.log(req.query);//Query String localhost:8080?name=grace
//   console.log(req.body);//Via request body
//   res.send("Hello World");
// })

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
