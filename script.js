const getid = id => document.getElementById(id);
const getcls = cls => document.getElementsByClassName(cls);

const setCookie = (name, value, expires = new Date(Date.now() + 2494800000), path = '/') => document.cookie = `${name}=${value}; expires=${expires}; path=${path}; SameSite=None; Secure`;
const getCookie = name => (document.cookie.split(/;\s*/).map(el => el.split('=')).find(el => el[0] === name) || []).slice(1).join('=');
const delCookie = name => setCookie(name, '', new Date(0));

window.onload = function () {
    const blackSquares = getcls('black-square');
    const redSquare = getid('red-square');
    const greenRect = getid('green-rect');

    const inputMulti = getid('input-multi');
    const btnMulti = getid('btn-multi');

    const imgCont = getid('img-container');

    const mouseCoords = getid('mouse-coords');
    const geoCoords = getid('geo-coords');

    const cusInput1 = getid('cus-input-1');
    const cusInput2 = getid('cus-input-2');
    const cusInput3 = getid('cus-input-3');

    const scrUpBtn = getid('btn-scroll-up');
    const fileDND = getid('file-dnd').parentNode;

    function eachBlackSquare(fn) {
        for (const el of [...blackSquares]) { // HTMLCollection to Array
            fn(el);
        }
    }

    getid('btn-remove-1').onclick = function () {
        eachBlackSquare(el => el.style.display = 'none');
    }
    getid('btn-remove-2').onclick = function () {
        eachBlackSquare(el => el.remove());
    }
    getid('btn-remove-3').onclick = function () {
        eachBlackSquare(el => el.classList.toggle('hidden'));
    }
    btnMulti.onclick = function () {
        const selector = inputMulti.value;
        for (const el of document.querySelectorAll(selector) || []) {
            el.classList.toggle('hidden');
        }
    }
    btnMulti.onmouseenter = () => redSquare.classList.remove('hidden');
    btnMulti.onmouseleave = () => redSquare.classList.add('hidden');
    getid('yellow-square').onclick = function () {
        alert('Hello!');
        this.onclick = function () {
            this.remove();
        }
    }
    inputMulti.onfocus = () => greenRect.classList.remove('hidden');
    inputMulti.oninput = () => greenRect.classList.add('hidden');

    getid('btn-link').onclick = function () {
        const links = getid('input-link').value.replaceAll('\r', '\n').split(/\n+/);

        imgCont.innerHTML = '';

        for (const link of links) {
            const img = document.createElement('img');
            img.src = link;
            imgCont.append(img);
        }
    }

    document.body.onmousemove = function (event) {
        mouseCoords.innerHTML = `Mouse (${event.clientX}, ${event.clientY})`;
    }
    getid('browser-lang').innerHTML = navigator.language;
    if (navigator.geolocation) navigator.geolocation.getCurrentPosition(function ({coords}) {
        geoCoords.innerHTML = `Lt: ${coords.latitude}; Ln: ${coords.longitude}`;
        geoCoords.classList.remove('loading');
    });

    cusInput1.innerHTML = localStorage.getItem('cus-input-1') || '';
    cusInput2.innerHTML = getCookie('cus-input-2') || '';
    cusInput3.innerHTML = sessionStorage.getItem('cus-input-3') || '';
    cusInput1.oninput = event => localStorage.setItem('cus-input-1', event.target.innerHTML);
    cusInput2.oninput = event => setCookie('cus-input-2', event.target.innerHTML);
    cusInput3.oninput = event => sessionStorage.setItem('cus-input-3', event.target.innerHTML);

    scrUpBtn.onclick = () => window.scrollTo(0, 0);
    function manageScrUpBtn() {
        if (window.scrollY) scrUpBtn.classList.remove('btn-scroll-up-hidden');
        else scrUpBtn.classList.add('btn-scroll-up-hidden');
    }
    manageScrUpBtn();
    window.onscroll = manageScrUpBtn;

    [getid('border-block-1'), getid('border-block-2')].forEach(function (el) {
        el.onclick = function (event) {
            alert('Lorem Ipsum');
            event.stopPropagation();
        }
    });

    getid('btn-fullscreen-block').onclick = function () {
        const block = document.createElement('div');
        block.style = `
            width: 100vw;
            height: 100vh;
            background: rgba(0, 0, 0, 0.5);
            position: fixed;
            top: 0;
            bottom: 0;
            z-index: 999;
        `;
        block.onclick = function () {
            block.remove();
            document.body.style.overflow = 'auto';
        };
        document.body.style.overflow = 'hidden';
        //document.body.addEventListener('scroll', preventScroll);
        document.body.append(block);
    }

    getid('no-upd-form').onsubmit = () => !1;

    function fileDNDSet(cn, st) {
        fileDND.classList.toggle(cn, st);
    }
    fileDND.ondragover = function () {
        fileDNDSet('over', true);
    }
    fileDND.ondragleave = function () {
        fileDNDSet('over', false);
    }
    fileDND.ondrop = function () {
        fileDNDSet('over', false);
        fileDNDSet('selected', true);
    }
}
