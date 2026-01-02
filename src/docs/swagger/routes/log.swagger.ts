/**
 * @swagger
 * tags:
 *   - name: Log
 *     description: Endpoints relacionados con los logs del sistema
*/

// GetAll
/**
 * @swagger
 * /api/log:
 *   get:
 *     summary: Obtener todos los logs del sistema
 *     security:
 *       - CookieAuth: []
 *     tags: [Log]
 *     responses:
 *       200:
 *         description: Logs obtenidos correctamente
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
 *                         $ref: "#/components/schemas/ILog"
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