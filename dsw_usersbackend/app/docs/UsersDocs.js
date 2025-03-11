/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Endpoints related to user management
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
