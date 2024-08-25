const express = require('express');
const app = express();
app.use(express.json())


const mokusers = ([
  { id: 1, username: 'Jabbar', name: 'Altay' },
  { id: 2, username: 'guseynov', name: 'nemet' },
  { id: 3, username: 'mecitov', name: 'qedir' }
]);

app.get('/', (req, res) => {
  res.status(201).send('Hello, world!');
});



app.get('/api/users', (req, res) => {
  console.log(req.query);
  const {
    query:{filter,value},
  } = req;
// when filter and value undefined
  if(!filter && !value) return res.send(mokusers);

  if(filter && value) return res.send(
    mokusers.filter((user) => user[filter].includes(value)))

  return res.send(mokusers); 
});

app.post('/api/users',(req,res) =>{
  console.log(req.body)
  const {body}= req;
  const newuser = {id: mokusers[mokusers.length-1].id+1, ...body}
  mokusers.push(newuser)
  return res.status(201).json(newuser);
})

app.get('/api/users/:id',(req,res) => {
  console.log(req.params);
  const parsedId = parseInt(req.params.id);
  console.log(parsedId);

  if (isNaN(parsedId)) return res.status(400).send({msg:'Bad Request'});
  const findUser = mokusers.find((user) => user.id ===parsedId);

  if (!findUser) return  res.sendStatus(404);
  return res.send(findUser);
});


app.get('/api/products',(req,res) => {
  res.send([
    { id: 1, color: 'greeen', name: 'food' },
    { id: 2, color: 'white', name: 'notebook' },
    { id: 3, color: 'black', name: 'bag' }

  ])

})



const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
