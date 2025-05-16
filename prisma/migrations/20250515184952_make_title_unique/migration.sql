/*
  Warnings:

  - You are about to drop the column `image_url` on the `Anime` table. All the data in the column will be lost.
  - You are about to drop the column `title_japanese` on the `Anime` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[title]` on the table `Anime` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `imageURL` to the `Anime` table without a default value. This is not possible if the table is not empty.
  - Added the required column `titleJapanese` to the `Anime` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Anime" DROP COLUMN "image_url",
DROP COLUMN "title_japanese",
ADD COLUMN     "imageURL" TEXT NOT NULL,
ADD COLUMN     "titleJapanese" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Anime_title_key" ON "Anime"("title");
