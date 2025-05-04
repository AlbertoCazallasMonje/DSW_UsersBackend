/* @swagger
* tags:
    *   - name: Users
*     description: Endpoints related to user management (Backend 3000)
*   - name: Sessions
*     description: Endpoints related to session management (Backend 3000)
*   - name: Actions
*     description: Endpoints related to action management (Backend 3000)
*/

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "12345678A"
 *               name:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               age:
 *                 type: integer
 *                 example: 30
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *               address:
 *                 type: string
 *                 example: "123 Main Street"
 *               country:
 *                 type: string
 *                 example: "US"
 *     responses:
 *       201:
 *         description: User successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User created successfully"
 *       400:
 *         description: Invalid request data
 */

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Authenticate a user and return a JWT token
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "securepassword123"
 *     responses:
 *       200:
 *         description: Authentication successful, returns JWT token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "jwt-token-here"
 *       400:
 *         description: Invalid credentials
 */

/**
 * @swagger
 * /update:
 *   put:
 *     summary: Update an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *                 example: "jwt-token-here"
 *               dni:
 *                 type: string
 *                 example: "12345678A"
 *               name:
 *                 type: string
 *                 example: "John"
 *               lastName:
 *                 type: string
 *                 example: "Doe"
 *               age:
 *                 type: integer
 *                 example: 30
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               password:
 *                 type: string
 *                 example: "newsecurepassword123"
 *               address:
 *                 type: string
 *                 example: "123 New Street"
 *               country:
 *                 type: string
 *                 example: "US"
 *     responses:
 *       200:
 *         description: User successfully updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User updated successfully"
 *       400:
 *         description: Error in request data or invalid token
 */

/**
 * @swagger
 * /delete:
 *   delete:
 *     summary: Delete an existing user
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               dni:
 *                 type: string
 *                 example: "12345678A"
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *     responses:
 *       200:
 *         description: User successfully deleted
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User deleted successfully"
 *       400:
 *         description: Invalid request data or tokens
 */

/**
 * @swagger
 * /findUser:
 *   post:
 *     summary: Find a user by session and action tokens
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *     responses:
 *       200:
 *         description: User found successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   type: object
 *       404:
 *         description: User not found
 */

/**
 * @swagger
 * /action/validate:
 *   post:
 *     summary: Validate an action token with a given action code
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *               actionCode:
 *                 type: string
 *                 example: "CREATE-CARD"
 *     responses:
 *       200:
 *         description: Action token validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token validated successfully"
 *       400:
 *         description: Invalid tokens or action code
 */

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Log out the current user session
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *     responses:
 *       200:
 *         description: User session closed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User logged out successfully"
 *       400:
 *         description: Invalid session token
 */

/**
 * @swagger
 * /session/validate:
 *   post:
 *     summary: Validate the current user session
 *     tags: [Sessions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *     responses:
 *       200:
 *         description: Session validated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 valid:
 *                   type: boolean
 *                   example: true
 *       400:
 *         description: Invalid session token
 */

/**
 * @swagger
 * /action:
 *   post:
 *     summary: Obtain an action code for a given session token
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionCode:
 *                 type: string
 *                 example: "VALIDATE-CARD"
 *     responses:
 *       200:
 *         description: Action code retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: string
 *                   example: "action-code-here"
 *       400:
 *         description: Invalid request data or tokens
 */

/**
 * @swagger
 * /passwordUpdate/{actionToken}:
 *   put:
 *     summary: Reset password using an action token
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: actionToken
 *         schema:
 *           type: string
 *         required: true
 *         description: Action token for password reset
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               newPassword:
 *                 type: string
 *                 example: "newSecurePassword123"
 *     responses:
 *       200:
 *         description: Password updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Password successfully updated."
 *       400:
 *         description: Invalid token or request data
 */

/**
 * @swagger
 * /findByEmail:
 *   post:
 *     summary: Find a user’s DNI by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               findReceiverToken:
 *                 type: string
 *                 example: "action-token-here"
 *               email:
 *                 type: string
 *                 example: "anotheruser@example.com"
 *     responses:
 *       200:
 *         description: DNI returned successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 u_dni:
 *                   type: string
 *                   example: "87654321B"
 *       400:
 *         description: Invalid tokens or email not found
 */

/**
 * @swagger
 * /adminLoadUsers:
 *   post:
 *     summary: Load full list of users (admin only)
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *     responses:
 *       200:
 *         description: List of all users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dni:
 *                     type: string
 *                   name:
 *                     type: string
 *                   lastName:
 *                     type: string
 *                   age:
 *                     type: integer
 *                   email:
 *                     type: string
 *                   address:
 *                     type: string
 *                   country:
 *                     type: string
 *       400:
 *         description: Invalid tokens or insufficient permissions
 */

/**
 * @swagger
 * /frequentUsers:
 *   post:
 *     summary: Get most frequent users
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *               limit:
 *                 type: integer
 *                 example: 5
 *     responses:
 *       200:
 *         description: List of most frequent users
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   dni:
 *                     type: string
 *                   name:
 *                     type: string
 *                   email:
 *                     type: string
 *                   visitCount:
 *                     type: integer
 *       400:
 *         description: Invalid tokens or parameters
 */

/**
 * @swagger
 * /blockUser:
 *   post:
 *     summary: Block a user by email
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sessionToken:
 *                 type: string
 *                 example: "session-token-here"
 *               actionToken:
 *                 type: string
 *                 example: "action-token-here"
 *               blockedEmail:
 *                 type: string
 *                 example: "userToBlock@example.com"
 *     responses:
 *       200:
 *         description: User blocked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "User blocked successfully."
 *       400:
 *         description: Invalid tokens or insufficient permissions
 */

/**
 * @swagger
 * /action/reset:
 *   post:
 *     summary: Request a password reset token
 *     tags: [Actions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 example: "johndoe@example.com"
 *               actionCode:
 *                 type: string
 *                 example: "RESET-PASSWORD"
 *     responses:
 *       200:
 *         description: Reset token generated and emailed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Recovery token generated."
 *                 token:
 *                   type: string
 *                   example: "reset-token-here"
 *       400:
 *         description: Email not registered or invalid request
 */

/**
 * @swagger
 * /action/resetValidate/{token}:
 *   get:
 *     summary: Validate a password reset token
 *     tags: [Actions]
 *     parameters:
 *       - in: path
 *         name: token
 *         schema:
 *           type: string
 *         required: true
 *         description: Password reset token to validate
 *     responses:
 *       200:
 *         description: Reset token is valid
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Token is valid"
 *       400:
 *         description: Invalid or expired token
 */
