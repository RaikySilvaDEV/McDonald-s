
import { PrismaClient } from "@prisma/client";

const prismaClient = new PrismaClient();

const restaurantData = {
  name: "Clone Donalds",
  slug: "fsw-donalds",
  description: "O melhor fast food do mundo",
  avatarImageUrl:
    "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQvcNP9rHlEJu1vCY5kLqzjf29HKaeN78Z6pRy",
  coverImageUrl: "https://i.imgur.com/g090QaL.jpeg",
};

const categoriesData = [
  {
    name: "Combos",
    products: [
      {
          name: "McOferta Média Big Mac Duplo",
          description:
            "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQaHB8tslkBUjlHSKiuseLm2hIFzVY0OtxEPnw",
          ingredients: [
            "Pão com gergilim",
            "Hambúrguer de carne 100% bovina",
            "Alface americana",
            "Queijo fatiado sabor cheddar",
            "Molho especial",
            "Cebola",
            "Picles",
          ],
        },
        {
          name: "Novo Brabo Melt Onion Rings",
          description:
            "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
          price: 41.5,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQeGQofnEPyQaHEV2WL8rGUs41oMICtYfNkphl",
          ingredients: [
            "Pão tipo brioche",
            "Hambúrguer de carne 100% bovina",
            "Méquinese",
            "Maionese especial com sabor de carne defumada",
            "Onion rings",
            "Fatias de bacon",
            "Queijo processado sabor cheddar",
            "Molho lácteo com queijo tipo cheddar",
          ],
        },
        {
          name: "McCrispy Chicken Elite",
          description:
            "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
          price: 39.9,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQr12aTqPo3SsGjBJCaM7yhxnbDlXeL5N9dckv",
          ingredients: [
            "Pão tipo brioche",
            "Batata",
            "Molho Honey&Fire",
            "Bacon em fatias",
            "Alface",
            "Tomate",
            "Queijo sabor cheddar",
            "Carne 100% de peito de frango",
          ],
        },
        {
          name: "Duplo Cheddar McMelt",
          description:
            "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
          price: 36.2,
          imageUrl:
            "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQWdq0w8niS9XCLQu7Nb4jvBYZze16goaOqsKR",
          ingredients: [
            "Pão escuro com gergelim",
            "Hambúrguer de carne 100% bovina",
            "Molho lácteo com queijo tipo cheddar",
            "Cebola ao molho shoyu",
          ],
        },
      // ... (outros produtos da categoria Combos)
    ],
  },
  {
    name: "Lanches",
    products: [
      {
        name: "Big Mac",
        description:
          "Quatro hambúrgueres (100% carne bovina), alface americana, queijo fatiado sabor cheddar, molho especial, cebola, picles e pão com gergilim, acompanhamento e bebida.",
        ingredients: [
          "Pão com gergilim",
          "Hambúrguer de carne 100% bovina",
          "Alface americana",
          "Queijo fatiado sabor cheddar",
          "Molho especial",
          "Cebola",
          "Picles",
        ],
        price: 39.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQKfI6fivqActTvBGLXfQe4a8CJ6d3HiR7USPK",
      },
      {
        name: "Duplo Quarterão",
        description:
          "Dois hambúrgueres de carne 100% bovina, méquinese, a exclusiva maionese especial com sabor de carne defumada, onion rings, fatias de bacon, queijo processado sabor cheddar, o delicioso molho lácteo com queijo tipo cheddar tudo isso no pão tipo brioche trazendo uma explosão de sabores pros seus dias de glória! Acompanhamento e Bebida.",
        ingredients: [
          "Pão tipo brioche",
          "Hambúrguer de carne 100% bovina",
          "Méquinese",
          "Maionese especial com sabor de carne defumada",
          "Onion rings",
          "Fatias de bacon",
          "Queijo processado sabor cheddar",
          "Molho lácteo com queijo tipo cheddar",
        ],
        price: 41.5,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ99rtECuYaDgmA4VujBU0wKn2ThXJvF3LHfyc",
      },
      {
        name: "McMelt",
        description:
          "Composto por pão tipo brioche com batata, molho Honey&Fire, bacon em fatias, alface, tomate, queijo sabor cheddar e carne 100% de peito de frango, temperada e empanada, acompanhamento e bebida.",
        ingredients: [
          "Pão tipo brioche",
          "Batata",
          "Molho Honey&Fire",
          "Bacon em fatias",
          "Alface",
          "Tomate",
          "Queijo sabor cheddar",
          "Carne 100% de peito de frango",
        ],
        price: 39.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQUY0VlDTmvPeJLoyOjzNsMqFdxUI423nBl6br",
      },
      {
        name: "McNífico Bacon",
        description:
          "Dois hambúrgueres (100% carne bovina), molho lácteo com queijo tipo cheddar, cebola ao molho shoyu e pão escuro com gergelim, acompanhamento e bebida.",
        ingredients: [
          "Pão escuro com gergelim",
          "Hambúrguer de carne 100% bovina",
          "Molho lácteo com queijo tipo cheddar",
          "Cebola ao molho shoyu",
        ],
        price: 36.2,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBBmifbjzEVXRoycAtrP9vH45bZ6WDl3QF0a1",
      },
      // ... (outros produtos da categoria Lanches)
    ],
  },
  {
    name: "Fritas",
    products: [
      {
        name: "Fritas Grande",
        description: "Batatas fritas crocantes e sequinhas. Vem bastante!",
        ingredients: [],
        price: 10.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQNd3jSNrcJroaszwjUAlM6iSO5ZTx2HV70t31",
      },
      {
        name: "Fritas Média",
        description:
          "Batatas fritas crocantes e sequinhas. Vem uma média quantidade!",
        ingredients: [],
        price: 9.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7Y6lv9tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",
      },
      {
        name: "Fritas Pequena",
        description:
          "Batatas fritas crocantes e sequinhas. Vem pouquinho (é bom pra sua dieta)!",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ5toOZxYa1oARJCUGh4EY3x8NjXHtvZ7lnVfw",
      },
      // ... (outros produtos da categoria Fritas)
    ],
  },
  {
    name: "Bebidas",
    products: [
      {
        name: "Coca-cola",
        description: "Coca-cola gelada para acompanhar seu lanche.",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQJS1b33q29eEsh0CVmOywrqx1UPnJpRGcHN5v",
      },
      {
        name: "Fanta Laranja",
        description: "Fanta Laranja gelada para acompanhar seu lanche.",
        ingredients: [],
        price: 5.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQW7Kxm9gniS9XCLQu7Nb4jvBYZze16goaOqsK",

      },
      {
        name: "Água Mineral",
        description: "A bebida favorita do Cristiano Ronaldo.",
        ingredients: [],
        price: 2.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ7i05S5tkc0L9oMIXZsFJtwnBh2KCz3y6uSW1",

      },
      // ... (outros produtos da categoria Bebidas)
    ],
  },
  {
    name: "Sobremesas",
    products: [
      {
        name: "Casquinha de Baunilha",
        description: "Casquinha de sorvete sabor baunilha.",
        ingredients: [],
        price: 3.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQtfuQrAKkI75oJfPT0crZxvX82ui9qV3hLFdY",
      },
      {
        name: "Casquinha de Chocolate",
        description: "Casquinha de sorvete sabor chocolate.",
        ingredients: [],
        price: 3.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQBH21ijzEVXRoycAtrP9vH45bZ6WDl3QF0a1M",
      },
      {
        name: "Casquinha de Mista",
        description: "Casquinha de sorvete sabor baunilha e chocolate.",
        ingredients: [],
        price: 2.9,
        imageUrl:
          "https://u9a6wmr3as.ufs.sh/f/jppBrbk0cChQ4rBrtULypXmR6JiWuhzS8ALjVkrF3yfatC7E",
      },
      // ... (outros produtos da categoria Sobremesas)
    ],
  },
];

const main = async () => {
  console.log("🌱 Começando o processo de seed (não destrutivo)...");

  console.log(`🍽️  Verificando/Criando o restaurante: ${restaurantData.name}`);
  const restaurant = await prismaClient.restaurant.upsert({
    where: { slug: restaurantData.slug },
    update: {}, // Não faz nada se o restaurante já existir
    create: restaurantData,
  });

  for (const category of categoriesData) {
    console.log(`- Verificando/Criando categoria: ${category.name}`);
    const createdCategory = await prismaClient.menuCategory.upsert({
      where: {
        name_restaurantId: {
          name: category.name,
          restaurantId: restaurant.id,
        },
      },
      update: {}, // Não faz nada se a categoria já existir
      create: {
        name: category.name,
        restaurantId: restaurant.id,
      },
    });

    for (const product of category.products) {
      await prismaClient.product.upsert({
        where: {
          name_menuCategoryId: {
            name: product.name,
            menuCategoryId: createdCategory.id,
          },
        },
        update: { ...product }, // Atualiza o produto se ele já existir
        create: {
          ...product,
          restaurantId: restaurant.id,
          menuCategoryId: createdCategory.id,
        },
      });
    }
  }

  console.log("✅ Seed concluído com sucesso!");
};

main()
  .catch((e) => {
    console.error("❌ Erro ao executar o seed:", e);
    process.exit(1);
  })
  .finally(async () => {
    console.log("🔌 Desconectando do banco de dados...");
    await prismaClient.$disconnect();
  });
