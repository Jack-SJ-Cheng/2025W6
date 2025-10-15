let tickets = [
    {
        name: '綠島自由套裝行程',
        url: './img/travel_1.png',
        region: '台東',
        price: '1,280',
        num: '8',
        score: '8.6',
        description: '嚴選超高CP值綠島自由行套裝行程，多種綠島套裝組合，提供台東綠島來回船票、綠島環島機車、綠島民宿住宿，行程加贈『綠島浮潛體驗』以及『綠島生態導覽』，讓你用輕鬆的綠島套裝自由行，也能深度認識綠島在地文化。'
    },
    {
        name: '清境高空觀景步道二日遊',
        url: './img/travel_4.png',
        region: '南投',
        price: '2,580',
        num: '12',
        score: '8.2',
        description: '清境農場青青草原數十公頃碧草，餵食著數以百計的綿羊和牛群，中央山脈最高的北三段群峰形成一堵如帶的高牆，攔住清晨的薄霧山嵐，成就了從花蓮翻山而來的雲瀑在濁水溪谷積成雲海，這些景觀豐沛了清境觀景步道的風格，也涵養它無可取代的特色。'
    },
    {
        name: '南庄度假村露營車二日遊',
        url: './img/travel_6.png',
        region: '台中',
        price: '1,280',
        num: '2',
        score: '9.6',
        description: '南庄雲水豪華露營車，擁有最愜意的露營體驗吧！ 一泊一食，輕鬆享受露營車樂趣。獨立衛浴與私人戶外露臺。入住豪華露營車還能使用戶外SPA大眾湯，感受美人湯魅力。'
    },
    {
        name: '山林悠遊雙人套票',
        url: './img/travel_3.png',
        region: '台中',
        price: '880',
        num: '10',
        score: '8.6',
        description: '山林悠遊套票，結合南投清境高空步道、雙龍瀑布七彩吊橋、瑞龍瀑布園區之熱門景點，帶您飽覽南投瑰麗的自然環境，體驗變化無窮的地形景觀，喜歡挑戰高空的您一定不可錯過。（含雙龍瀑布入場券 x2）'
    },
    {
        name: '漁樂碼頭釣魚體驗套票',
        url: './img/travel_2.png',
        region: '台中',
        price: '1,280',
        num: '5',
        score: '8.6',
        description: '台中全新親子景點寶熊漁樂碼頭，為知名釣具公司「OKUMA」所創立的觀光工廠。一樓藍白希臘漁村風商店街免費參觀。二樓釣魚故事館則設立全台唯一虛擬釣場，透過導覽讓你知道如何釣魚、魚餌怎麼區分，寓教於樂的台中景點！'
    },
    {
        name: '熊森公園親子二日遊套票',
        url: './img/travel_5.png',
        region: '高雄',
        price: '2,480',
        num: '3',
        score: '8.6',
        description: '來自日本最受歡迎的兒童遊樂園《 BearSon Park 熊森公園》於全世界有800多家據點，在全世界、日本及台灣，很多小孩的童年都在遊戲愛樂園裡一同成長，提供兒童一個最富教育性及娛樂性的休憩遊樂天地！'
    }
];
// 取得DOM元素的函式
function getElement(em) {
    return document.querySelector(em);
}

// 取得顯示結果區塊DOM
const result = getElement('.result');

// 取得新增套票按鈕DOM
const addTicket = getElement('.deliver');

// 取得篩選地區選項DOM
const sortRegion = getElement('#sortRegion');

// 取得數量顯示DOM
const sortNum = getElement('.sortNum');

// 取得欲新增之套票內容DOM
const addForm = getElement('#addForm');
const ticketName = getElement('#ticketName');
const pictureURL = getElement('#pictureURL');
const ticketRegion = getElement('#ticketRegion');
const ticketPrice = getElement('#ticketPrice');
const ticketNum = getElement('#ticketNum');
const ticketScore = getElement('#ticketScore');
const ticketDescription = getElement('#description');

// 將資料推送到畫面
function render(showResult) {
    let str = '';
    showResult.forEach(item => {
        str += `<div class="card">
                    <span class="regionTag label-md">${item.region}</span>
                    <img src="${item.url}" alt="主題照片" class="card-img-top img-fluid">
                    <div class="card-body">
                        <span class="scoreTag paragraph-md">${item.score}</span>
                        <h4 class="card-title">${item.name}</h4>
                        <p class="card-text paragraph-md">
                            ${item.description}
                        </p>
                    </div>
                    <div class="card-footer d-flex justify-content-between align-items-center">
                        <div class="ticketRemain label-sm d-flex align-items-center">
                            <span class="material-symbols-outlined">
                                error
                            </span>
                            <span>剩下最後 ${item.num} 組</span>
                        </div>
                        <div class="ticketPrice label-xl d-flex align-items-center">
                            <span class="label-sm">TWD</span>
                            <span>$${item.price}</span>
                        </div>
                    </div>
                </div>`
    })
    sortNum.textContent = `本次搜得共${showResult.length}筆資料`;
    if(!showResult.length){
        result.innerHTML = 
        `<div class="empty d-flex justify-content-center w-100">
                    <img src="./img/no_found.png" alt="查無資料" class="emptyImg">
                </div>`;
    } else result.innerHTML = str;
}

// 過濾要渲染的資料並呼叫render()
function filterAndRender() {
    const filtered = (sortRegion.value === '全部') 
    ? tickets 
    : tickets.filter(item => item.region === sortRegion.value);
    render(filtered);
}
//
// 監聽新增套票
addTicket.addEventListener('click', e => {
    let newTicket = {};
    newTicket.name = ticketName.value;
    newTicket.url = pictureURL.value;
    newTicket.region = ticketRegion.value;
    newTicket.price = Number(ticketPrice.value).toLocaleString('zh-TW');
    newTicket.num = Number(ticketNum.value);
    newTicket.score = Number(ticketScore.value).toFixed(1);
    newTicket.description = ticketDescription.value;
    newTicket.id = Date.now().toString();

    // 簡易驗證
    const hasEmptyField = Object.values(newTicket).some(item => item === '');
    if (hasEmptyField) {
        alert('請填寫所有資訊');
        return;
    }
    if(newTicket.score>10 || newTicket.score<0){
        alert('套票星級請填入0-10');
        return;
    }

    tickets.push(newTicket);
    filterAndRender();

    addForm.reset();
})

// 監聽篩選地區
sortRegion.addEventListener('change', e => {
    filterAndRender();
})

// 初始化畫面
filterAndRender();
