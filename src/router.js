const { Router } = require('express');
const router = Router();
const _ = require('underscore');
const db = require('megadb');
const tasks = new db.crearDB('tasks');
async function returnTasks (tasks) {return await tasks.obtener('root');}
let allTasks = returnTasks(tasks);


//obtenemos todas las tareas
router.get('/', (req, res) => {res.redirect('/tasks')});
router.get('/tasks', async  (req, res) => { 
    res.json(allTasks);
});

//filtramos tareas
router.get('/tasks/id/:id',async (req, res) => {
    let id = req.params.id;
    for(let task of allTasks) {
        if(task.id == id) {
            return res.json(task);
        }
    }
    return res.send(false);
});
router.get('/tasks/category-state/:category_state', (req, res) => {
    let properties = req.params.category_state;
    let prop = properties.split("-");
    let newTasks = [];
    for (let task of allTasks) {
        if(task.category == prop[0] && task.state == prop[1]) {
            newTasks.push(task);
        }
    }
    return res.json(newTasks);
});
router.get('/tasks/category/:category', (req, res) => {
    let category = req.params.category;
    let newTasks = [];
    for (let task of allTasks) {
        if(task.category == category) {
            newTasks.push(task);
        }
    }
    return res.json(newTasks);
});
router.get('/tasks/state/:state', (req, res) => {
    let state = req.params.state;
    let newTasks = [];
    for (let task of allTasks) {
        if(task.state == state) {
            newTasks.push(task);
        }
    }
    return res.json(newTasks);
});

//creamos una tarea nueva
router.post('newtask', (req, res) => {
    let { name, shortName, endAt, description } = req.body;
    if(name && shortName && endAt && description) {
        let newTask = {name, shortName, endAt, description, numberId: allTasks.length + 1, state: "unstart"};
        tasks.push('root', newTask);
        res.json(newTask);
    } else {
        res.send("missing data");
    }
})

//actualizamos una tarea
router.put('/:id/:data', (req, res) => {
    let { data, id } = req.params;
    let value = req.body.value;
    _.each(allTasks, (task, i) => {
        if(task.id == id) {
            tasks.extract('root', task);
            task[data] = value;
            tasks.push('root', task);
            return res.json(task);
        }
    });
    return res.status(404).send("not found");
});

//eliminamos una tarea
router.delete('/:id', async (req, res) => {
    let id = req.params.id;
    _.each(allTasks, (task, i) => {
        if(task.id == id) {
            tasks.extract('root', task);
            return res.json(allTasks);
        }
    });
    res.status(404).send("not found");
})

module.exports = router;