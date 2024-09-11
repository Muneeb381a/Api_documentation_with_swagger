import { Router } from "express";
const userRouter = Router();

/** Import all controllers */
import * as controller from "../controllers/userController.js";
import Auth from "../middleware/auth.js";

/**
 * OpenAPI Documentation
 *
 * @openapi
 * /api/user/register:
 *   post:
 *     tags:
 *       - User Controller
 *     summary: Create a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *               - password
 *             properties:
 *               username:
 *                 type: string
 *                 default: muneeb
 *               email:
 *                 type: string
 *                 default: muneeb@mail.com
 *               password:
 *                 type: string
 *                 default: muneeb!@
 *     responses:
 *       201:
 *         description: Created
 *       409:
 *         description: Conflict
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */

/** POST Methods */
userRouter.route("/register").post(controller.register); // Register user
userRouter.route("/login").post(controller.verifyUser, controller.login); // Login in app
userRouter
  .route("/verify")
  .post(controller.verifyUser, (req, res) => res.end()); // Authenticate user

/**
 * @openapi
 * /api/user/{username}:
 *   get:
 *     tags:
 *       - User Controller
 *     summary: Get a user by username
 *     parameters:
 *       - name: username
 *         in: path
 *         description: The username of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Fetched Successfully
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
userRouter.route("/:username").get(controller.getUser); // Get user by username

/**
 * @openapi
 * /api/user/update:
 *   put:
 *     tags:
 *       - User Controller
 *     summary: Modify a user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *             properties:
 *               userId:
 *                 type: string
 *                 default: ''
 *               firstName:
 *                 type: string
 *                 default: ''
 *               lastName:
 *                 type: string
 *                 default: ''
 *     responses:
 *       200:
 *         description: Modified
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
userRouter.route("/update").put(controller.updateUser); // Update user profile

/**
 * @openapi
 * /api/user/{userId}:
 *   delete:
 *     tags:
 *       - User Controller
 *     summary: Delete user by Id
 *     parameters:
 *       - name: userId
 *         in: path
 *         description: The unique Id of the user
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Removed
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Not Found
 *       500:
 *         description: Server Error
 */
userRouter.route("/:userId").delete(controller.deleteUser); // Delete user

export default userRouter;
