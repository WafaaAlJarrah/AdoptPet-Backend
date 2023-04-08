import express from "express";
import { deleteUser, getUser, updateUser } from "../Controllers/UserController.js";

const UserRoute = express.Router();

UserRoute.get('/:id', getUser);
UserRoute.put('/:id', updateUser);
UserRoute.delete('/:id', deleteUser);

export default UserRoute;