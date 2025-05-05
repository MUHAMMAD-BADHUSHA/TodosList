const router = require("express").Router();
const todoModel = require('../Models/todoModel')
//post
router.post("/add", async (req, res) => {
    
    try {
        const todo = req.body.todo;
        if (!todo) {
            return res.status(500).json({ message: "todo not found" });
        }

        const newTodo =  new todoModel({todo});
        await newTodo.save();
        res.status(200).json({ success: true, message: "todo saved", data: newTodo });

    } catch (error) {

        console.error("Error message:", error);
        res.status(500).json({ success: false, message: error.message });

    }
});

//GET

router.get("/get", async (req, res) => {
    try {
 
        const todos = await todoModel.find()

        if (!todos) {
            res.status(500).json({ message: 'Todos Not Found' })
        }

        res.status(200).json({ success: true, data: todos })

    } catch (error) {

        console.error('Error fetching data:', error)
        res.status(500).json({ success: false, message: 'Error fetching data:', error })

    }
});

router.put("/update/:id", async (req, res) => {

    try {

        const { id } = req.params
        const updatedTodo = await todoModel.findByIdAndUpdate(id,{done:true})
        res.status(200).json({ success: true, message: 'todo deleted', data: updatedTodo })

    } catch (error) {
       console.error(error)
    }
});
router.delete("/delete/:id", async (req, res) => {
    
    try {
       
        const { id } = req.params
        const deleteTodo = await todoModel.findByIdAndDelete({ _id: id })
        res.status(200).json({ success: true, message: 'todo deleted', data: deleteTodo })

    } catch (err) {
        
        console.error(err, message)
        res.status(500).json({ success: false, message: 'server error', })
    }

});


module.exports = router