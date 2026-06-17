-- CreateEnum
CREATE TYPE "Cargo" AS ENUM ('Aluno', 'Instrutor');

-- CreateTable
CREATE TABLE "usuarios" (
    "id" SERIAL NOT NULL,
    "nome" TEXT,
    "email" TEXT,
    "senha" TEXT,
    "cargo" "Cargo" NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fichas_treino" (
    "id" SERIAL NOT NULL,
    "nomeTreino" TEXT,
    "seriesTreino" INTEGER,
    "repeticoesTreino" INTEGER,
    "id_aluno" INTEGER NOT NULL,
    "id_instrutor" INTEGER NOT NULL,
    "criado_em" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "fichas_treino_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- AddForeignKey
ALTER TABLE "fichas_treino" ADD CONSTRAINT "fichas_treino_id_aluno_fkey" FOREIGN KEY ("id_aluno") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "fichas_treino" ADD CONSTRAINT "fichas_treino_id_instrutor_fkey" FOREIGN KEY ("id_instrutor") REFERENCES "usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
