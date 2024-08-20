import express, { Request, Response } from "express";
import { Express } from "express";
import { PrismaClient } from "@prisma/client";

const app: Express = express();
const PORT = 8080;

app.use(express.json());

const prisma = new PrismaClient();

app.get("/allTodos", async (req: Request, res: Response) => {
    const allTodos = await prisma.todo.findMany();
    return res.json(allTodos);
});

app.post("/createTodo", async (req: Request, res: Response) => {
    const { title, isCompleted } = req.body;
    const createTodo = await prisma.todo.create({
        data: {
            title,
            isCompleted,
        },
    });
    return res.json(createTodo);
});

app.put("/editTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, isCompleted } = req.body;
    const editTodo = await prisma.todo.update({
        where: { id },
        data: {
            title,
            isCompleted,
        },
    });
    return res.json(editTodo);
});

app.delete("/deleteTodo/:id", async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const deleteTodo = await prisma.todo.delete({
        where: { id },
    });
    return res.json(deleteTodo);
});

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
