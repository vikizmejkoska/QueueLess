const bcrypt = require('bcrypt');
const prisma = require('../src/utils/prisma');

async function main() {
  console.log('Seeding started...');

  await prisma.ticket.deleteMany();
  await prisma.user.deleteMany();
  await prisma.service.deleteMany();
  await prisma.salon.deleteMany();

  const glowSalon = await prisma.salon.create({
    data: {
      name: 'Glow Beauty Studio',
      address: 'Partizanska 12',
      city: 'Skopje',
      phone: '070111222',
      workingHours: '09:00 - 20:00',
    },
  });

  const chicSalon = await prisma.salon.create({
    data: {
      name: 'Chic Hair Lounge',
      address: 'Ilindenska 45',
      city: 'Skopje',
      phone: '070333444',
      workingHours: '10:00 - 21:00',
    },
  });

  const luxeSalon = await prisma.salon.create({
    data: {
      name: 'Luxe Nails & Beauty',
      address: 'Jane Sandanski 100',
      city: 'Skopje',
      phone: '070555666',
      workingHours: '08:00 - 19:00',
    },
  });

  await prisma.service.createMany({
    data: [
      {
        name: 'Haircut',
        description: 'Professional haircut service',
        durationMinutes: 20,
        price: 500,
        salonId: glowSalon.id,
      },
      {
        name: 'Blow Dry',
        description: 'Hair styling and blow dry',
        durationMinutes: 25,
        price: 600,
        salonId: glowSalon.id,
      },
      {
        name: 'Hair Coloring',
        description: 'Full hair coloring treatment',
        durationMinutes: 90,
        price: 2500,
        salonId: glowSalon.id,
      },
      {
        name: 'Manicure',
        description: 'Classic manicure treatment',
        durationMinutes: 30,
        price: 700,
        salonId: luxeSalon.id,
      },
      {
        name: 'Pedicure',
        description: 'Classic pedicure treatment',
        durationMinutes: 45,
        price: 900,
        salonId: luxeSalon.id,
      },
      {
        name: 'Eyebrow Styling',
        description: 'Eyebrow shaping and styling',
        durationMinutes: 15,
        price: 300,
        salonId: chicSalon.id,
      },
      {
        name: 'Haircut',
        description: 'Modern haircut with styling',
        durationMinutes: 25,
        price: 550,
        salonId: chicSalon.id,
      },
    ],
  });

  const hashedPassword = await bcrypt.hash('admin123', 10);

  await prisma.user.create({
    data: {
      name: 'Main Admin',
      email: 'admin@glow.com',
      password: hashedPassword,
      role: 'ADMIN',
      salonId: glowSalon.id,
    },
  });

  console.log('Seeding finished successfully.');
}

main()
  .catch((e) => {
    console.error('Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });