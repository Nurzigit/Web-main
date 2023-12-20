const express = require('express');
const app = express();
const fs = require('fs');

// Чтение данных из файла
fs.readFile('./data.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading file:', err);
        return;
    }

    // Преобразование JSON строки в объект
    const jsonData = JSON.parse(data);

    // Далее вы можете работать с объектом jsonData
    runServer(jsonData);
});

app.use(express.static('public/css'));
app.use(express.static('public/js'));
app.use(express.static('public/images'));

app.set('views', './views')
app.set('view engine', 'ejs')

// app.get('/', (req, res) => {
//     res.render('index', {data})
// })

// app.get('/about', (req, res) => {
//     res.render('src/about', {text: 'Привет это об нас страница'})
// })

function runServer(data) {
    app.set('view engine', 'ejs');

    // Рендеринг шаблона index.ejs с передачей данных
    app.get('/', (req, res) => {
        res.render('index', { data: data});
    });

    app.get('/Favourites', (req, res) => {
        res.render('./src/fav', { data: data});
    });

    app.get('/Trending', (req, res) => {
        res.render('./src/trend', { data: data });
    });

    app.get('/Coming-soon', (req, res) => {
        res.render('./src/coming', { data: data });
    });
    


    const port = 3000;
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
}
