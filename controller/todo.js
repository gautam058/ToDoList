const TodoModel = require('../model/user');

// Create and Save a new todo
exports.create = async (req, res) => {
    if (!req.body.title) {
        res.status(400).send({ message: "Title can not be empty!" });
        return;
    }
    
    const todo = new TodoModel({
        title: req.body.title,
        description: req.body.description,
        completed: req.body.completed || false,
        dueDate: req.body.dueDate
    });
    
    try {
        const data = await todo.save();
        res.send({
            message: "Todo created successfully!!",
            todo: data
        });
    } catch (err) {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the Todo"
        });
    }
};

// Retrieve all todos from the database
exports.findAll = async (req, res) => {
    try {
        const todos = await TodoModel.find();
        res.status(200).json(todos);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Find a single Todo by id
exports.findOne = async (req, res) => {
    try {
        const todo = await TodoModel.findById(req.params.id);
        if (!todo) {
            res.status(404).send({ message: "Todo not found" });
            return;
        }
        res.status(200).json(todo);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Update a todo by the id in the request
exports.update = async (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Data to update can not be empty!"
        });
        return;
    }

    const id = req.params.id;

    try {
        const todo = await TodoModel.findByIdAndUpdate(id, req.body, { useFindAndModify: false, new: true });
        if (!todo) {
            res.status(404).send({ message: "Todo not found" });
            return;
        }
        res.send({ message: "Todo updated successfully.", todo: todo });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};

// Delete a todo with the specified id in the request
exports.destroy = async (req, res) => {
    try {
        const todo = await TodoModel.findByIdAndRemove(req.params.id);
        if (!todo) {
            res.status(404).send({ message: "Todo not found" });
            return;
        }
        res.send({ message: "Todo deleted successfully!" });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};
