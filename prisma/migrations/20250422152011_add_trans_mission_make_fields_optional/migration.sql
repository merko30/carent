-- CreateEnum
CREATE TYPE "Transmission" AS ENUM ('MANUAL', 'AUTOMATIC');

-- AlterTable
ALTER TABLE "Vehicle" ADD COLUMN     "transmission" "Transmission" DEFAULT 'AUTOMATIC',
ALTER COLUMN "color" DROP NOT NULL,
ALTER COLUMN "typeOfFuel" DROP NOT NULL,
ALTER COLUMN "typeOfFuel" SET DEFAULT 'GASOLINE';
