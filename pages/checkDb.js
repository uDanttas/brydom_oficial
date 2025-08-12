import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('\n📊 Verificando dados no banco `dev.db`...\n');

  const usuarios = await prisma.usuario.findMany({
    include: {
      bots: true,
      historicos: true, // <-- corrigido aqui!
    },
  });

  if (usuarios.length === 0) {
    console.log('⚠️ Nenhum usuário encontrado.');
  } else {
    for (const user of usuarios) {
      console.log(`👤 Usuário: ${user.nome} (CPF: ${user.cpf})`);
      console.log(`  - Saldo: R$ ${user.saldo}`);
      console.log(`  - Lucro Total: R$ ${user.lucroTotal}`);
      console.log(`  - Bots Ativos: ${user.bots.length}`);
      console.log(`  - Operações no Histórico: ${user.historicos.length}`);
      console.log('---');
    }
  }

  const bhacanna = await prisma.botsBhacanna.findMany();
  console.log(`\n🤖 Bots Bhacanna em operação: ${bhacanna.length}\n`);

  await prisma.$disconnect();
}

main().catch((e) => {
  console.error('❌ Erro ao acessar o banco:', e);
  process.exit(1);
});
