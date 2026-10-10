import dotenv from 'dotenv';
dotenv.config();

export const config = {
  port: process.env.PORT || 5000,
  nodeEnv: process.env.NODE_ENV || 'development',
  clientUrl: process.env.CLIENT_URL || 'http://localhost:5173',
  aiModelVersion: process.env.AI_MODEL_VERSION || 'brandbloom-optima-v2',
  brand: {
    name: 'BrandBloom',
    colors: {
      marineBlue: '#01386A',
      brightRed: '#EE4B2B',
      butterYellow: '#FFFD74',
    }
  }
};
