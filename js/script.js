// 読み込み時の処理
window.addEventListener('load', function () {
    document.documentElement.classList.add('no-scroll')
    document.getElementsByClassName('loading-window')[0].classList.add('active')
    const coverWindow = document.getElementsByClassName('cover-window')
    coverWindow[0].classList.add('active')
    
    
    setTimeout(() => {
        this.window.scrollTo(0, 0)
        checkWindow(mediaQuery);
        this.window.addEventListener('scroll', scrollEvent)
        lightMode()
    }, 1);

    setTimeout(() => {
        coverWindow[0].classList.remove('active')
        coverWindow[0].classList.add('loaded')
        
        for(let i = 0; i < document.getElementsByClassName('loaded-anime').length; i++) {
            document.getElementsByClassName('loaded-anime')[i].classList.replace('loading', 'loaded')
        }
        
    }, openingAnimeTime*3);
    
    setTimeout(() => {
        document.documentElement.classList.remove('no-scroll')
        document.documentElement.removeAttribute('onwheel')  //慣性スクロールオン
        for(let i = 0; i < document.getElementsByClassName('loaded-anime').length; i++) {
            document.getElementsByClassName('loaded-anime')[i].classList.remove('loaded')
        }
    }, openingAnimeTime*4 + transitionAnimeTime + transitionGapTime);
})

// 慣性スクロール
const lenis = new Lenis({
    autoRaf: true,
});


// アニメデュレーション
const turnAnimeTime = 300;
const transitionAnimeTime = 400;
const openingAnimeTime = 600;
const transitionGapTime = 100; 

// テキスト複製
function textCopy() {
    const textCopyItem = document.getElementsByClassName('text-copy')
    for (let i = 0; i < textCopyItem.length; i++) {
        if(textCopyItem[i].previousElementSibling == null) {
            textCopyItem[i].innerHTML = textCopyItem[i].parentElement.previousElementSibling.children[0].textContent
        } else {
            textCopyItem[i].innerHTML = textCopyItem[i].previousElementSibling.textContent;
        }
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
elementCopy();
textSplit();


// ダークモード
function lightMode() {
    if(localStorage.getItem('theme') == null) {
        document.getElementsByClassName('dark-mode-button')[0].classList.remove('dark', 'light')
        if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
            document.documentElement.setAttribute('theme', 'dark')
        } else {
            document.documentElement.setAttribute('theme', 'light')
        }
    } else {
        document.documentElement.setAttribute('theme', localStorage.getItem('theme'))
        document.getElementsByClassName('dark-mode-button')[0].classList.add(localStorage.getItem('theme'))
    }
}
window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function() {
    lightMode()
})
document.getElementsByClassName('dark-mode-button')[0].addEventListener('click', function() {
    if (localStorage.getItem('theme') == null) {
        if(window.matchMedia("(prefers-color-scheme: dark)").matches) {
            window.localStorage.setItem('theme', 'light')
        } else {
            window.localStorage.setItem('theme', 'dark')
        }
    } else {
        window.localStorage.removeItem('theme')
    }
    lightMode();
})

// ページ内リンクの処理
const navButton = document.getElementsByClassName("nav-button")
let scrollDelayTime = 0;
let titleWindowHeight;
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
                    top: document.getElementById(sectionName).offsetTop - titleWindowHeight,
                    behavior: "smooth"
                });
            }
            scrollDelayTime = 0;
        }, scrollDelayTime);

    })
}

// ハンバーガーメニュー
let humburgerMenuFlag = false;
const humburgerMenuButton = document.getElementsByClassName('humburger-menu-icon');
function humburgerMenu() {
    document.getElementsByClassName('side-menu')[0].classList.toggle('active');
    document.getElementsByClassName('cover-window')[0].classList.toggle('nav-open')
    document.getElementsByClassName('safari-sp')[0].classList.toggle('active')
    
    if (!humburgerMenuFlag) {
        humburgerMenuFlag = true;
        lenis.stop();  //慣性スクロールオフ
    }
    else {
        setTimeout(() => {    
            humburgerMenuFlag = false;
            lenis.start();  //慣性スクロールオン
        }, 400);
    }
}
// ハンバーガーメニューボタンの処理
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
        lenis.stop();
        window.scroll({top: 0, behavior: "smooth"});

        const checkScroll = () => {
            if (window.scrollY === 0) {
                lenis.start();
            } else {
                requestAnimationFrame(checkScroll);
            }
        };

        requestAnimationFrame(checkScroll);
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
// フェードアウトアニメ
function fadeOutAnime(fadeOutItem) {
    for(let i = 0; i < fadeOutItem.length; i++) {
        if(fadeOutItem[i].getBoundingClientRect().bottom < 0) {
            fadeOutItem[i].classList.add('fade-out')
        } else if (fadeOutItem[i].getBoundingClientRect().top > 0) {
            fadeOutItem[i].classList.remove('fade-out')
        }
    }
}

// スクロールイベント（pc,sp共通）
let sideButtonFlag;
let elementFadeInLocation;
const section = document.getElementsByClassName('main-wrapper');
function scrollEvent() {
    // 更新
    windowScroll = window.scrollY;
    viewportHeight = window.innerHeight
    htmlHeight = document.documentElement.scrollHeight

    // サイドボタンがアクティブに
    sideButtonFlag = false;
    const header = document.getElementsByClassName('header-menu')
    if (header[0].getBoundingClientRect().bottom <= 0) {
        for (let i = 0; i < document.getElementsByClassName('side-button-scroll-trigger').length; i++) {
            document.getElementsByClassName('side-button-scroll-trigger')[i].classList.add('fade-in', 'mouse-hover-item')
            sideButtonFlag = true;
        }
    } else {
        for (let i = 0; i < document.getElementsByClassName('side-button-scroll-trigger').length; i++) {
            document.getElementsByClassName('side-button-scroll-trigger')[i].classList.remove('fade-in', 'mouse-hover-item')
            sideButtonFlag = false;
        }
    }

    // トップに戻るとフェードイン
    const topText = document.getElementsByClassName('text-animation-top')
    const topSectionLine = section[0].getElementsByClassName('section-line')
    fadeOutAnime(topText)
    fadeOutAnime(topSectionLine)

    // タイトルが出現
    if (document.getElementsByClassName('main-top-text')[0].getBoundingClientRect().bottom < 0) {
        document.getElementsByClassName('text-animation-title')[0].classList.add('fade-in')
    } else {
        document.getElementsByClassName('text-animation-title')[0].classList.remove('fade-in')
    }

    // 文字が出現
    const textMain = document.getElementsByClassName('text-animation-main')
    fadeInAnime(textMain, viewportHeight/10)
    const textFooter = this.document.getElementsByClassName('text-animation-footer')
    fadeInAnime(textFooter, 0)
    
    // 要素が出現
    const element = document.getElementsByClassName('card-button');
    fadeInAnime(element, elementFadeInLocation)
    
    // 線が出現
    const sectionLine = document.getElementsByClassName('section-line')
    fadeInAnime(sectionLine, viewportHeight/10)
}    

// カードの処理
let buttonFlag = true;
const cardButton = document.getElementsByClassName('card-button')
let hoverInteractionItem;
// ホバーアニメ
function cardMouseHover() {
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
}
// ホバーアニメオフ
function cardMouseLeave() {
    if(buttonFlag) {
        if (this.closest('section').getAttribute('id') == 'works' || this.closest('section').getAttribute('id') == 'about') {
            hoverInteractionItem = this.getElementsByClassName('hover-interaction-item')[0]
            hoverInteractionItem.style.transform = null;
            hoverInteractionItem.classList.remove('hover-anime')
        }
    }
}

// ページ遷移
const worksCardButton = document.getElementsByClassName('works-card-button')
const worksCardVisitButton = document.getElementsByClassName('works-card-visit-button')
function cardClick() {
    let targetPage = this.getAttribute('data-text')
    if(this.getAttribute('data-text') == null) {
        targetPage = this.closest('.card-button').getAttribute('data-text')
    }

    if(targetPage != null) {  ////////////////////////////////////////////////////////////////////////////////////////コンテンツが揃い次第条件式消去
        window.open(`project/${targetPage}/index.html`, '_blank')
    }
}

// スマホ用のアバウトエリア
function aboutCardCopyAndPaste() {
    const aboutCardRight = document.getElementsByClassName('about-card-right')[0]
    const aboutSection = document.getElementsByClassName('main-about')[0]
    aboutSection.getElementsByClassName('card-button-outer')[1].appendChild(aboutCardRight)
}
function aboutCardReset() {
    const aboutCardRight = document.getElementsByClassName('about-card-right')[0]
    const aboutSection = document.getElementsByClassName('main-about')[0]
    aboutSection.getElementsByClassName('card-button-outer')[0].appendChild(aboutCardRight)
}


// ブレイクポイントを設定
const mediaQuery = window.matchMedia('(min-width: 768px)');
function checkWindow(windowSize) {
    if (windowSize.matches) {  //pcの処理
        aboutCardReset();
        titleWindowHeight = 0;

        for (let i = 0; i < cardButton.length; i++) {
            cardButton[i].addEventListener('mousemove', cardMouseHover)
            cardButton[i].addEventListener('mouseleave', cardMouseLeave)
        }
        for (let i = 0; i < worksCardVisitButton.length; i++) {
            worksCardVisitButton[i].removeEventListener('click', cardClick)
        }
        for (let i = 0; i < worksCardButton.length; i++) {
            worksCardButton[i].addEventListener('click', cardClick)
        }
        elementFadeInLocation = viewportHeight/10  //要素出現トリガーの位置
    } else {  //spの処理
        aboutCardCopyAndPaste();
        titleWindowHeight = document.getElementsByClassName('title-window-sp')[0].clientHeight;

        for (let i = 0; i < cardButton.length; i++) {
            cardButton[i].removeEventListener('mousemove', cardMouseHover)
            cardButton[i].removeEventListener('mouseleave', cardMouseLeave)
        }
        for (let i = 0; i < worksCardButton.length; i++) {
            worksCardButton[i].removeEventListener('click', cardClick)
        }
        for (let i = 0; i < worksCardVisitButton.length; i++) {
            worksCardVisitButton[i].addEventListener('click', cardClick)
        }
        elementFadeInLocation = viewportHeight/3
    }
}
mediaQuery.addEventListener('change', checkWindow);
