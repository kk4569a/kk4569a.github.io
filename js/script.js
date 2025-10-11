window.addEventListener('load', function () {
    document.getElementsByClassName('loading-window')[0].classList.add('loaded')
    const coverWindow = document.getElementsByClassName('cover-window')
    coverWindow[0].classList.add('active')
    setTimeout(() => {
        coverWindow[0].classList.remove('active')
        coverWindow[0].classList.add('loaded')
        
        for(let i = 0; i < document.getElementsByClassName('loaded-anime').length; i++) {
            document.getElementsByClassName('loaded-anime')[i].classList.replace('loading', 'loaded')
        }
        
    }, openingAnimeTime*3);
    
    setTimeout(() => {
        document.getElementsByTagName('html')[0].classList.remove('no-scroll')
        for(let i = 0; i < document.getElementsByClassName('loaded-anime').length; i++) {
            document.getElementsByClassName('loaded-anime')[i].classList.remove('loaded')
        }
    }, openingAnimeTime*3 + transitionAnimeTime);

})

const turnAnimeTime = 300;
const transitionAnimeTime = 400;
const openingAnimeTime = 600;

// サークルテキスト
let circleText = 'welcome welcome welcome ';
const createCircle = function() {
    const circle = document.getElementById('circle');
    document.getElementById('circle').innerHTML = ''
    for(let i = 0; i < circleText.length; i++) {
        const element = document.createElement('div');
        element.className = 'circle-text'
        element.textContent = circleText[i] 
        circle.appendChild(element);
        const angle = 360*i/circleText.length
        const size = 10;
        element.style.width = size + 'px';
        element.style.height = size + 'px';
    
        const radius = circle.clientWidth/2;
        const centerX = circle.clientWidth/2 - size/2;
        const centerY = circle.clientHeight/2 - size/2;
        const x = Math.cos(((angle-90)*Math.PI)/180)*radius + centerX; // 中心を起点としたX座標
        const y = Math.sin(((angle-90)*Math.PI)/180)*radius + centerY; // 中心を起点としたY座標
        element.style.left = x + 'px';
        element.style.top = y + 'px';
        
        element.style.transform = 'rotateZ('+angle+'deg)'
    }
}
createCircle()

window.addEventListener('resize', function() {
    createCircle()
})    

// ナビゲーションの処理
const navButton = document.getElementsByClassName("nav-button")
let scrollDelayTime = 0;
for (let i = 0; i < navButton.length; i++) {
    navButton[i].addEventListener('click', function () {
        if (humburgerMenuFlag) {
            humburgerMenu()
            scrollDelayTime = 400;
        }

        setTimeout(() => {
            const sectionName = this.getAttribute('section-name')
            if (sectionName == "top") {
                window.scroll({
                    top: 0,
                    behavior: "smooth"
                });
            } else {
                window.scroll({
                    top: document.getElementById(sectionName).offsetTop,
                    behavior: "smooth"
                });
            }
            scrollDelayTime = 0;
        }, scrollDelayTime);

    })
}

// ハンバーガーメニューボタンの処理
let humburgerMenuFlag = false;
const humburgerMenuButton = document.getElementsByClassName('humburger-menu-icon');

function humburgerMenu() {
    document.getElementsByClassName('side-menu')[0].classList.toggle('active');

    if (!humburgerMenuFlag) {
        document.getElementsByTagName('html')[0].classList.add('no-scroll')
        document.getElementsByClassName('cover-window')[0].classList.add('nav-open')
        document.getElementsByClassName('cover-window')[0].style.left = "6.1%"
        humburgerMenuFlag = true;
    }
    else {
        const windowScroll = window.scrollY;
        const section = document.querySelectorAll('.main-wrapper');
        let coverWindowLeft = String(4.25 - 54.25 * windowScroll / section[1].offsetTop)
        if (coverWindowLeft < -50) { coverWindowLeft = -50; }
        document.getElementsByClassName('cover-window')[0].style.left = coverWindowLeft + '%'

        setTimeout(() => {
            document.getElementsByTagName('html')[0].classList.remove('no-scroll')
            document.getElementsByClassName('cover-window')[0].classList.remove('nav-open')
            humburgerMenuFlag = false;
        }, 400);
    }
}
let humburgerMenuButonFlag = true;
humburgerMenuButton[0].addEventListener('click', function () {
    if (humburgerMenuButonFlag) {
        humburgerMenuButonFlag = false;
        humburgerMenu();
        setTimeout(() => {
            humburgerMenuButonFlag = true;
        }, 400);
    }
})

// ページトップボタンの処理
document.getElementsByClassName('page-top-arrow')[0].addEventListener('click', function () {
    window.scroll({
        top: 0,
        behavior: "smooth"
    });
})


// スクロールイベント
window.addEventListener('scroll', function () {
    const header = document.getElementsByClassName('header-menu')

    const item = document.querySelectorAll('.card-button');
    const sectionLine = document.getElementsByTagName('hr')

    const windowScroll = window.scrollY;
    const viewportHeight = window.innerHeight;
    const htmlHeight = document.documentElement.scrollHeight

    const section = document.querySelectorAll('.main-wrapper');
    const hobbySection = section[section.length - 2];
    const quizSection = section[section.length - 1];

    // スクロールに従って回転
    document.getElementById('circle').style.transform = 'rotateZ(' + -360*3*windowScroll/(htmlHeight-viewportHeight) + 'deg) translate(-50%, -50%)'
    if(windowScroll > 0 && windowScroll != (htmlHeight-viewportHeight)) {
        document.getElementById('circle').classList.add('active')
    } else {
        document.getElementById('circle').classList.remove('active')
    }

    // カバーウィンドウがスクロールに従ってフェードアウト
    let coverWindowLeft = String(4.25 - 54.25 * windowScroll / section[1].offsetTop)
    if (coverWindowLeft < -50) { coverWindowLeft = -50; }
    document.getElementsByClassName('cover-window')[0].style.left = coverWindowLeft + '%'

    // ハンバーガーメニューアイコンが出現
    if (header[0].getBoundingClientRect().bottom <= 0) {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.add('fade-in')
        }
    } else {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.remove('fade-in')
        }
    }

    // hobbyまでスクロールするとカラーチェンジ
    if (windowScroll > hobbySection.offsetTop - viewportHeight / 2 && windowScroll < quizSection.offsetTop - viewportHeight / 2) {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'hobby')
    } else {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'default')
    }

    // スクロールで要素が出現
    for (let i = 0; i < item.length; i++) {
        const targetTop = item[i].getBoundingClientRect().top + windowScroll;

        if (windowScroll > targetTop - viewportHeight * 4/5) {
            item[i].classList.add('fade-in')
        }
        else if (windowScroll <= targetTop - viewportHeight) {
            item[i].classList.remove('fade-in')
        }
    }

    // スクロールで線が出現
    for (let i = 0; i < sectionLine.length; i++) {
        const targetTop = sectionLine[i].getBoundingClientRect().top + windowScroll;

        if (windowScroll > targetTop - viewportHeight * 9 / 10) {
            sectionLine[i].classList.add('active')
        }
        else if (windowScroll <= targetTop - viewportHeight) {
            sectionLine[i].classList.remove('active')
        }
    }
})


let buttonFlag = true;
// クイズエリア以外のカード
const cardButton = document.getElementsByClassName('card-button')
for (let i = 0; i < cardButton.length; i++) {
    cardButton[i].addEventListener('click', function () {
        if (buttonFlag) {
            buttonFlag = false;
            let animeTime = 0; 
            if (this.closest('section').getAttribute('id') != 'quiz') {
                this.classList.toggle('active')
                if(this.closest('section').getAttribute('id') == 'about') {
                    animeTime = transitionAnimeTime*2 + turnAnimeTime;
                }
                else if(this.closest('section').getAttribute('id') == 'hobby') {
                    animeTime = transitionAnimeTime + turnAnimeTime;
                }
            } 

            setTimeout(() => {
                buttonFlag = true;
            }, animeTime);
        }
    })
}

// クイズエリアのカード
const quizCardButtonOuter = document.getElementsByClassName('quiz-card-button-outer')
const quizCardButton = document.getElementsByClassName('quiz-card-button');
let quizCardItem;

for (let i = 0; i < quizCardButtonOuter.length; i++) {
    quizCardButtonOuter[i].addEventListener('click', function () {
        if (buttonFlag) {
            buttonFlag = false;
            quizCardItem = this.closest('.quiz-card-button-face-wrapper').getElementsByClassName('quiz-card-item')[0]

            for (let i = 0; i < quizCardButton.length; i++) {
                if (quizCardButton[i].getAttribute('card-status') == 'open') {
                    quizCardButton[i].classList.add('card-transition');
                }
                quizCardButton[i].classList.remove('active')
                quizCardButton[i].setAttribute('card-status', 'close')
            }
            this.closest('.card-button').classList.add('active', 'card-transition')
            this.closest('.card-button').setAttribute('card-status', 'open')

            setTimeout(() => {
                for (let i = 0; i < quizCardButton.length; i++) {
                    quizCardButton[i].classList.remove('card-transition')
                }

                buttonFlag = true;
            }, transitionAnimeTime * 3);
        }
    })
}

const quizCardCloseButton = document.getElementsByClassName('quiz-card-item-close-button')
for (let i = 0; i < quizCardCloseButton.length; i++) {
    quizCardCloseButton[i].addEventListener('click', function () {
        if (buttonFlag) {
            buttonFlag = false;

            this.closest('.card-button').classList.add('card-transition')
            this.closest('.card-button').classList.remove('active')

            for (let i = 0; i < quizCardButton.length; i++) {
                quizCardButton[i].setAttribute('card-status', 'close')
            }


            setTimeout(() => {
                for (let i = 0; i < quizCardButton.length; i++) {
                    quizCardButton[i].classList.remove('card-transition')
                }

                buttonFlag = true;
            }, transitionAnimeTime * 3);
        }
    })
}

// 駅名クイズ
const stationNameQuiz = ['十三', '枚方', '雲雀丘花屋敷', '太秦', '膳所']
const stationNameQuizAnswer = ['じゅうそう', 'ひらかた', 'ひばりがおかはなやしき', 'うずまさ', 'ぜぜ']
let stationNameQuizNumber = 0;
const stationNameQuizTextbox = document.getElementById('station-quiz-textbox')

const createStationNameQuiz = function() {
    document.getElementById('station-quiz-text').textContent = stationNameQuizNumber+1 + '. ' + stationNameQuiz[stationNameQuizNumber]
}
createStationNameQuiz()

stationNameQuizTextbox.form.addEventListener('submit', (event) => {
    event.preventDefault();

    quizCardItem.getElementsByClassName('quiz-card-item-judgement')[0].classList.add('active')

    for(let i = 0; i < quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon').length; i++) {
        quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon')[i].classList.remove('active')
    }

    if(stationNameQuizTextbox.value == stationNameQuizAnswer[stationNameQuizNumber]) {
        quizCardItem.getElementsByClassName('quiz-card-item-true')[0].classList.add('active')
    }
    else {
        quizCardItem.getElementsByClassName('quiz-card-item-false')[0].classList.add('active')
    }
})

// オーケストラクイズ
const orchestraQuiz = ['オーケストラという言葉の語源はどれでしょう', 'コンサート開始前のチューニングにおいて、演奏者が基準とする音はどれでしょう。']
const orchestraQuizChoices = [
    ['演奏するもの', '美しい音の調べ', '半円形の場所', '神の声'],
    ['ラの音', 'シの音', 'ドの音', '決まっていない']
]
const orchestraQuizAnswer = [
    [false, false, true, false],
    [true, false, false, false]
]
let orchestraQuizNumber = 0;
const orchestraQuizAnswerButton = document.getElementsByClassName('quiz-card-item-answer-button')
const orchestraQuizAnswerButtonArray = [].slice.call(orchestraQuizAnswerButton)
const createOrchestraQuiz = function() {
    document.getElementById('orchestra-quiz-text').textContent = orchestraQuizNumber+1 + '. ' + orchestraQuiz[orchestraQuizNumber]
    for(let i = 0; i < orchestraQuizChoices[orchestraQuizNumber].length; i++) {
        orchestraQuizAnswerButton[i].getElementsByTagName('p')[0].textContent = orchestraQuizChoices[orchestraQuizNumber][i]
    }
}
createOrchestraQuiz()

for(let i = 0; i < orchestraQuizAnswerButton.length; i++) {
    orchestraQuizAnswerButton[i].addEventListener('click', function() {
        quizCardItem.getElementsByClassName('quiz-card-item-judgement')[0].classList.add('active')

        for(let i = 0; i < orchestraQuizAnswerButton.length; i++) {
            orchestraQuizAnswerButton[i].classList.remove('active')
        }
        this.classList.add('active')

        for(let i = 0; i < quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon').length; i++) {
            quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon')[i].classList.remove('active')
        }

        if(orchestraQuizAnswer[orchestraQuizNumber][orchestraQuizAnswerButtonArray.indexOf(orchestraQuizAnswerButton[i])]) {
            quizCardItem.getElementsByClassName('quiz-card-item-true')[0].classList.add('active')
        }else {
            quizCardItem.getElementsByClassName('quiz-card-item-false')[0].classList.add('active')
        }
    })
}

// クイズ切り替え
const quizChangeButton = document.getElementsByClassName('quiz-card-item-change-button')
for(let i = 0; i < quizChangeButton.length; i++) {
    quizChangeButton[i].addEventListener('click', function() {
        for(let j = 0; j < quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon').length; j++) {
            quizCardItem.getElementsByClassName('quiz-card-item-judgement-icon')[j].classList.remove('active')
        }
        quizCardItem.getElementsByClassName('quiz-card-item-judgement')[0].classList.remove('active')

        if(this.getAttribute('quiz-genre') == 'station-name') {        
            stationNameQuizTextbox.value = "";
    
            stationNameQuizNumber = stationNameQuizNumber + Number(this.getAttribute('change-direction'))
            if(stationNameQuizNumber < 0) {
                stationNameQuizNumber = stationNameQuiz.length + stationNameQuizNumber;
            } else if(stationNameQuizNumber > stationNameQuiz.length - 1) {
                stationNameQuizNumber =  stationNameQuizNumber - stationNameQuiz.length ;
            }

            createStationNameQuiz();
        }
        else if(this.getAttribute('quiz-genre') == 'orchestra') {
            for(let i = 0; i < orchestraQuizAnswerButton.length; i++) {
                orchestraQuizAnswerButton[i].classList.remove('active')
            }

            orchestraQuizNumber = orchestraQuizNumber + Number(this.getAttribute('change-direction'))
            if(orchestraQuizNumber < 0) {
                orchestraQuizNumber = orchestraQuiz.length + orchestraQuizNumber;
            } else if(orchestraQuizNumber > orchestraQuiz.length - 1) {
                orchestraQuizNumber = orchestraQuizNumber - orchestraQuiz.length ;
            }
            
            createOrchestraQuiz();
        }
    })
}
