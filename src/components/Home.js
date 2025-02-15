import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Trash, Edit, List, Grid, Check, ArrowUpDown } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { auth } from "./Firebase";

const TaskManagement = ({ presentUser }) => {
  const [tasks, setTasks] = useState([
    { id: "1", title: "Interview with a Company", due: "2025-02-16", status: "TO-DO", category: "Work" },
    { id: "2", title: "Team Meeting", due: "2025-03-30", status: "TO-DO", category: "Personal" },
    { id: "3", title: "Appointment with a client", due: "2025-02-10", status: "IN-PROGRESS", category: "Work" },
    { id: "4", title: "Family Trip", due: "2025-01-14", status: "COMPLETED", category: "Personal" },
  ]);
  const [newTask, setNewTask] = useState("");
  const [viewMode, setViewMode] = useState("list");
  const [editingTask, setEditingTask] = useState(null);
  const [sortOrder, setSortOrder] = useState("asc");

  const addTask = () => {
    if (!newTask) return;
    setTasks([...tasks, { id: Date.now().toString(), title: newTask, due: "2025-02-28", status: "TO-DO", category: "Personal" }]);
    setNewTask("");
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleView = () => {
    setViewMode(viewMode === "list" ? "board" : "list");
  };

  const toggleSortOrder = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
  };

  const startEditing = (task) => {
    setEditingTask(task);
  };

  const saveEditing = () => {
    setTasks(tasks.map(task => task.id === editingTask.id ? editingTask : task));
    setEditingTask(null);
  };

  const taskCategories = ["TO-DO", "IN-PROGRESS", "COMPLETED"];

  const onDragEnd = (result) => {
    if (!result.destination) return;
    const updatedTasks = Array.from(tasks);
    const [movedTask] = updatedTasks.splice(result.source.index, 1);
    movedTask.status = result.destination.droppableId;
    updatedTasks.splice(result.destination.index, 0, movedTask);
    setTasks(updatedTasks);
  };

  return (
    <div className="task-container">
      <div className="header">
        <span className="user-email">Hello, {presentUser.email}</span>
        <button onClick={() => auth.signOut()} className="sign-out">Sign out</button>
      </div>

      <div className="task-controls">
        <input value={newTask} onChange={(e) => setNewTask(e.target.value)} className="task-input" placeholder="Add new task..." />
        <button onClick={addTask} className="btn purple"><Plus size={20} /></button>
        <button onClick={toggleView} className="btn gray">{viewMode === "list" ? <Grid size={20} /> : <List size={20} />}</button>
        <button onClick={toggleSortOrder} className="btn blue"><ArrowUpDown size={20} /></button>
      </div>

      <DragDropContext onDragEnd={onDragEnd}>
        {taskCategories.map((category) => (
          <Droppable key={category} droppableId={category}>
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps} className="task-category">
                <h2 className="category-title">{category}</h2>
                <AnimatePresence>
                  {[...tasks]
                    .filter((task) => task.status === category)
                    .sort((a, b) => (sortOrder === "asc" ? new Date(a.due) - new Date(b.due) : new Date(b.due) - new Date(a.due)))
                    .map((task, index) => (
                      <Draggable key={task.id} draggableId={task.id} index={index}>
                        {(provided) => (
                          <motion.div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="task-item"
                          >
                            {editingTask && editingTask.id === task.id ? (
                              <div className="edit-task">
                                <input className="edit-input" value={editingTask.title} onChange={(e) => setEditingTask({ ...editingTask, title: e.target.value })} />
                                <input className="edit-input" type="date" value={editingTask.due} onChange={(e) => setEditingTask({ ...editingTask, due: e.target.value })} />
                                <select className="edit-select" value={editingTask.category} onChange={(e) => setEditingTask({ ...editingTask, category: e.target.value })}>
                                  <option value="Work">Work</option>
                                  <option value="Personal">Personal</option>
                                </select>
                                <button className="btn green" onClick={saveEditing}><Check size={18} /></button>
                              </div>
                            ) : (
                              <span className="task-text">{task.title} ({task.due}) - {task.category}</span>
                            )}
                            <button className="btn blue me-2" onClick={() => startEditing(task)}><Edit size={18} /></button>
                            <button className="btn red" onClick={() => deleteTask(task.id)}><Trash size={18} /></button>
                          </motion.div>
                        )}
                      </Draggable>
                    ))}
                </AnimatePresence>
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default TaskManagement;
