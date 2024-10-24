# Punarnavah - Turning Waste into Opportunity

A sustainable waste management platform connecting households, artisans, and municipalities to promote circular economy and efficient waste utilization.

## 🌟 Features

### Household Waste Management Portal
- **Artisan Requirements:** Artisans can post their specific waste material needs
- **Community Contribution:** Users can provide waste materials that match artisan requirements
- **Monetization:** Contributors receive payment for their waste materials
- **Upcycled Marketplace:** Artisans can sell their created products through the integrated marketplace

### Municipal Waste Management Portal
- **Waste Collection:** Collaboration with municipalities for accessing unprocessed waste
- **Segregation System:** Efficient categorization of waste into plastics, textiles, and other materials
- **Industrial Integration:** Platform for industries to purchase sorted waste as raw materials

## 🛠️ Tech Stack

### Frontend
- ReactJS
- TailwindCSS
- Redux
- TypeScript

### Backend
- NodeJS
- ExpressJS
- Prisma
- JWT Authentication

### Database
- PostgreSQL

### DevOps & Deployment
- Docker
- AWS
- CI/CD (Github Actions)
- Vercel

### Integrations
- Razorpay Payment Gateway
- Cloudinary for Media Storage
- Machine Learning & Deep Learning Models

## 📦 NPM Package
We've published a common package for schema validation and type safety:
- Package Name: `@abhiram2k03/punarnavah-common`
- Built with TypeScript and Zod
- Ensures consistency across frontend and backend

## 🔗 Important Links

- **Website:** [https://punarnavah.abhiramverse.tech/](https://punarnavah.abhiramverse.tech/)
- **API Server:** [https://punarnavah-server.abhiramverse.tech/](https://punarnavah-server.abhiramverse.tech/)
- **NPM Package:** [https://www.npmjs.com/package/@abhiram2k03/punarnavah-common](https://www.npmjs.com/package/@abhiram2k03/punarnavah-common)
- **Docker Image:** [https://hub.docker.com/repository/docker/saiabhiramjaini/punarnavah-server/general](https://hub.docker.com/repository/docker/saiabhiramjaini/punarnavah-server/general)

## 🚀 Getting Started

- Clone the repository
```bash
git clone https://github.com/saiabhiramjaini/Punarnavah.git
cd Punarnavah
```

### Setting up Client

1. Install dependencies in the client
```bash
cd client
npm install
```

2. Set up environment variables
- Create a .env file or use .env.example
```bash
VITE_BACKEND_URL = 
VITE_BACKEND_URL = 

VITE_CLOUDINARY_UPLOAD_PRESET = 
VITE_CLOUDINARY_CLOUD_NAME = 
VITE_CLOUDINARY_URL = 

```

3. Start running the client
```bash
npm run dev
```


### Setting up Server

1. Install dependencies in the client
```bash
cd server
npm install
```

2. Set up environment variables
- Create a .env file or use .env.example
```bash
DATABASE_URL=

PORT = 
CLIENT_URL = 
JWT_SECRET = 

SENDER_EMAIL = 
SENDER_PASS = 

```

3. Start running the server
```bash
npm run dev
```

## 🤝 Contributing

I welcome contributions to Punarnavah! Please feel free to submit issues and pull requests.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request


