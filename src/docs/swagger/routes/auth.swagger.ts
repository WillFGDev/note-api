/**
 * @swagger
 * tags:
 *   - name: Auth
 *     description: Endpoints relacionados con la autenticacion de usuarios
*/

// Login
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Iniciar sesion
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/ILogin" 
 *     responses:
 *       200:
 *         description: Sesion iniciada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/ILoginInfo"
 *       400:
 *         description: Error en la validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       403:
 *         description: No permitido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 */

// Logout
/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Cerrar sesion
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Sesion cerrada correctamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IOkResponse"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 */

// Register
/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registrarse
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *            $ref: "#/components/schemas/IRegister" 
 *     responses:
 *       201:
 *         description: Se registró correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/IGetUser"
 *       400:
 *         description: Error en la validación de datos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       401:
 *         description: No autenticado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       403:
 *         description: No permitido
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       409:
 *         description: Conflicto
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 *       500:
 *         description: Error interno en el servidor
 *         content:
 *           application/json:
 *             schema:
 *               $ref: "#/components/schemas/IErrorResponse"
 */