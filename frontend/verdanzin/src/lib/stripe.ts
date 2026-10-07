export default {
  publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? '',
  // Chave secreta não deve ir para o browser. Sem NEXT_PUBLIC_: só disponível no servidor.
  secretKey: process.env.STRIPE_SECRET_KEY ?? '',
};
