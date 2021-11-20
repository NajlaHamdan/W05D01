const express=require("express");
const app=express();
const port =5000;
app.use(express.json());

const tasks=[{id:1,taskName:"WakeUp",isCompleted:false},{id:2,taskName:"WakeUp",isCompleted:false},
{id:3,taskName:"WakeUp",isCompleted:true},{id:4,taskName:"WakeUp",isCompleted:false}]

//get request
//http://localhost:5000/tasks
app.get("/tasks",(req,res)=>{
    //get all tasks
    res.json(tasks);
    res.status(200);
})

//post request
//http://localhost:5000/create?taskName=codeing
app.post("/create",(req,res)=>{
    //take task name from query
    const taskName=req.query.taskName;
    //push new object to tasks array
    tasks.push({id:tasks.length,taskName:taskName,isCompleted:false})
    res.json(tasks);
    res.status(200);
})

//put request 
//http://localhost:5000/update?id=2&taskName=eat
app.put('/update',(req,res)=>{
    //take params by query
    const id=req.query.id;
    const taskName=req.query.taskName;
    //find index to update specific element
    const funded=tasks.find(item => item.id==id);
    const index=tasks.indexOf(funded);
    //create new object to assign new task
    const newTask={id:id,taskName:taskName,isCompleted:false}
    tasks.splice(index,1,newTask);
    res.json(tasks);
    res.status(200);
})


//delete request
//http://localhost:5000/remove?id=3
app.delete("/remove",(req,res)=>{
    //take params by query
    const id=req.query.id;
    //find index to update specific element
    const funded=tasks.find(item => item.id==id);
    const index=tasks.indexOf(funded);
    //delete element
    tasks.splice(index,1);
    res.json(tasks);
    res.status(200);
})

//-------------------Extra Function----------------
app.get("/getTaskById",(req,res)=>{
    const id=req.body.id;
    const task=tasks.find(item=>item.id==id);
    res.json(task);
    res.status(200);
})


app.get("/getCompletedTasks",(req,res)=>{
    const task=tasks.filter(item=>item.isCompleted==true);
    res.json(task);
    res.status(200);
})

app.get("/getUnCompletedTasks",(req,res)=>{
    const task=tasks.filter(item=>!item.isCompleted);
    res.json(task);
    res.status(200);
})



app.delete("/removeCompletedTasks",(req,res)=>{
    //find index to update specific element
    const funded=tasks.filter(item => item.isCompleted);
    const index=tasks.indexOf(funded);
    //delete element
    tasks.splice(index,1);
    res.json(tasks);
    res.status(200);
})

app.delete("/removeUnCompletedTasks",(req,res)=>{
    //find index to update specific element
    const funded=tasks.filter(item => !item.isCompleted);
    const index=tasks.indexOf(funded);
    //delete element
    tasks.splice(index,1);
    res.json(tasks);
    res.status(200);
})

app.delete("/removeAllTasks",(req,res)=>{
    //delete all tasks
    tasks.length=0;
    res.json(tasks);
    res.status(200);
})

app.listen(port,()=>{
    console.log(`app run on port=${port}`);
})
