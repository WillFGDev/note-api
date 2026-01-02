/**
 * @swagger
 * tags:
 *   - name: Role
 *     description: Endpoints relacionados con los roles del sistema
*/

// GetAll
/**
 * @swagger
 * /api/role:
 *   get:
 *     summary: Obtener todos los roles
 *     security:
 *       - CookieAuth: []
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: Roles obtenidos correctamente
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
 *                         $ref: "#/components/schemas/IRole"
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
 * /api/role/{id}:
 *   get:
 *     summary: Obtener un rol
 *     security:
 *       - CookieAuth: []
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol obtenido correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/IRoleScopes"
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
 * /api/role:
 *   post:
 *     summary: Crear un rol
 *     security:
 *       - CookieAuth: []
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Rol creado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/IRole"
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

// Update
/**
 * @swagger
 * /api/role/{id}:
 *   put:
 *     summary: Actualizar un rol
 *     security:
 *       - CookieAuth: []
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del rol
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               scopes:
 *                 type: array
 *                 items:
 *                   type: number
 *     responses:
 *       200:
 *         description: Rol actualizado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/IRoleScopes"
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
 * /api/role/{id}:
 *   delete:
 *     summary: Eliminar un rol
 *     security:
 *       - CookieAuth: []
 *     tags: [Role]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: number
 *         description: ID del rol
 *     responses:
 *       200:
 *         description: Rol eliminado correctamente
 *         content:
 *           application/json:
 *             schema:
 *               allOf:
 *                  - $ref: "#/components/schemas/IOkResponse"
 *                  - type: object
 *                    properties:
 *                      data:
 *                        $ref: "#/components/schemas/IRole"
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