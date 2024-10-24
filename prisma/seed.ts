// prisma/seed.ts
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

async function main() {
  const topics = [
    { 
        name: "HTML",
        text: 'lorem ipsum lorem ipsum',
        image: '/html.png',
        brandColor: '#E44D26'
    },
    { 
        name: "CSS",
        text: 'lorem ipsum lorem ipsum',
        image: '/css.png',
        brandColor: '#1572B6' 
    },
    { 
        name: "JavaScript",
        text: 'lorem ipsum lorem ipsum',
        image: '/js.png',
        brandColor: '#F0DB4F' 
    },
    { 
        name: "React",
        text: 'lorem ipsum lorem ipsum',
        image: '/react.png',
        brandColor: '#00D8FF' 
    },
    { 
        name: "Node.js",
        text: 'lorem ipsum lorem ipsum',
        image: '/node.png',
        brandColor: '#8CC84B'
    },
    { 
      name: "TypeScript",
      text: 'lorem ipsum lorem ipsum',
      image: '/ts.png',
      brandColor: '#3178C6'
    },
  ]
  
  for (const topic of topics) {
    await prisma.topic.upsert({
      where: { name: topic.name },
      update: {},
      create: topic,
    })
  }
}

main()
  .then(() => console.log('Seeding successful'))
  .catch((e) => {
    console.error(e)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
