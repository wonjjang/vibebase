const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// 정적 파일 서빙
app.use(express.static('public'));

// 프로젝트 상세 페이지 라우팅
app.get('/project/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'project-detail.html'));
});

// 기본 라우트들
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/req', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'req.html'));
});

app.get('/research', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'research.html'));
});

app.get('/progress', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'progress.html'));
});

app.get('/deliverables', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'deliverables.html'));
});

app.listen(port, () => {
    console.log(`VibeCoding server running at http://localhost:${port}`);
});
