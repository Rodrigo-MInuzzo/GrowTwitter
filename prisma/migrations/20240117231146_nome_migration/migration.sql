/*
  Warnings:

  - You are about to drop the column `Username` on the `usuario` table. All the data in the column will be lost.
  - Added the required column `username` to the `usuario` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "usuario" DROP COLUMN "Username",
ADD COLUMN     "username" VARCHAR(50) NOT NULL;
