(() => {
    "use strict";
    function isWebp() {
        function testWebP(callback) {
            let webP = new Image;
            webP.onload = webP.onerror = function() {
                callback(2 == webP.height);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
        testWebP((function(support) {
            let className = true === support ? "webp" : "no-webp";
            document.documentElement.classList.add(className);
        }));
    }
    function addLoadedClass() {
        window.addEventListener("load", (function() {
            if (document.querySelector("body")) setTimeout((function() {
                document.querySelector("body").classList.add("_loaded");
            }), 200);
        }));
    }
    let addWindowScrollEvent = false;
    setTimeout((() => {
        if (addWindowScrollEvent) {
            let windowScroll = new Event("windowScroll");
            window.addEventListener("scroll", (function(e) {
                document.dispatchEvent(windowScroll);
            }));
        }
    }), 0);
    if (sessionStorage.getItem("preloader")) {
        if (document.querySelector(".preloader")) document.querySelector(".preloader").classList.add("_hide");
        document.querySelector(".wrapper").classList.add("_visible");
    }
    if (sessionStorage.getItem("money")) {
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    } else {
        sessionStorage.setItem("money", 2500);
        if (document.querySelector(".score")) document.querySelectorAll(".score").forEach((el => {
            el.textContent = sessionStorage.getItem("money");
        }));
    }
    const preloader = document.querySelector(".preloader");
    const wrapper = document.querySelector(".wrapper");
    const window_width = document.documentElement.clientWidth;
    document.documentElement.clientHeight;
    function addRemoveClass(block, className, delay) {
        if (document.querySelector(block).classList.contains(className)) document.querySelector(block).classList.remove(className);
        document.querySelector(block).classList.add(className);
        setTimeout((() => {
            document.querySelector(block).classList.remove(className);
        }), delay);
    }
    function shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [ array[j], array[i] ];
        }
        return array;
    }
    const config = {
        time: 60,
        currentTopic: "empty",
        movies: [ "good will hunting", "love actualy", "high school musical", "angry man", "ratatouille" ],
        places: [ "chine town", "uluru", "table mountain", "vancouver", "the white house" ],
        art: [ "ice cream cone", "turtle", "making", "sleeping", "scarying" ],
        famous: [ "zorro", "Marilyn Monroe", "Marilyn Manson", "batman", "hulk" ],
        words: [],
        letters: [ [], [], [] ],
        state: 1
    };
    if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) {
        document.querySelector(".main__body").classList.add("_active");
        resize();
    }
    function hideMainScreen() {
        let tl = gsap.timeline({
            defaults: {
                duration: 1,
                ease: "expo.out"
            }
        });
        if (1 == config.state) {
            tl.to('[data-btn="1"', {
                x: -window_width / 2,
                opacity: 0
            });
            tl.to('[data-btn="3"', {
                x: -window_width / 2,
                opacity: 0
            }, "<");
            tl.to('[data-btn="2"', {
                x: window_width / 2,
                opacity: 0
            }, "<");
            tl.to('[data-btn="4"', {
                x: window_width / 2,
                opacity: 0
            }, "<");
            tl.to(".categories__title", {
                y: 50,
                opacity: 0
            }, "<50%");
            tl.to(".header", {
                rotation: -90,
                opacity: 0,
                onComplete: function() {
                    showThemeScreen();
                    document.querySelector(".categories").classList.add("_hide");
                }
            }, "<50%");
        } else if (4 == config.state) {
            document.querySelector(".finaly").classList.add("_hide");
            let tl = gsap.timeline({
                defaults: {
                    duration: .5
                }
            });
            tl.to(".finaly__bottom", {
                y: 50,
                opacity: 0
            });
            tl.to(".finaly__box", {
                x: -100,
                opacity: 0
            }, "<50%");
            tl.to(".finaly__title", {
                y: -50,
                opacity: 0
            }, "<50%");
            tl.to(".header", {
                rotation: -90,
                opacity: 0,
                onComplete: function() {
                    config.state = 1;
                    gameVariables.count = 1;
                    document.querySelectorAll(".finaly__resalt-string").forEach((string => string.remove()));
                    drawGameBg(showGameScreen);
                }
            }, "<50%");
        }
    }
    function showMainScreen() {
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".header", {
            rotation: 0,
            opacity: 1
        });
        console.log(config.state);
        if (1 == config.state) {
            document.querySelector(".categories").classList.remove("_hide");
            tl.to(".categories__title", {
                y: 0,
                opacity: 1
            }, "<50%");
            tl.to('[data-btn="1"', {
                x: 0,
                opacity: 1
            });
            tl.to('[data-btn="3"', {
                x: 0,
                opacity: 1
            }, "<");
            tl.to('[data-btn="2"', {
                x: 0,
                opacity: 1
            }, "<");
            tl.to('[data-btn="4"', {
                x: 0,
                opacity: 1
            }, "<");
        } else if (2 == config.state) {
            document.querySelector(".finaly").classList.remove("_hide");
            tl.to(".finaly__title", {
                y: 0,
                opacity: 1
            });
            tl.to(".finaly__box", {
                x: 0,
                opacity: 1
            }, "<50%");
            tl.to(".finaly__bottom", {
                y: 0,
                opacity: 1,
                onComplete: function() {
                    config.state = 1;
                }
            }, "<50%");
        }
    }
    function hideFinalyScreen() {
        document.querySelector(".finaly").classList.add("_hide");
        document.querySelector(".categories").classList.remove("_hide");
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".finaly__bottom", {
            y: 50,
            opacity: 0
        });
        tl.to(".finaly__box", {
            x: -100,
            opacity: 0
        }, "<50%");
        tl.to(".finaly__title", {
            y: -50,
            opacity: 0,
            onComplete: function() {
                resetData();
                showMainScreen();
            }
        }, "<50%");
    }
    function checkTopic(elem) {
        let numberTopic = +elem.dataset.btn;
        if (1 == numberTopic) config.currentTopic = "movies"; else if (2 == numberTopic) config.currentTopic = "places"; else if (3 == numberTopic) config.currentTopic = "art it out"; else if (4 == numberTopic) config.currentTopic = "famous people";
        getLetters();
    }
    function writeLetters(block) {
        document.querySelector(`.${block}__title`).innerHTML = "";
        config.letters.forEach(((letter, i) => {
            document.querySelector(`.${block}__title`).innerHTML += `<div class="${block}__word_${i}"> </div>`;
            letter.forEach((word => {
                document.querySelector(`.${block}__word_${i}`).innerHTML += `<span class="letter">${word}</span>`;
            }));
        }));
    }
    function showThemeScreen() {
        document.querySelector(".theme-screen").classList.remove("_hide");
        writeLetters("theme-screen");
        gsap.set(".letter", {
            opacity: 0,
            y: 50,
            display: "inline-block"
        });
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".theme-screen__title", {
            opacity: 1
        });
        tl.to(".theme-screen__text", {
            opacity: 1,
            x: 0
        }, "<");
        tl.to(".theme-screen__buttons", {
            opacity: 1,
            y: 0
        });
        tl.to(".letter", {
            y: 0,
            opacity: 1,
            stagger: .05,
            ease: "back.out(4)"
        });
    }
    function hideThemeScreen(state) {
        let tl = gsap.timeline({
            defaults: {
                duration: .25
            }
        });
        tl.to(".theme-screen__buttons", {
            opacity: 0,
            y: 100
        });
        tl.to(".theme-screen__text", {
            opacity: 0,
            x: -100
        });
        tl.to(".letter", {
            opacity: 0,
            y: 50,
            stagger: .05,
            ease: "back.in(4)",
            onComplete: function() {
                document.querySelector(".theme-screen").classList.add("_hide");
                if (state) showMainScreen(); else drawGameBg(showGameScreen);
            }
        });
    }
    function getLetters() {
        config.words = config.currentTopic.split(" ");
        config.words.forEach(((word, i) => {
            config.letters[i] = word.split("");
        }));
    }
    const gameVariables = {
        fontSize: window_width < 1e3 ? 72 : 120,
        currentThemeArr: [],
        currentWord: "",
        time: config.time,
        timerId: false,
        count: 1
    };
    function writeStartDataGame() {
        document.querySelector(".game__text-timer").textContent = config.time;
        checkCurrentTheme();
        deleteWordFromArr();
        rewriteWord();
    }
    function checkCurrentTheme() {
        let newArr = [];
        if ("movies" == config.currentTopic) {
            newArr = config.movies.slice();
            gameVariables.currentThemeArr = shuffle(newArr);
        } else if ("places" == config.currentTopic) {
            newArr = config.places.slice();
            gameVariables.currentThemeArr = shuffle(newArr);
        } else if ("art it out" == config.currentTopic) {
            newArr = config.art.slice();
            gameVariables.currentThemeArr = shuffle(newArr);
        } else if ("famous people" == config.currentTopic) {
            newArr = config.famous.slice();
            gameVariables.currentThemeArr = shuffle(newArr);
        }
    }
    function showGameScreen() {
        document.querySelector(".game").classList.remove("_hide");
        if (1 == config.state) writeStartDataGame();
        if (3 == config.state) document.querySelector(".game__text-timer").textContent = config.time;
        gsap.set(".letter", {
            opacity: 0,
            y: 50,
            display: "inline-block"
        });
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".game__timer", {
            y: 0,
            opacity: 1
        });
        tl.to(".game__button_right", {
            x: 0,
            opacity: 1
        }, "<50%");
        tl.to(".game__button_unright", {
            x: 0,
            opacity: 1
        }, "<");
        tl.to(".letter", {
            y: 0,
            opacity: 1,
            stagger: .05,
            ease: "back.out(4)",
            onComplete: function() {
                if (3 == config.state) config.state = 1;
                startGame();
            }
        });
    }
    function hideGameScreen(state) {
        console.log("Hide game screen");
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".letter", {
            y: -50,
            opacity: 0
        });
        tl.to(".game__timer", {
            opacity: 0
        });
        tl.to(".game__button_right", {
            x: -50,
            opacity: 0
        });
        tl.to(".game__button_unright", {
            x: 50,
            opacity: 0,
            onComplete: function() {
                if (state) drawTimeOffBg(showTimeOverScreen); else drawMainBg(showMainScreen);
                document.querySelector(".game").classList.add("_hide");
            }
        }, "<");
    }
    function showTimeOverScreen() {
        console.log("showTimeOverScreen");
        document.querySelector(".timeover").classList.remove("_hide");
        let tl = gsap.timeline({
            defaults: {
                duration: .5,
                ease: "sine.in"
            }
        });
        tl.to(".timeover__text", {
            y: 0,
            opacity: 1
        });
        tl.to(".timeover__button_home", {
            x: 0,
            opacity: 1
        });
        tl.to(".timeover__button_play", {
            x: 0,
            opacity: 1
        }, "<");
    }
    function hideTimeOverScreen(state) {
        rewriteWord();
        let tl = gsap.timeline({
            defaults: {
                duration: .99
            }
        });
        tl.to(".timeover__button_home", {
            x: -500,
            opacity: 0
        });
        tl.to(".timeover__button_play", {
            x: 500,
            opacity: 0
        }, "<");
        tl.to(".timeover__text", {
            y: -100,
            opacity: 0,
            onComplete: function() {
                if (state) drawMainBg(showMainScreen); else showGameScreen();
                document.querySelector(".timeover").classList.add("_hide");
            }
        });
    }
    function deleteWordFromArr() {
        gameVariables.currentWord = gameVariables.currentThemeArr.pop();
    }
    function rewriteWord() {
        config.letters = [];
        config.words = gameVariables.currentWord.split(" ");
        config.words.forEach(((word, i) => {
            config.letters[i] = word.split("");
        }));
        writeLetters("game");
        gsap.set(".letter", {
            opacity: 0,
            y: 50,
            display: "inline-block"
        });
    }
    function drawGameBg(callback) {
        gsap.to(".wrapper", {
            backgroundImage: "radial-gradient(50% 70.4% at 50% 18.47%, #FF745C 0%, #FF5954 100%)",
            duration: 1,
            onComplete: callback
        });
    }
    function drawTimeOffBg(callback) {
        gsap.to(".wrapper", {
            backgroundImage: "radial-gradient(50% 70.4% at 50% 18.47%, #E338FF 0%, #870EFF 100%)",
            duration: 1,
            onComplete: callback
        });
    }
    function drawMainBg(callback) {
        gsap.to(".wrapper", {
            backgroundImage: "radial-gradient(124.79% 58.12% at 50% 30.75%, #ffdf38 0%, #ff9c0e 100%)",
            duration: 1,
            onComplete: callback
        });
    }
    function startGame() {
        let text = document.querySelector(".game__text-timer");
        text.textContent = gameVariables.time;
        document.querySelector(".game__buttons").classList.remove("_lock");
        gameVariables.timerId = setInterval((() => {
            gameVariables.time--;
            text.textContent = gameVariables.time;
            checkEndTime();
        }), 1e3);
    }
    function checkEndTime() {
        if (gameVariables.time <= 0) {
            clearInterval(gameVariables.timerId);
            console.log("Time is over - the word is unknown!");
            writeResultWorldInFinalyScreen(gameVariables.currentWord, "x");
            deleteWordFromArr();
            setTimeout((() => {
                hideGameScreen(true);
            }), 500);
        }
    }
    function checkCountWords() {
        clearInterval(gameVariables.timerId);
        if (gameVariables.currentThemeArr.length > 0) {
            deleteWordFromArr();
            animRewriteData();
        } else {
            config.state = 2;
            hideGameScreen(false);
            console.log("Слова закончились - показываем итоговый экран");
        }
    }
    function animRewriteData() {
        let tl = gsap.timeline({
            defaults: {
                duration: .75,
                delay: .25
            }
        });
        hideTimer();
        tl.to(".letter", {
            y: 50,
            opacity: 0,
            stagger: .05,
            ease: "back.out(4)",
            onComplete: function() {
                rewriteWord();
                backPositionLetters();
            }
        });
    }
    function backPositionLetters() {
        let tl = gsap.timeline({
            defaults: {
                duration: .5
            }
        });
        tl.to(".letter", {
            y: 0,
            opacity: 1,
            stagger: .05,
            ease: "back.out(4)",
            onComplete: function() {
                startGame();
            }
        });
    }
    function resetData() {
        gameVariables.currentThemeArr = [];
        gameVariables.currentWord = "";
        gameVariables.time = config.time;
        gameVariables.count = 1;
        document.querySelectorAll(".finaly__resalt-string").forEach((string => string.remove()));
    }
    function writeResultWorldInFinalyScreen(text, state) {
        let resultString = document.createElement("div");
        resultString.classList.add("finaly__resalt-string");
        let number = document.createElement("div");
        number.classList.add("finaly__number");
        number.textContent = `${gameVariables.count}.`;
        let word = document.createElement("div");
        word.classList.add("finaly__word");
        word.textContent = text;
        let circle = document.createElement("div");
        circle.classList.add("finaly__result-circle");
        circle.textContent = state;
        resultString.append(number, word, circle);
        document.querySelector(".finaly__box").append(resultString);
    }
    function hideTimer() {
        let tl = gsap.timeline({
            defaults: {
                delay: .25,
                duration: 1.5,
                ease: "elastic.out(1, 0.5)"
            }
        });
        tl.to(".game__timer", {
            rotate: 360,
            opacity: 0,
            onComplete: function() {
                gameVariables.time = config.time;
                document.querySelector(".game__text-timer").textContent = gameVariables.time;
            }
        });
        tl.to(".game__timer", {
            rotate: 0,
            opacity: 1,
            duration: 1.5
        });
    }
    document.addEventListener("click", (e => {
        let targetElement = e.target;
        if (targetElement.closest(".preloader__button")) gsap.to(targetElement.closest(".preloader__button"), {
            y: 10,
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                sessionStorage.setItem("preloader", true);
                preloader.classList.add("_hide");
                wrapper.classList.add("_visible");
                if (document.querySelector(".main") && document.querySelector(".preloader").classList.contains("_hide")) document.querySelector(".main__body").classList.add("_active");
            }
        });
        if (targetElement.closest(".categories__button")) {
            checkTopic(targetElement.closest(".categories__button"));
            gsap.to(targetElement.closest(".categories__button"), {
                y: 2,
                duration: .3,
                boxShadow: "0px 2px 4px 1px #FF890C",
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log("complete");
                    hideMainScreen();
                }
            });
        }
        if (targetElement.closest('[data-btn="back"]')) gsap.to(targetElement.closest('[data-btn="back"]'), {
            y: 10,
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                config.letters = [];
                hideThemeScreen(true);
            }
        });
        if (targetElement.closest('[data-btn="play"]')) gsap.to(targetElement.closest('[data-btn="play"]'), {
            y: 10,
            boxShadow: "0px 0px 0px rgba(0, 0, 0, 0.5)",
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                hideThemeScreen(false);
            }
        });
        if (targetElement.closest(".game__button_right")) {
            if (gameVariables.currentThemeArr.length > 0) addRemoveClass(".game__buttons", "_lock", 3500); else addRemoveClass(".game__buttons", "_lock", 4e3);
            gsap.to(targetElement.closest(".game__button_right"), {
                scale: .9,
                duration: .1,
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log("Write next word and restart timer");
                    console.log("Записываем текущее слово в массив правильных слов");
                    writeResultWorldInFinalyScreen(gameVariables.currentWord, "v");
                    gameVariables.count++;
                    checkCountWords();
                }
            });
        }
        if (targetElement.closest(".game__button_unright")) {
            if (gameVariables.currentThemeArr.length > 0) addRemoveClass(".game__buttons", "_lock", 3500); else addRemoveClass(".game__buttons", "_lock", 4e3);
            gsap.to(targetElement.closest(".game__button_unright"), {
                scale: .9,
                duration: .1,
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log("Write next word and restart timer");
                    console.log("Записываем текущее слово в массив НЕправильных слов");
                    writeResultWorldInFinalyScreen(gameVariables.currentWord, "x");
                    gameVariables.count++;
                    checkCountWords();
                }
            });
        }
        if (targetElement.closest(".timeover__button_home")) gsap.to(targetElement.closest(".timeover__button_home"), {
            scale: .9,
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                config.state = 2;
                hideTimeOverScreen(true);
                console.log("Write current results to finaly screen areas");
                console.log("Show finaly screen");
            }
        });
        if (targetElement.closest(".timeover__button_play")) {
            config.state = 3;
            gsap.to(targetElement.closest(".timeover__button_play"), {
                scale: .9,
                duration: .1,
                yoyo: true,
                repeat: 1,
                onComplete: function() {
                    console.log("Back to game");
                    gameVariables.time = config.time;
                    gameVariables.count++;
                    drawGameBg(hideTimeOverScreen);
                }
            });
        }
        if (targetElement.closest('[data-btn="restart"]')) gsap.to(targetElement.closest('[data-btn="restart"]'), {
            scale: .9,
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                console.log("restart game with current topic");
                console.log(config.currentTopic);
                config.state = 4;
                gameVariables.time = config.time;
                document.querySelector(".game__text-timer").textContent = config.time;
                hideMainScreen();
            }
        });
        if (targetElement.closest('[data-btn="home"]')) gsap.to(targetElement.closest('[data-btn="home"]'), {
            scale: .9,
            duration: .1,
            yoyo: true,
            repeat: 1,
            onComplete: function() {
                hideFinalyScreen(showMainScreen);
                console.log(gameVariables.currentThemeArr);
                console.log("show main buttons");
                console.log("delete last game data");
            }
        });
    }));
    window.addEventListener("resize", resize);
    function resize() {
        if (document.documentElement.clientWidth / document.documentElement.clientHeight > 1 && document.documentElement.clientWidth < 1800) document.querySelector(".categories__buttons").style.gridTemplateColumns = "repeat(4, 1fr)"; else if (document.documentElement.clientWidth / document.documentElement.clientHeight < 1 && document.documentElement.clientWidth < 1800) document.querySelector(".categories__buttons").style.gridTemplateColumns = "repeat(2, 1fr)";
    }
    window["FLS"] = true;
    isWebp();
    addLoadedClass();
})();