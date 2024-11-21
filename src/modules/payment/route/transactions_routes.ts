import { Router } from "express";
import get_all_transaction_controller from "../controller/get_all_transaction_controller";
import get_user_transaction_controller from "../controller/get_user_transaction_controller";
import create_transactions_controller from "../controller/create_transactions_controller";
import delete_transaction_controller from "../controller/delete_transaction_controller";

const router = Router();
router.get("/transaction", get_all_transaction_controller);
router.get("/userTransaction", get_user_transaction_controller);
router.post("/createTransaction", create_transactions_controller);
router.delete("/transaction/:transactionId", delete_transaction_controller);

export default router;
