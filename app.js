const path = require('path');
const express = require('express');
const webpack = require('webpack');
const config = require('./webpack.config');

const app = express();
const logger = require('morgan')
const compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));
app.use(logger('dev'));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');


app.get('/foods/:id/recipes', (req, res) => {
  res.render('recipes', { id: req.params.id });
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, req.url));
});

app.listen(process.env.PORT || 8080);
