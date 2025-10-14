// 読み込み時の処理
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

// アニメデュレーション
const turnAnimeTime = 300;
const transitionAnimeTime = 400;
const openingAnimeTime = 600;

// サークルテキスト
let circleText = 'welcome welcome welcome ';
const createCircle = function() {
    const circle = document.getElementById('circle');
    // リサイズ時にリセット
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

// テキスト複製
function textCopy() {
    const textCopyItem = document.getElementsByClassName('text-copy')
    for (let i = 0; i < textCopyItem.length; i++) {
        textCopyItem[i].innerHTML = textCopyItem[i].previousElementSibling.textContent
    }
}
// テキストアニメーション　
function textSplit() {
    const textSplitItem = document.getElementsByClassName('text-animation')
    for (let i = 0; i < textSplitItem.length; i++) {
        const text = textSplitItem[i].textContent
        textSplitItem[i].innerHTML = ''

        textSplitItem[i].style.setProperty('--letterlength', text.length)
        
        for (let j = 0; j < text.length; j++) {
            const element = document.createElement('span')
            if(text[j] == ' ') {
                element.innerHTML = '&nbsp;'
            } else {
                element.innerHTML = text[j]
            }

            element.style.setProperty('--j', j)
            textSplitItem[i].appendChild(element);
        }
    }
}
textCopy();
textSplit();

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
        const section = document.getElementsByClassName('main-wrapper');
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


let windowScroll = window.scrollY;
let viewportHeight = window.innerHeight;
let htmlHeight = document.documentElement.scrollHeight
// フェードインアニメ
function fadeInAnime(fadeInItem, fadeInLocation) {
    for (let i = 0; i < fadeInItem.length; i++) {
        const targetTop = fadeInItem[i].getBoundingClientRect().top + windowScroll;
        
        if (windowScroll > targetTop - viewportHeight + fadeInItem[i].offsetHeight/4 + fadeInLocation) {
            fadeInItem[i].classList.add('fade-in')
        } else if (windowScroll <= targetTop - viewportHeight) {
            fadeInItem[i].classList.remove('fade-in')
        }
    }
}
// スクロールイベント
window.addEventListener('scroll', function () {
    // 更新
    windowScroll = window.scrollY;
    viewportHeight = window.innerHeight
    htmlHeight = document.documentElement.scrollHeight
    
    // 回転テキスト
    document.getElementById('circle').style.transform = 'rotateZ(' + -360*3*windowScroll/(htmlHeight-viewportHeight) + 'deg) translate(-50%, -50%)'
    if(windowScroll > 0 && windowScroll != (htmlHeight-viewportHeight)) {
        document.getElementById('circle').classList.add('active')
    } else {
        document.getElementById('circle').classList.remove('active')
    }
    
    // カバーウィンドウがフェードアウト
    const section = document.getElementsByClassName('main-wrapper');
    let coverWindowLeft = String(4.25 - 54.25 * windowScroll / section[1].offsetTop)
    if (coverWindowLeft < -50) { coverWindowLeft = -50; }
    document.getElementsByClassName('cover-window')[0].style.left = coverWindowLeft + '%'
    
    // ハンバーガーメニューアイコンが出現
    const header = document.getElementsByClassName('header-menu')
    if (header[0].getBoundingClientRect().bottom <= 0) {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.add('fade-in')
        }
    } else {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.remove('fade-in')
        }
    }

    // contactエリアでカラーチェンジ
    const contactSection = section[section.length - 1];
    if (windowScroll > contactSection.offsetTop - viewportHeight / 2) {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'contact')
    } else {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'default')
    }

    // 文字が出現
    const text = document.getElementsByClassName('text-animation')
    fadeInAnime(text, viewportHeight/10)
    
    // 要素が出現
    const item = document.getElementsByClassName('card-button');
    fadeInAnime(item, 0)
    
    // 線が出現
    const sectionLine = document.getElementsByClassName('section-line')
    fadeInAnime(sectionLine, viewportHeight/10)
})



let buttonFlag = true;
let aboutCardOpenFlag = false;
// カードの処理
const cardButton = document.getElementsByClassName('card-button')
let hoverInteractionItem;
for (let i = 0; i < cardButton.length; i++) {
    cardButton[i].addEventListener('mousemove', function(event) {
        if(buttonFlag) {
            if (this.closest('section').getAttribute('id') == 'works' || this.closest('section').getAttribute('id') == 'about') {
                hoverInteractionItem = this.getElementsByClassName('hover-interaction-item')[0]
                const cardHeight = hoverInteractionItem.clientHeight;
                const cardWidth = hoverInteractionItem.clientWidth;
                const targetRect = hoverInteractionItem.getBoundingClientRect()
                const rotateYRatio = (event.clientX - targetRect.left - cardWidth/2)/(cardWidth/2)
                const rotateXRatio = (event.clientY - targetRect.top - cardHeight/2)/(cardHeight/2)
            
                hoverInteractionItem.classList.add('hover-anime')
                hoverInteractionItem.style.transform = 'rotateY(' + -7*rotateYRatio + 'deg) rotateX(' + 7*rotateXRatio + 'deg) scale(1.03)'
            }
        }
    })
    cardButton[i].addEventListener('mouseleave', function() {
        if(buttonFlag) {
            hoverInteractionItem = this.getElementsByClassName('hover-interaction-item')[0]
            if (this.closest('section').getAttribute('id') == 'works' || this.closest('section').getAttribute('id') == 'about') {
                hoverInteractionItem.style.transform = null;
                hoverInteractionItem.classList.remove('hover-anime')
            }
        }
    })
}

