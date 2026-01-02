/**
 * @swagger
 * tags:
 *   - name: Scope
 *     description: Endpoints relacionados con los permisos del sistema
*/

// GetAll
/**
 * @swagger
 * /api/scope:
 *   get:
 *     summary: Obtener todos los permisos del sistema
 *     security:
 *       - CookieAuth: []
 *     tags: [Scope]
 *     responses:
 *       200:
 *         description: Permisos obtenidos correctamente
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
 *                         $ref: "#/components/schemas/IScope"
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