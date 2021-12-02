const express = require("express");
const { AppError, handleError } = require("../middlewares/errors/index");
const { logger } = require("../utils/logger");

const router = express.Router();

/**
 * @swagger
 * /:
 *  get:
 *    tags:
 *      - /
 *    summary: Home Page
 *    description: RESTful API application made for training.
 *    responses:
 *      200:
 *        description: successful operation
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              properties:
 *                message:
 *                  type: string
 *                  example: RESTful APIs training.
 */

// logger error
router.get("/", (req, res) => {
  logger.info("INFO");
  logger.warn("WARN");
  logger.error("ERROR");

  return res.send({ message: "RESTful APIs." });
});

// error
router.get("/throw", (req, res) => {
  throw new AppError("Random Error!", 404);
});

// ví dụ về error async
router.get(
  "/throw-async",
  handleError(async (req, res) => {
    await (async () => {
      throw new Error();
    })();
  })
);

module.exports = router;
