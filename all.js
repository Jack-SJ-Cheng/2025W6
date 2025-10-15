let tickets = [];
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
                    <span class="regionTag label-md">${item.area}</span>
                    <img src="${item.imgUrl}" alt="主題照片" class="card-img-top img-fluid">
                    <div class="card-body">
                        <span class="scoreTag paragraph-md">${item.rate.toFixed(1)}</span>
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
                            <span>剩下最後 ${item.group} 組</span>
                        </div>
                        <div class="ticketPrice label-xl d-flex align-items-center">
                            <span class="label-sm">TWD</span>
                            <span>$${item.price.toLocaleString('zh-TW')}</span>
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
    : tickets.filter(item => item.area === sortRegion.value);
    render(filtered);
}
//
// 監聽新增套票
addTicket.addEventListener('click', e => {
    let newTicket = {};
    newTicket.name = ticketName.value;
    newTicket.imgUrl = pictureURL.value;
    newTicket.area = ticketRegion.value;
    newTicket.price = Number(ticketPrice.value);
    newTicket.group = Number(ticketNum.value);
    newTicket.rate = Number(ticketScore.value);
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



function getFromSource(){
    axios.get('https://raw.githubusercontent.com/hexschool/js-training/main/travelApi.json')
    .then(res=>{
        tickets = res.data.data;
        // 初始化畫面
        filterAndRender();
    })
}
getFromSource();