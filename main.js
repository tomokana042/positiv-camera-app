// --- API のベース URL をここに書き換えてください ---
const API_BASE = "https://your-public-api.example.com"; // ← デプロイしたAPIのURLに置き換える


// コメントデータ（ジャンル別）
const comments = {
brightness: [...Array(8)].map((_,i)=>[`明るさが自然で魅力的です！（${i+1}）`].join('')),
composition: [
"構図がとても美しいです！",
"三分割構図を意識するとさらに映えます。",
"余白の使い方が上手です。",
"被写体の見せ方が工夫されています。"
],
color: [
"色味が優しくまとまっています。",
"色のコントラストが美しいです。",
"暖色系の温かさが出ています。"
],
focus: [
"ピントがしっかり合っていて見やすいです。",
"背景ボケが効果的です。",
"若干ブレがあるので次は固定して撮ると良いです。"
],
atmosphere: [
"全体の雰囲気がとても良いです。",
"ストーリー性を感じます。",
"見ていて心が明るくなる写真です。"
]
};


function randomFrom(arr){ return arr[Math.floor(Math.random()*arr.length)]; }


function getRandomComment(){
const keys = Object.keys(comments);
const key = keys[Math.floor(Math.random()*keys.length)];
return randomFrom(comments[key]);
}


async function sendImage(){
const input = document.getElementById('cameraInput');
if(!input || !input.files || !input.files.length){ alert('画像を選択してください'); return; }
const file = input.files[0];
const fd = new FormData();
fd.append('image', file);


const resultEl = document.getElementById('result');
resultEl.textContent = '読み込み中...';


try{
const res = await fetch(API_BASE + '/predict', { method:'POST', body:fd });
if(!res.ok) throw new Error('API error: ' + res.status);
const data = await res.json();


// data 期待例: { total: 78, evaluation: '良い', advice: '〜する' }
const score = data.total ?? '—';
const evaluation = data.evaluation ?? '';
const advice = data.advice ?? '';


const text = `【総合スコア】 ${score}点\n【評価】 ${evaluation}\n\n【アドバイス】\n${advice}\n\n★ ポジティブコメント ★\n・${getRandomComme