// Text Database
const text_difficulty = {
    easy: `The archaeological expedition unearthed artifacts that complicated prevailing theories about Bronze Age trade networks. Obsidian from Anatolia, lapis lazuli from Afghanistan, and amber from the Baltic were all discovered in a single Mycenaean tomb.`,
    medium: `During the rapid evolution of modern technology, developers are constantly required to adapt their skills and workflows. Writing clean, readable, and efficient code under time pressure is not an easy task. Small mistakes such as missing commas, incorrect casing, or misplaced symbols can dramatically affect performance and accuracy.`,
    hard: `As software systems scale and user demands increase, maintaining consistency across large codebases becomes increasingly complex. Synchronizing asynchronous processes, optimizing memory allocation, and debugging elusive race conditions require not only technical expertise but also exceptional focus. Engineers must reason through multiple layers of abstraction while tracking state changes in real time. Under such cognitive load, even minor typographical errors can introduce critical failures.`
};

const result_title_text = {
    baseline : {
        title : 'Baseline Established!',
        discription : "You've set the bar. Now the real challang begins-time to beat it."
    },
    new_record : {
        title : 'High Score Smashed!',
        discription : "You're getting faster. That was incredible typing."
    },
    compeleted : {
        title : 'Test Compelete!',
        discription : "Solid run. Keep pushing to beat your high score."
    }
}

const reset_btn_text = {
    baseline : 'Beat This Score',
    compeleted : 'Go Again'
}

// Dom Elements
const $ = document

function getElementByClass (elem) {
    return $.querySelector(`.${elem}`)
}

function getAllElementByClass (elem) {
    return $.querySelectorAll(`.${elem}`)
}
// record
const best_record = getElementByClass("user-score");
const tick_icon = getElementByClass("tick-icon");
const prize_icon = getElementByClass("prize-icon");
// typing details counter
const wpm = getElementByClass("wpm-counter");
const accuracy = getElementByClass("accuracy-percentage");
const time = getElementByClass("time-counter");
// mobile drop down menu
const selected_difficulty = getElementByClass("selected-difficulty");
const selected_difficulty_mode = getElementByClass("selected-difficulty-mode");
const selected_time = getElementByClass("selected-time");
const selected_time_mode = getElementByClass("selected-time-mode");
const mobile_difficulty_drop_down_menu = getElementByClass("difficfromty-menu");
const mobile_time_drop_down_menu = getElementByClass("time-menu");
const difficulty_drop_down_items = getAllElementByClass("difficulty-drop-down-items");
const time_drop_down_items = getAllElementByClass("time-drop-down-items");
const mobile_time_mode = getElementByClass("mobile-time-mode");
const mobile_passage_mode = getElementByClass('mobile-passage-mode');
// difficulty modes
const easy_mode = getElementByClass("easy-mode");
const medium_mode = getElementByClass("medium-mode");
const hard_mode = getElementByClass("hard-mode");
const difficulty_modes_item = [easy_mode, medium_mode, hard_mode];
// content container section
const content_container_section = getElementByClass("container-content-section");
// typing modes
const time_mode = getElementByClass("time-mode");
const passage_mode = getElementByClass("unlimited-mode");
const time_modes_item = [time_mode, passage_mode];
const all_typing_time_modes = [time_mode, mobile_time_mode, passage_mode, mobile_passage_mode];
let is_time_mode = true;
// result page
const result_title = getElementByClass("result-page-title");
const result_more_description = getElementByClass("more-description-text");
const result_section = getElementByClass("result-page");
const result_wpm = getElementByClass("wpm-qunatity");
const result_accuracy = getElementByClass("result_accuracy");
const userـcorrectـcharacterـquantity = getElementByClass("user-correct-character-quantity");
const user_wrong_letter_qunatity = getElementByClass("user-wrong-character-quantity");
const try_again_btn = getElementByClass("try-again-button");
const new_record_decoration = getElementByClass("new-record-decoration");
// starting layout
const start_layout = getElementByClass("start-layout");
const start_btn = getElementByClass("start-btn");
// typing environment
const caret = getElementByClass("caret");
const typing_input = getElementByClass("typing-input");
const typing_section = getElementByClass("typing-section");
const typing_environment = getElementByClass("typing-text-section");
const easy_text = text_difficulty.easy.split('');
const medium_text = text_difficulty.medium.split('');
const hard_text = text_difficulty.hard.split('');
let currnt_text = easy_text;
// reset section
const restart_btn = getElementByClass("restart-section");
// count user tries
let user_tries = 0;
let user_time = 0;
// add active class to navbar items when they clicked in desktop
function add_active_class (elem) {
    elem.classList.add("active-mode");
}
// difficult mode
difficulty_modes_item.forEach(item => {
    item.addEventListener("click", (event)=> {
        difficulty_modes_item.forEach(elem => elem.classList.remove("active-mode"))
        add_active_class(event.currentTarget);
    })
})
// time mode
time_modes_item.forEach(item => {
    item.addEventListener("click", (event)=> {
        time_modes_item.forEach(elem => elem.classList.remove("active-mode"))
        add_active_class(event.currentTarget);
    })
})


// activate drop down menus when difficulty and time selected click in mobile
selected_difficulty.addEventListener("click", ()=> {
    mobile_difficulty_drop_down_menu.classList.toggle("hidden");
})

selected_time.addEventListener("click", ()=> {
    mobile_time_drop_down_menu.classList.toggle("hidden")
})

// change drop downs selected text base on user clicked on drop down menu items
function change_drop_down_title (elem) { 
    const previous_sibling = elem.previousElementSibling;
    if(String(elem.classList).includes("difficulty")) {
        selected_difficulty_mode.textContent = previous_sibling.textContent;
        switch (previous_sibling.textContent) {
            case "Easy":
                currnt_text = easy_text;
                break;
            case "Medium" : 
                currnt_text = medium_text;
                break;
            default:
                currnt_text = hard_text;
        }
        change_typing_text(currnt_text);
        return
    }
    selected_time_mode.textContent = elem.previousElementSibling.textContent;
}

difficulty_drop_down_items.forEach( item => {
    item.addEventListener("click", (event)=> {
        change_drop_down_title(event.currentTarget);
    })
})

time_drop_down_items.forEach( item => {
    item.addEventListener("click", (event)=> {
        change_drop_down_title(event.currentTarget);
    })
})

mobile_difficulty_drop_down_menu.addEventListener("blur", (event)=> {
    event.currentTarget.classList.add("hidden")
})
mobile_time_drop_down_menu.addEventListener("blur", (event)=> {
    event.currentTarget.classList.add("hidden")
})

// start typing (when start button clicked)
function disapear_start_layout() {
    is_finished = false;
    if(is_time_mode){
        time_calculation()
    }
    else {
        time_counter_function()
    }
    caret.classList.remove("hidden");
    start_layout.classList.add('hidden');
    typing_input.disabled = false;
    typing_input.focus(); 
    user_tries++
}


start_btn.addEventListener("click", disapear_start_layout) 
// start typing (when space button clicked)
window.addEventListener('keydown', (event)=> {
    if(event.code == "Space" && !start_layout.classList.contains('hidden')) {
        disapear_start_layout()
    }
})


// typing environment 
// make text into span
function change_typing_text (text_mode) {
    time.textContent = is_time_mode ? "0:60" : "0:0";
    typing_environment.innerHTML = '';
    for(let letter of text_mode) {
        typing_environment.innerHTML += `<span class='text-[24px] lg:text-[30px]'>${letter}</span>`
    }
}
change_typing_text(currnt_text);
difficulty_modes_item.forEach(mode => {
    mode.addEventListener("click", ()=> {
        if(mode == easy_mode) {
            currnt_text = easy_text;
            restar_typing()
        }
        else if(mode == medium_mode) {
            currnt_text = medium_text;
            restar_typing()
        }
        else {
            currnt_text = hard_text;
            restar_typing()
        }
        change_typing_text(currnt_text);
        
    })
})

// add correct and wrong classes to spans
let index = 0;
const typing_text_children = typing_environment.children ;
const typing_environment_position = typing_environment.getBoundingClientRect();
let is_finished = false;

function checkCharacter(letter) {
    if(letter == currnt_text[index]){
        typing_text_children[index].classList.add("correct");
        move_caret(index+1)
        index++
    }
    else {
        typing_text_children[index].classList.add("wrong","underline");
        move_caret(index+1)       
        index++
    }
}
// set keydown event on input and send user's input to checkCharacter function
typing_input.addEventListener("keydown", (event)=> {
    if(event.key == "Shift" || event.key == "Enter") return;
    if(event.key == "Backspace") {
        if(index > 0) {
            index--
        }
        typing_text_children[index].classList.remove("underline", "correct", "wrong");
        move_caret(index)
        return
    }    
    checkCharacter(event.key);
})

// move typing symbol
function move_caret (position) {
    if(position == typing_text_children.length) {
        is_finished = true; 
        caret.classList.add('hidden');
        typing_input.disabled = true;
        typing_input.blur();
        show_result_page();
        return
        // show result page
    }
    const letter_position = typing_text_children[position].getBoundingClientRect();
    caret.style.top = (letter_position.top - typing_environment_position.top) + 5 + 'px';
    caret.style.left = (letter_position.left - typing_environment_position.left) + 'px';
}


// typing environment disappear and result page appear
let new_record = false;
function show_result_page () {
    clearTimer()
    calculation()
    if(new_record) {
        new_record_decoration.classList.remove("hidden");
        result_title.textContent = result_title_text.new_record.title;
        result_more_description.textContent = result_title_text.new_record.discription;
        tick_icon.classList.add('hidden');
        prize_icon.classList.remove('hidden');
    }
    content_container_section.classList.add('hidden');
    result_section.classList.remove('hidden');
}

// claculate wpm and accuracy
function calculation() {
    const safeTime = Math.max(user_time, 1);
    const correct_characters_quantity = getAllElementByClass("correct").length;
    const wrong_characters_quantity = getAllElementByClass("wrong").length;
    const total_characters = currnt_text.length;
    const accuracy_content = ((correct_characters_quantity / total_characters) * 100).toFixed(1) + '%';    
    const wpm_content = ((correct_characters_quantity / 5) / (safeTime / 60)).toFixed(1);  
    if(wpm_content > wpm.textContent && user_tries > 1) {
        wpm.textContent = wpm_content
        new_record = true;
    }
    wpm.textContent = wpm_content;
    best_record.textContent = wpm_content > best_record.textContent ? wpm_content : best_record.textContent
    accuracy.textContent = accuracy_content;
    result_wpm.textContent = wpm_content;
    result_accuracy.textContent = accuracy_content;
    userـcorrectـcharacterـquantity.textContent = correct_characters_quantity
    user_wrong_letter_qunatity.textContent = wrong_characters_quantity;
}


// calculate time function
let time_timer_id = null;

function time_calculation() {
    if (time_timer_id) clearInterval(time_timer_id);
    user_time = 0;
    let timer = 60;
    time_timer_id = setInterval(() => {
        if (timer <= 0 || is_finished) {
            clearInterval(time_timer_id);
            time_timer_id = null;
            show_result_page();
            return;
        }
        timer--;
        user_time++;        
        time.textContent = `0:${timer}`;
    }, 1000);
}

// restart button clicked
function restar_typing() {
    clearTimer()
    caret.classList.add("hidden");
    for(let i = 0; i < typing_text_children.length; i++){
        typing_text_children[i].classList.remove("wrong", "correct", "underline");
    }
    index = 0;
    caret.style.left = '11px';
    caret.style.top = '20px';  
    // restart timer
    start_layout.classList.remove('hidden');
}

restart_btn.addEventListener("click", restar_typing);

// try again button clicked
function disppear_result_pgae() { 
    new_record = false;
    new_record_decoration.classList.add('hidden');
    result_title.textContent = result_title_text.compeleted.title;
    result_more_description.textContent = result_title_text.compeleted.discription;
    tick_icon.classList.remove('hidden');
    prize_icon.classList.add('hidden');
    content_container_section.classList.remove('hidden');
    result_section.classList.add('hidden');
    time.textContent = (is_time_mode) ? '0:60' : '0:0';
    restar_typing()
}
try_again_btn.addEventListener("click", disppear_result_pgae);


// passage mode or time mode;

function timing_mode (elem) {
    clearTimer()
    if(elem == "Passage") {
        is_time_mode = false;
        time.textContent = '0:0';
        restar_typing();
        start_layout.classList.remove('hidden');
    }
    else {
        is_time_mode = true;
        time.textContent = '0:60';
        restar_typing();
        start_layout.classList.remove('hidden');
    }
    return is_time_mode;
}

all_typing_time_modes.forEach(mode => {
    mode.addEventListener('click', ()=> {
        timing_mode(mode.firstElementChild.textContent);
    })
})


// timer for passage mode
let passage_timer_id = null;
function time_counter_function() {
    user_time = 0;
    if (passage_timer_id) clearInterval(passage_timer_id);
    let second = 0;
    let minute = 0;
    passage_timer_id = setInterval(() => {
        if (is_finished) {
            clearInterval(passage_timer_id);
            passage_timer_id = null;
            show_result_page();
            return;
        }
        second++;
        user_time++
        if (second === 60) {
            second = 0;
            minute++;            
        }
        time.textContent = `${minute}:${second}`;
    }, 1000);
}



// bugs 
// timer is not restart when we switch between modes from time to passage;
function clearTimer () {
    if(time_timer_id){
        clearInterval(time_timer_id);
        time_timer_id = null;
    }
    if(passage_timer_id) {
        clearInterval(passage_timer_id);
        passage_timer_id = null;
    }
}