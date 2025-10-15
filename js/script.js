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
    }, openingAnimeTime*4 + transitionAnimeTime + transitionGapTime);

})

// アニメデュレーション
const turnAnimeTime = 300;
const transitionAnimeTime = 400;
const openingAnimeTime = 600;
const transitionGapTime = 100; 

// テキスト複製
function textCopy() {
    const textCopyItem = document.getElementsByClassName('text-copy')
    for (let i = 0; i < textCopyItem.length; i++) {
        textCopyItem[i].innerHTML = textCopyItem[i].previousElementSibling.textContent;
    }
}
// 要素複製
function elementCopy() {
    const elementCopyItem = document.getElementsByClassName('element-copy')
    for (let i = 0; i < elementCopyItem.length; i++) {
        elementCopyItem[i].innerHTML = elementCopyItem[i].previousElementSibling.innerHTML;
    }
}
// テキスト分割（アニメーションのため）
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
// テキスト、要素を作成
textCopy();
elementCopy()
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

// サイトトップボタンの処理
const siteTopButton = document.getElementsByClassName('site-top-button-detection')
siteTopButton[0].addEventListener('mouseover', function() {
    document.getElementsByClassName('site-top-button')[0].classList.add('hover')
}) 
siteTopButton[0].addEventListener('mouseleave', function() {
    document.getElementsByClassName('site-top-button')[0].classList.remove('hover')
}) 


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
    if (humburgerMenuButonFlag && sideButtonFlag) {
        humburgerMenuButonFlag = false;
        humburgerMenu();
        setTimeout(() => {
            humburgerMenuButonFlag = true;
        }, 400);
    }
})

// ページトップボタンの処理
document.getElementsByClassName('page-top-arrow')[0].addEventListener('click', function () {
    if(sideButtonFlag) {
        window.scroll({
            top: 0,
            behavior: "smooth"
        });
    }
})

// フェードインアニメ
let windowScroll = window.scrollY;
let viewportHeight = window.innerHeight;
let htmlHeight = document.documentElement.scrollHeight
function fadeInAnime(fadeInItem, fadeInLocation) {
    for (let i = 0; i < fadeInItem.length; i++) {
        if (fadeInItem[i].getBoundingClientRect().top <= viewportHeight - fadeInLocation) {
            fadeInItem[i].classList.add('fade-in')
        } else if (fadeInItem[i].getBoundingClientRect().top > viewportHeight) {
            fadeInItem[i].classList.remove('fade-in')
        }
    }
}

// スクロールイベント
let sideButtonFlag = false;
window.addEventListener('scroll', function () {
    // 更新
    windowScroll = window.scrollY;
    viewportHeight = window.innerHeight
    htmlHeight = document.documentElement.scrollHeight
    
    // カバーウィンドウがフェードアウト
    const section = document.getElementsByClassName('main-wrapper');
    let coverWindowLeft = String(4.25 - 54.25 * windowScroll / section[1].offsetTop)
    if (coverWindowLeft < -50) { coverWindowLeft = -50; }
    document.getElementsByClassName('cover-window')[0].style.left = coverWindowLeft + '%'

    
    // サイドボタンがアクティブに
    const header = document.getElementsByClassName('header-menu')
    if (header[0].getBoundingClientRect().bottom <= 0) {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.add('fade-in', 'mouse-hover-item')
            sideButtonFlag = true;
        }
    } else {
        for (let i = 0; i < document.getElementsByClassName('side-button-icon').length; i++) {
            document.getElementsByClassName('side-button-icon')[i].classList.remove('fade-in', 'mouse-hover-item')
            sideButtonFlag = false;
        }
    }

    // contactエリアでカラーチェンジ
    const contactSection = section[section.length - 1];
    if (windowScroll > contactSection.offsetTop - viewportHeight / 2) {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'contact')
    } else {
        document.getElementsByTagName('html')[0].setAttribute('theme', 'default')
    }

    // トップに戻るとフェードイン
    const topText = document.getElementsByClassName('text-animation-top')
    for (let i = 0; i < topText.length; i++) {
        if(topText[i].getBoundingClientRect().bottom < 0) {
            topText[i].classList.add('fade-out')
        } else if (topText[i].getBoundingClientRect().bottom - topText[i].clientHeight/2 >= 0) {
            topText[i].classList.remove('fade-out')
        }
    }

    // 文字が出現
    const textMain = document.getElementsByClassName('text-animation-main')
    fadeInAnime(textMain, viewportHeight/10)
    const textFooter = this.document.getElementsByClassName('text-animation-footer')
    fadeInAnime(textFooter, 0)
    
    // 要素が出現
    const item = document.getElementsByClassName('card-button');
    fadeInAnime(item, viewportHeight/10)
    
    // 線が出現
    const sectionLine = document.getElementsByClassName('section-line')
    fadeInAnime(sectionLine, viewportHeight/10)
})



// カードの処理
let buttonFlag = true;
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

