// 読み込み時の処理
window.addEventListener('load', () => {
    const docEl = document.documentElement;
    const loadingWindow = document.querySelector('.loading-window');
    const coverWindow = document.querySelector('.cover-window');
    const loadedAnimeEls = document.querySelectorAll('.loaded-anime');

    docEl.classList.add('no-scroll');
    loadingWindow.classList.add('active');
    coverWindow.classList.add('active');

    setTimeout(() => {
        window.scrollTo(0, 0);
        checkWindow(mediaQuery);
        applyTheme()
    }, 1);

    setTimeout(() => {
        coverWindow.classList.remove('active');
        coverWindow.classList.add('loaded');

        loadedAnimeEls.forEach(el => {
            el.classList.replace('loading', 'loaded');
        });
    }, openingAnimeTime * 3);

    setTimeout(() => {
        docEl.classList.remove('no-scroll');
        docEl.removeAttribute('onwheel');

        loadedAnimeEls.forEach(el => {
            el.classList.remove('loaded');
        });
    }, openingAnimeTime * 4 + transitionGapTime);
});

// 慣性スクロール
const lenis = new Lenis({
    // smoothTouch: true,                     ///////////////////////////////////////////////////効いてない
    autoRaf: true,                    
});


// アニメデュレーション
const turnAnimeTime = 300;
const transitionAnimeTime = 400;
const openingAnimeTime = 600;
const transitionGapTime = 100; 

// テキスト複製
function textCopy() {
    document.querySelectorAll('.text-copy').forEach(copyEl => {
        const prev = copyEl.previousElementSibling;
        if (prev) {
            copyEl.innerHTML = prev.textContent;
        } else {
            const fallbackEl = copyEl.parentElement?.previousElementSibling?.children[0];
            if (fallbackEl) {
                copyEl.innerHTML = fallbackEl.textContent;
            }
        }
    });
}
// 要素複製
function elementCopy() {
    document.querySelectorAll('.element-copy').forEach(el => {
        const prev = el.previousElementSibling;
        if (prev) {
            el.innerHTML = prev.innerHTML;
        }
    });
}
// テキスト分割（アニメーションのため）
function textSplit() {
    document.querySelectorAll('.text-animation').forEach(el => {
        const text = el.textContent || '';
        el.innerHTML = '';
        el.style.setProperty('--letterlength', text.length);

        [...text].forEach((char, index) => {
            const span = document.createElement('span');
            span.innerHTML = char === ' ' ? '&nbsp;' : char;
            span.style.setProperty('--j', index);
            el.appendChild(span);
        });
    });
}
textCopy();
elementCopy();
textSplit();

// ダークモード
const button = document.querySelector('.dark-mode-button');
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
function applyTheme() {
    const theme = localStorage.getItem('data-theme');
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const finalTheme = theme ?? (isDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', finalTheme);

    const button = document.querySelector('.dark-mode-button');
    button.classList.remove('dark', 'light');
    if (theme) {
        button.classList.add(theme);
    }
}
function toggleTheme() {
    if (localStorage.getItem('data-theme')) {
        localStorage.removeItem('data-theme');
    } else {
        const newTheme = prefersDark.matches ? 'light' : 'dark';
        localStorage.setItem('data-theme', newTheme);
    }
    applyTheme();
}
prefersDark.addEventListener('change', applyTheme);
button.addEventListener('click', toggleTheme);



// ナビゲーションボタンの処理
const navButtons = document.querySelectorAll('.nav-button');
let titleWindowHeight;
let scrollDelayTime = 0;

navButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (humburgerMenuFlag) {
            toggleMenu();
            scrollDelayTime = 400;
        }

        const sectionName = button.getAttribute('section-name');
        const scrollTarget = sectionName === 'top' ? 0 : document.getElementById(sectionName).offsetTop - titleWindowHeight;

        setTimeout(() => {
            if (scrollTarget != null) {
                lenis.scrollTo(scrollTarget)
            }
            scrollDelayTime = 0;
        }, scrollDelayTime);
    });
});



//サイトトップボタンの処理
document.querySelector('.site-top-button').addEventListener('click', () => {
    location.reload();
});



// ハンバーガーメニュー
let humburgerMenuFlag = false;
let humburgerMenuButtonFlag = true;
const humburgerMenuButton = document.querySelector('.humburger-menu-icon');
const sideMenu = document.querySelector('.side-menu');
const coverWindow = document.querySelector('.cover-window');
const safariSp = document.querySelector('.safari-sp');
function toggleMenu() {
    sideMenu?.classList.toggle('active');
    coverWindow?.classList.toggle('nav-open');
    safariSp?.classList.toggle('active');

    if (!humburgerMenuFlag) {
        humburgerMenuFlag = true;
        lenis.stop(); // 慣性スクロールオフ
    } else {
        setTimeout(() => {
        humburgerMenuFlag = false;
        lenis.start(); // 慣性スクロールオン
        }, 400);
    }
}
humburgerMenuButton.addEventListener('click', () => {
    if (humburgerMenuButtonFlag && sideButtonFlag) {
        humburgerMenuButtonFlag = false;
        toggleMenu();
        setTimeout(() => {
            humburgerMenuButtonFlag = true;
        }, 400);
    }
});



// ページトップボタン
const topBtn = document.querySelector('.page-top-arrow');
topBtn.addEventListener('click', () => {
    if (!sideButtonFlag) return;

    lenis.scrollTo(0)
});



// スクロールを監視
const headerEl = document.querySelector('.header-menu');
const sideTriggers = Array.from(document.getElementsByClassName('side-button-scroll-trigger'));
const section = document.getElementsByClassName('main-wrapper')[0];
const titleEl = document.getElementsByClassName('text-animation-title')[0];
const topTextEls = Array.from(document.getElementsByClassName('text-animation-top'));
const topSectionLineEls = section ? Array.from(section.getElementsByClassName('section-line')) : [];
const textMainEls = Array.from(document.getElementsByClassName('text-animation-main'));
const textFooterEls = Array.from(document.getElementsByClassName('text-animation-footer'));
const cardEls = Array.from(document.getElementsByClassName('card-button'));
const sectionLineEls = Array.from(document.getElementsByClassName('section-line'));

let sideButtonFlag = false;
let elementFadeInLocation = 0; // 必要に応じて調整

// 共通ユーティリティ
const addClasses = (el, ...cls) => el.classList.add(...cls);
const removeClasses = (el, ...cls) => el.classList.remove(...cls);
// サイドボタンをアクティブに
const headerObserver = new IntersectionObserver(entries => {
    const visible = entries[0].isIntersecting;
    if (visible) {
        sideTriggers.forEach(el => removeClasses(el, 'fade-in', 'mouse-hover-item'));
        sideButtonFlag = false;
    } else {
        sideTriggers.forEach(el => addClasses(el, 'fade-in', 'mouse-hover-item'));
        sideButtonFlag = true;
    }
}, { root: null, threshold: 0.1});
if (headerEl) headerObserver.observe(headerEl);

// sp用titleを表示
const mainTopObserver = new IntersectionObserver(entries => {
    const entry = entries[0];
    if (entry.boundingClientRect.bottom < 0) addClasses(titleEl, 'fade-in');
    else removeClasses(titleEl, 'fade-in');
}, { root: null, threshold: 0 });
const mainTop = document.getElementsByClassName('main-top-text')[0];
if (mainTop && titleEl) mainTopObserver.observe(mainTop);
// fade-in 
const fadeInTargets = [
    { elements: textMainEls, marginPercent: 10 },     
    { elements: textFooterEls, marginPercent: 0 },   
    { elements: cardEls, marginPercent: 10 },         
    { elements: sectionLineEls, marginPercent: 10 }   
];
fadeInTargets.forEach(({ elements, marginPercent }) => {
    const rootMargin = `0px 0px -${marginPercent}% 0px`;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) addClasses(entry.target, 'fade-in')
        });
    }, {
        root: null,
        rootMargin,
        threshold: 0
    });

    elements.forEach(el => observer.observe(el));
});
const resetFadeInObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        const rect = entry.boundingClientRect;
        if (rect.top > window.innerHeight) removeClasses(entry.target, 'fade-in')
    });
}, {root: null, threshold: 0});
[...textMainEls, ...textFooterEls, ...cardEls, ...sectionLineEls].forEach(el => resetFadeInObserver.observe(el));
// fade-out
const fadeOutObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.boundingClientRect.bottom < 0) addClasses(entry.target, 'fade-out');
        else removeClasses(entry.target, 'fade-out');
    });
}, { root: null, threshold: 0 });
[...topTextEls, ...topSectionLineEls].forEach(el => fadeOutObserver.observe(el));


// カードの処理
const cardButton = document.getElementsByClassName('card-button')
const worksCardButton = document.getElementsByClassName('works-card-button')
const worksCardVisitButton = document.getElementsByClassName('works-card-visit-button')
let buttonFlag = true;
// ホバーアニメーション
function cardMouseHover(event) {
    if (!buttonFlag) return;

    const sectionId = this.closest('section')?.id;
    if (sectionId !== 'works' && sectionId !== 'about') return;

    const item = this.querySelector('.hover-interaction-item');
    if (!item) return;

    const rect = item.getBoundingClientRect();
    const xRatio = (event.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const yRatio = (event.clientY - rect.top - rect.height / 2) / (rect.height / 2);

    item.classList.add('hover-anime');
    item.style.transform = `rotateY(${-7 * xRatio}deg) rotateX(${7 * yRatio}deg) scale(1.03)`;
}
// ホバー解除
function cardMouseLeave() {
    if (!buttonFlag) return;

    const sectionId = this.closest('section')?.id;
    if (sectionId !== 'works' && sectionId !== 'about') return;

    const item = this.querySelector('.hover-interaction-item');
    if (item) {
        item.style.transform = '';
        item.classList.remove('hover-anime');
    }
}
// ページ遷移
function cardClick() {
    const targetPage = this.dataset.text || this.closest('.card-button')?.dataset.text;
    if (targetPage) {
        window.open(`project/${targetPage}/index.html`, '_blank');
    }
}

// スマホ用のアバウトエリア右側の位置
function moveAboutCardRight(toIndex) {
    const card = document.querySelector('.about-card-right');
    const section = document.querySelector('.main-about');
    const targets = section?.querySelectorAll('.card-button-outer');
    if (card && targets[toIndex]) {
        targets[toIndex].appendChild(card);
    }
}

// ブレイクポイントを設定
const mediaQuery = window.matchMedia('(min-width: 768px)');
const titleWindowSp = document.querySelector('.title-window-sp');
const cardButtons = Array.from(document.getElementsByClassName('card-button'));
const worksButtons = Array.from(document.getElementsByClassName('works-card-button'));
const visitButtons = Array.from(document.getElementsByClassName('works-card-visit-button'));

function checkWindow(windowSize) {
    const isPC = windowSize.matches;
    moveAboutCardRight(isPC ? 0 : 1);
    titleWindowHeight = isPC ? 0 : titleWindowSp.clientHeight;

    cardButtons.forEach(el => {
        el[isPC ? 'addEventListener' : 'removeEventListener']('mousemove', cardMouseHover);
        el[isPC ? 'addEventListener' : 'removeEventListener']('mouseleave', cardMouseLeave);
    });

    worksButtons.forEach(el => {
        el[isPC ? 'addEventListener' : 'removeEventListener']('click', cardClick);
    });

    visitButtons.forEach(el => {
        el[isPC ? 'removeEventListener' : 'addEventListener']('click', cardClick);
    });
}

mediaQuery.addEventListener('change', checkWindow);
