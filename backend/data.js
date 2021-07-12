import bcrypt from 'bcryptjs';

const data = {
    users: [
        {
            name: 'José',
            cpf: 32565896345,
            birthdate: "1980-10-28",
            address: 'Rua A, 125',
            email: 'admin@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: true,
        },
        {
            name: 'Maria',
            cpf: 98632548795,
            birthdate: "1995-02-10",
            address: 'Rua B, 658',
            email: 'user@example.com',
            password: bcrypt.hashSync('1234', 8),
            isAdmin: false,
        },
    ],
    products: [
        {
            // product store information
            image: '/images/p1.png',
            name: "Óculos de Sol Aviador Dourado",
            quantity: 58,
            rating: 4.5,
            numReviews: 10,
            //product especifications used in filter
            price: 129.99,
            gender: 'masculino',
            lensMaterial: 'policarbonato',
            frameMaterial: 'aço',
            style: 'aviador',
            lensColor: 'marrom',
            frameColor: 'dourado',
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
            gender: 'masculino',
            lensMaterial: 'policarbonato',
            frameMaterial: 'aço',
            style: 'redondo',
            lensColor: 'preto',
            frameColor: 'dourado',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Óculos de sol para os apaixonados por moda. O shape redondinho é super versátil e nunca sai de moda.',
        },
        {
            // product store information
            image: '/images/p3.png',
            name: "Óculo de Grau Feminino Preto",
            quantity: 0,
            rating: 2.5,
            numReviews: 254,
            //product especifications used in filter
            price: 359.99,
            gender: 'feminino',
            lensMaterial: '',
            frameMaterial: 'aço',
            style: 'quadrado',
            lensColor: '',
            frameColor: 'preto',
            // other product especifications
            lensProtection: 'Contra Raios UVA / UVB',
            description: 'Armação Para Óculos de Grau Feminino ideal na hora de compor o look! produzido em TR90 que é um material de alta resistência.',
            includedItems: '1 Armação para Óculos de Grau, 1 Case e 1 Flanela para Limpeza.'
        },
    ],
};
export default data;