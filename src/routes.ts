import { Router } from "express";
import { UserController } from "./controllers/UserController";
import { CheckingAccountController } from "./controllers/CheckingAccountController";
import { StatementController } from "./controllers/StatementController";
import { AuthController } from "./controllers/AuthController";

const routes = Router();

const checkingAccountController = new CheckingAccountController();
const statementController = new StatementController();
const authController = new AuthController();

const path = "/checkingaccounts";

routes.get(path, (req, res, next) => {
    authController.authMiddleware(req, res, next); 
}, (req, res, next) => {
    checkingAccountController.getAll(req, res).catch(next); 
});

routes.get(`${path}/searchByName`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.getByName(req, res).catch(next);
});

routes.get(`${path}/:id`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.getById(req, res).catch(next);
});

routes.post(path, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.create(req, res).catch(next);
});

routes.put(`${path}/:id`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next); 
}, (req, res, next) => {
    checkingAccountController.update(req, res).catch(next);
});

routes.delete(`${path}/:id`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    checkingAccountController.delete(req, res).catch(next);
});

routes.post(`${path}/:id/deposit`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.deposit(req, res).catch(next);
});

routes.get(`${path}/:id/statement`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.getStatement(req, res).catch(next);
});

routes.get(`${path}/:id/balance`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.getBalance(req, res).catch(next);
});

routes.post(`${path}/:id/withdraw`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.withdraw(req, res).catch(next);
});

routes.get(`${path}/:id/statement/period`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.getByPeriod(req, res).catch(next);
});

routes.post(`${path}/:id/pix`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.pix(req, res).catch(next);
});

routes.post(`${path}/:id/ted`, (req, res, next) => { authController.authMiddleware }, (req, res, next) => {
    checkingAccountController.verifyIfExists(req, res, next);
}, (req, res, next) => {
    statementController.ted(req, res).catch(next);
});

const userController = new UserController();
const path_user = "/users";
const authController_User = new AuthController();
const userRoutes = Router();

userRoutes.post(path_user, (req, res, next) => { authController_User.authMiddleware }, (req, res, next) => { 
    userController.create(req, res).catch(next) });

userRoutes.get(path_user, (req, res, next) => { authController_User.authMiddleware }, (req, res, next) => { 
    userController.getAll(req, res).catch(next) });

userRoutes.get(`${path_user}/:id`, (req, res, next) => { authController_User.authMiddleware }, (req, res, next) => { 
    userController.getById(req, res).catch(next) });

userRoutes.delete(`${path_user}/:id`, (req, res, next) => { authController_User.authMiddleware }, (req, res, next) => { 
    userController.verifyIfExists, userController.delete(req, res).catch(next) });

userRoutes.put(`${path_user}/:id`, (req, res, next) => { authController_User.authMiddleware }, (req, res, next) => { 
    userController.verifyIfExists, userController.update(req, res).catch(next) });

userRoutes.post("/auth", (req, res, next) => { authController_User.authMiddleware });

export { routes }