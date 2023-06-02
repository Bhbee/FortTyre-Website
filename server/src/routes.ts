import express, { Express, Request, Response } from "express";

import { validateRequest, requiresUser } from "./middleware";
import { createUserHandler } from "./controllers/user.controller";
import { createUserSchema, createUserSessionSchema } from "./schema/user.schema";
import { createUserSessionHandler, invalidateUserSessionHandler, getUserSessionsHandler } from "./controllers/session.controller";

import { addProductSchema, updateProductSchema, deleteProductSchema } from "./schema/product.schema";
import {addProductHandler, updateproductHandler, getProductHandler, deleteproductHandler} from "./controllers/products.controllers";

//import {createOrderHandler, updateOrderHandler, getOrderHandler, deleteOrsdertHandler} from "./controllers/order.controller";
//import { createPostSchema, updatePostSchema, deletePostSchema } from "./schema/post.schema";

const app: Express = express();

// Register user
app.post("/api/users", validateRequest(createUserSchema), createUserHandler);

// Login
app.post(
  "/api/sessions",
  validateRequest(createUserSessionSchema),
  createUserSessionHandler
);

// Get the user's sessions
//app.get("/api/sessions", requiresUser, getUserSessionsHandler);

// Logout
app.delete("/api/sessions", requiresUser, invalidateUserSessionHandler);



// Add a product
app.post(
  "/api/products",
  [requiresUser, validateRequest(addProductSchema)],
  addProductHandler
);

// Update a product information
app.put(
  "/api/products/:productId",
  [requiresUser, validateRequest(updateProductSchema)],
  updateproductHandler
);

// Get a product
app.get("/api/products/:productId", getProductHandler);

// Delete a product
app.delete(
  "/api/posts/:postId",
  [requiresUser, validateRequest(deleteProductSchema)],
  deleteproductHandler
);

export default app;

 