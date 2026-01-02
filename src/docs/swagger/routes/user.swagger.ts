/**
 * @swagger
 * tags:
 *   - name: User
 *     description: Endpoints relacionados con los usuarios del sistema
*/

// GetAll
/**
 * @swagger
 * /api/user:
 *   get:
 *     summary: Obtener todos los usuarios
 *     security:
 *       - CookieAuth: []
 *     tags: [User]
 *     responses:
 *       200:
 *         description: Usuarios obtenidos correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                       type: array
 *                       items:
 *                         $ref: "#/components/schemas/IGetUser"
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
 *       404:
 *         description: No encontrado
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

// GetOne
/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Obtener un usuario
 *     security:
 *       - CookieAuth: []
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario obtenido correctamente
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
 *       404:
 *         description: No encontrado
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

// Create
/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Crear un usuario
 *     security:
 *       - CookieAuth: []
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/ICreateUser"
 *     responses:
 *       201:
 *         description: Usuario creado correctamente
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

// Update
/**
 * @swagger
 * /api/user/{id}:
 *   put:
 *     summary: Actualizar un usuario
 *     security:
 *       - CookieAuth: []
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del usuario
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: "#/components/schemas/IUpdateUser"
 *     responses:
 *       200:
 *         description: Usuario actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                 - $ref: "#/components/schemas/IOkResponse"
 *                 - type: object
 *                   properties:
 *                     data:
 *                       type: object
 *                       properties:
 *                         before:
 *                           $ref: "#/components/schemas/IGetUser"
 *                         after:
 *                           $ref: "#/components/schemas/IGetUser"
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
 *       404:
 *         description: No encontrado
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

// Delete
/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Eliminar un usuario
 *     security:
 *       - CookieAuth: []
 *     tags: [User]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Usuario eliminado correctamente
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
 *       404:
 *         description: No encontrado
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