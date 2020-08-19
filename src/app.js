const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
    response.status(200).json(repositories);
});

app.post("/repositories", (request, response) => {
  const { title, url, techs } = request.body

  const repository = { id:uuid(), title, url, techs, likes: 0 }

  repositories.push(repository)

  response.status(201).json(repository);
});

app.put("/repositories/:id", (request, response) => {
  //ROUTES PARAMS
  const { id } = request.params
  //BODY REQUEST
  const { title, url, techs } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);
  
  if(repositoryIndex < 0){
      return response.status(400).json({ 
          message: 'Repository not found!'
      })
  }

  const repository = { id, title, url, techs, likes: 0 }

  repositories[repositoryIndex] = repository

  response.status(200).json(repository);
});

app.delete("/repositories/:id", (request, response) => {
  
  //ROUTES PARAMS
  const { id } = request.params

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
      return response.status(400).json({ 
          message: 'Repository not found!'
      })
  }
  
  repositories.splice(repositoryIndex, 1);

  response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params

  //BODY REQUEST
  const { title, url, techs, likes } = request.body

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if(repositoryIndex < 0){
      return response.status(400).json({ 
          message: 'Repository not found!'
      })
  }

  repositories[repositoryIndex].likes += 1
  const repository = repositories[repositoryIndex]

  response.status(201).json(repository)
  
});

module.exports = app;
