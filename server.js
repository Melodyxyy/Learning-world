const mongoose = require('mongoose');
const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // 解析 JSON 请求体

mongoose.connect('<YOUR_MONGODB_URI>', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  email: String,
  phone: String,
  isAdmin: Boolean,
});

const User = mongoose.model('User', userSchema);

app.post('/register', async (req, res) => {
  const { username, password, email, phone, isAdmin } = req.body;

  // 在这里处理将用户信息存储到数据库的逻辑，确保将 isAdmin 属性保存下来

  // 示例：使用 mongoose 存储用户信息到 MongoDB
  const user = new User({
    username,
    password,
    email,
    phone,
    isAdmin,
  });

  // 保存到数据库
  await user.save();

  res.json({ success: true, message: 'User registered successfully' });
});

app.get('/getUsers', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});


// webpack.config.js 或者 webpack.config.ts
module.exports = {
    // ... 其他配置项
    module: {
      rules: [
        {
          test: /linklist:\/\/.*/,
          use: 'raw-loader',
        },
        // ... 其他规则
      ],
    },
    // ... 其他配置项
  };
  