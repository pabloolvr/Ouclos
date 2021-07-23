import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'José',
            surname: 'Oliveira',
            cpf: 32565896345,
            birthdate: "1980-10-28",
            publicPlace: 'Rua A',
            publicPlaceNumber: '125',
            neighborhood: '',
            city: '',
            state: '',
            postalCode: '',
            phone: '',
            email: 'admin@email.com',
            password: bcrypt.hashSync('admin', 8),
            isAdmin: true,
        },
        {
            name: 'Maria',
            surname: 'Silva',
            cpf: 98632548795,
            birthdate: "1995-02-10",
            publicPlace: 'Av. Trab. São Carlense',
            publicPlaceNumber: '400',
            neighborhood: 'Centro',
            city: 'São Carlos',
            state: 'São Paulo',
            postalCode: '13566-590',
            phone: '992543551',
            email: 'user@email.com',
            password: bcrypt.hashSync('user', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            // product store information
            image: '/images/p1.png',
            name: "Óculos de Sol Aviador Dourado",
            quantity: 58,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 129.99,
            category: 'Óculos de Sol',
            gender: 'Masculino',
            lensMaterial: 'Policarbonato',
            frameMaterial: 'Aço',
            style: 'Aviador',
            lensColor: 'Marrom',
            frameColor: 'Dourado',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Constituído de uma mistura de metal e policarbonato, este redondinho é levíssimo! Perfeito para quem procura praticidade para o dia-dia.',
        },
        {
            // product store information
            image: '/images/p2.png',
            name: "Óculos de Sol Redondo Preto",
            quantity: 15,
            rating: 4.9,
            numReviews: 49,
            //product especifications used in filter
            price: 249.99,
            category: 'Óculos de Sol',
            gender: 'Masculino',
            lensMaterial: 'Policarbonato',
            frameMaterial: 'Aço',
            style: 'Redondo',
            lensColor: 'Preto',
            frameColor: 'Dourado',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Óculos de sol para os apaixonados por moda. O shape redondinho é super versátil e nunca sai de moda.',
        },
        {
            // product store information
            image: '/images/p3.png',
            name: "Óculo de Grau Feminino Preto",
            quantity: 0,
            rating: 1.5,
            numReviews: 254,
            //product especifications used in filter
            price: 359.99,
            category: 'Óculos de Grau',
            gender: 'Feminino',
            lensMaterial: 'Policarbonato',
            frameMaterial: 'Aço',
            style: 'Quadrado',
            lensColor: 'Transparente',
            frameColor: 'Preto',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Armação Para Óculos de Grau Feminino ideal na hora de compor o look! produzido em TR90 que é um material de alta resistência.',
        },
        {
            // product store information
            image: '/images/p4.png',
            name: "Óculos de Sol de Ouro",
            quantity: 5,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 1999.99,
            category: 'Óculos de Sol',
            gender: 'Feminino',
            lensMaterial: 'Polarizada',
            frameMaterial: 'Ouro',
            style: 'Quadrado',
            lensColor: 'Verde',
            frameColor: 'Dourado',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'O luxo e a sofisticação que você procura para o seu dia a dia estão garantidos com o Óculos de Sol de Ouro. Esse modelo de óculos de sol feminino permitirá que você esteja sempre muito elegante e única, a qualquer hora e com todas as combinações de looks. A versatilidade dele proporciona diversas combinações, desde outfits clássicos até os mais contemporâneos.',
        },
        {
            // product store information
            image: '/images/p5.png',
            name: "Óculos de Sol Quadrado Vermelho Retro",
            quantity: 100,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 69.90,
            category: 'Óculos de Sol',
            gender: 'Unissex',
            lensMaterial: 'Acrílico',
            frameMaterial: 'Acetato',
            style: 'Quadrado',
            lensColor: 'Vermelho',
            frameColor: 'Vermelho',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Óculos de Sol Quadrado Vermelho Retro é aquele básico queridinho. Incrível para completar seu look do dia a dia com estilo. Esse óculos tem shape quadrado retangular, armação mais grossa e lente com proteção UV. Estes óculos são perfeitos para o seu estilo de vida e prontos para compor seu look nas mais diversas ocasiões, aproveite nossa variedade de tenha um modelo para cada uma delas.',
        },
        {
            // product store information
            image: '/images/p6.png',
            name: "Óculos de Grau G Cristal",
            quantity: 41,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 799.99,
            category: 'Óculos de Grau',
            gender: 'Unissex',
            lensMaterial: 'CR 39',
            frameMaterial: 'Acetato',
            style: 'Redondo',
            lensColor: 'Cristal',
            frameColor: 'Cristal',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Se você adora o LEMTOSH, com sua ponte e rebites em forma de diamante, mas quer algo um pouco maior e mais ousado, estes óculos são a escolha certa.',
        },
        {
            // product store information
            image: '/images/p7.png',
            name: "Óculos Gamer com Filtro de Luz Azul (Azul)",
            quantity: 150,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 252.00,
            category: 'Óculos de Computador',
            gender: 'Masculino',
            lensMaterial: 'Acrílico',
            frameMaterial: 'Acetato',
            style: 'Quadrado',
            lensColor: 'Transparente',
            frameColor: 'Azul',
            // other product especifications
            lensProtection: '30% de Bloqueio de Luz Azul',
            description: 'Bloqueio da Luz Azul + Anti reflexo + Anti riscos - - Fique o tempo necessário em frente as telas - - Chega as dores de cabeça! - - Sinta seus olhos mais confortáveis e com mais vigor - - Produza mais, seja no trabalho ou na diversão!',
        },
        {
            // product store information
            image: '/images/p8.png',
            name: "Óculos Gamer com Filtro de Luz Azul Clássico Vermelho",
            quantity: 150,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 455.50,
            category: 'Óculos de Computador',
            gender: 'Feminino',
            lensMaterial: 'Acrílico',
            frameMaterial: 'Acetato',
            style: 'Quadrado',
            lensColor: 'Transparente',
            frameColor: 'Vermelho',
            // other product especifications
            lensProtection: '50% de Bloqueio de Luz Azul',
            description: 'O óculos que irradia sofisticação, trazendo um toque moderno a um estilo clássico para você que é um usuário digital exigente. A estrutura apresenta um material de acetato premium e dobradiça com molas para se ajustar com fluidez e leveza ao seu rosto com a melhor experiência de visualização',
        },
        {
            // product store information
            image: '/images/p9.png',
            name: "Óculos de Computador Anti Luz Azul",
            quantity: 45,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 50.00,
            category: 'Óculos de Computador',
            gender: 'Unissex',
            lensMaterial: 'Nylon',
            frameMaterial: 'Policarbonato',
            style: 'Redondo',
            lensColor: 'Transparente',
            frameColor: 'Azul',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB e Bloqueio de Luz Azul',
            description: 'Reduza a cepa dos olhos ao trabalhar em um computador, tablet, telefone ou tv. Excelente para aliviar a fadiga e desconforto visual.',
        },
        {
            // product store information
            image: '/images/p10.png',
            name: "Óculos de Grau Dourado Feminino",
            quantity: 87,
            rating: 0,
            numReviews: 0,
            //product especifications used in filter
            price: 499.99,
            category: 'Óculos de Grau',
            gender: 'Feminino',
            lensMaterial: 'Policarbonato',
            frameMaterial: 'Aço',
            style: 'Redondo',
            lensColor: 'Transparente',
            frameColor: 'Dourado',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'A Palas Eyewear lança em suas coleções sempre muito estilo com características inovadoras, tanto para o uso casual urbano ou esportivo. As armações são extremamente leves e confortáveis, proporcionam aos nossos clientes estética e praticidade simultânea, acima de toda beleza nossa tendência acompanha valores justos aos produtos.',
        },
    ],
};
export default data;