-- CreateTable
CREATE TABLE "sayurkita"."Payments" (
    "payment_id" SERIAL NOT NULL,
    "transaction_id" INTEGER NOT NULL,
    "payment_type" TEXT NOT NULL,
    "payment_status" TEXT NOT NULL,
    "payment_amount" DOUBLE PRECISION NOT NULL,
    "payment_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Payments_pkey" PRIMARY KEY ("payment_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Payments_transaction_id_key" ON "sayurkita"."Payments"("transaction_id");

-- AddForeignKey
ALTER TABLE "sayurkita"."Payments" ADD CONSTRAINT "Payments_transaction_id_fkey" FOREIGN KEY ("transaction_id") REFERENCES "sayurkita"."Transactions"("transaction_id") ON DELETE RESTRICT ON UPDATE CASCADE;
