import app from './app';
import userRoutes from './database/routes/UserRoutes';

require('dotenv').config();

const PORT = process.env.PORT || 8000;

app.use('/api/v1/users', userRoutes);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
