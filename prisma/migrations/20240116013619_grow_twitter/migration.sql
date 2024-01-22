-- CreateTable
CREATE TABLE "usuario" (
    "id" UUID NOT NULL,
    "nome" VARCHAR(50) NOT NULL,
    "email" VARCHAR(50) NOT NULL,
    "Username" VARCHAR(50) NOT NULL,
    "senha" VARCHAR(50) NOT NULL,
    "token" TEXT,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "usuario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tweet" (
    "id" UUID NOT NULL,
    "id_usuario" UUID NOT NULL,
    "conteudo" VARCHAR(100) NOT NULL,
    "tipo" VARCHAR(1) NOT NULL,
    "dthr_criacao" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dthr_atualizacao" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "tweet_pkey" PRIMARY KEY ("id","id_usuario")
);

-- CreateTable
CREATE TABLE "like" (
    "id_usuario" UUID NOT NULL,
    "id_tweet" UUID NOT NULL,

    CONSTRAINT "like_pkey" PRIMARY KEY ("id_usuario","id_tweet")
);

-- CreateIndex
CREATE UNIQUE INDEX "usuario_email_key" ON "usuario"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tweet_id_key" ON "tweet"("id");

-- AddForeignKey
ALTER TABLE "tweet" ADD CONSTRAINT "tweet_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_usuario_fkey" FOREIGN KEY ("id_usuario") REFERENCES "usuario"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "like" ADD CONSTRAINT "like_id_tweet_fkey" FOREIGN KEY ("id_tweet") REFERENCES "tweet"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
