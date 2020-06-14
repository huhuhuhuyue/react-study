// 动态路由
import app from './app'

// 2. Plugins
// app.use({});

// 3. Model
app.model(require('./models/example').default);
// app.model(require('./models/user').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
