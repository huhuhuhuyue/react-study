import dva from 'dva';
import './index.css';

// 1. Initialize
const createHistory = require("history").createBrowserHistory;
const app = dva({
 history: createHistory()
});

// const app = dva();

export default app
