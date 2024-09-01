//Create a web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.json());

// Create a new in-memory array that will store the comments
const comments = [];

// Create a new comment
app.post('/comments', (req, res) => {
  const { body } = req;
  const comment = {
    id: comments.length + 1,
    body,
  };
  comments.push(comment);
  res.json(comment);
});

// Get all comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Get a single comment
app.get('/comments/:id', (req, res) => {
  const { id } = req.params;
  const comment = comments.find(comment => comment.id === +id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  res.json(comment);
});

// Update a comment
app.put('/comments/:id', (req, res) => {
  const { id } = req.params;
  const { body } = req.body;
  const comment = comments.find(comment => comment.id === +id);
  if (!comment) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  comment.body = body;
  res.json(comment);
});

// Delete a comment
app.delete('/comments/:id', (req, res) => {
  const { id } = req.params;
  const index = comments.findIndex(comment => comment.id === +id);
  if (index === -1) {
    return res.status(404).json({ message: 'Comment not found' });
  }
  comments.splice(index, 1);
  res.json({ message: 'Comment deleted' });
});

// Start the server on port 3000
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});
//End of comments.js