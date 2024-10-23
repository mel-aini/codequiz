/*
  Warnings:

  - Added the required column `isComplete` to the `Subscription` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "isComplete" BOOLEAN NOT NULL;
