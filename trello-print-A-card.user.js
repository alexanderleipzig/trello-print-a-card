// ==UserScript==
// @name         Trello Print-A-Card
// @version      0.3
// @description  Print Cards
// @author       Alexander Rothe, Daniel Pichel, Nikolaj Andersen
// @match        https://trello.com/*
// @grant        none
// @require http://code.jquery.com/jquery-2.1.4.min.js
// ==/UserScript==

setTimeout(function() {
    var target = $('.window-overlay .window');
    target.attr('id', 'cardid');

    target = document.getElementById('cardid');
    observer.observe(target, { attributes : true, attributeFilter : ['style'] });
    addPrintButton();
}, 3000
          );


function addPrintButton() {
    $('.other-actions .button-link:first').before('<a class="button-link js-print" href="#"><span class="icon-sm icon-share"></span> Print Card</a>');
    $('.js-print').click(function(){
        print();
    });
}

function print() {
    var mywindow = window.open('', 'my div', 'height=400,width=600');
    mywindow.document.write('<div style="width:300px;border:1px dashed #000;padding:30px;font-family:Arial;font-size:14px;">');
    mywindow.document.write('<div style="border:1px dotted #000;padding:20px;float:right;margin-right:-20px;margin-top:-20px;"> </div>');
    mywindow.document.write('<h2>'+$('.window-title-text').html()+'</h2>');
    mywindow.document.write($('.js-card-desc').html());
    mywindow.document.write('started_at:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;');
    mywindow.document.write('finished_at:');
    var lists = $('p.checklist-item-details-text');
    if (lists.length) {
        mywindow.document.write("<h3>Checklist</h3>");
        lists.each(function() {
            var text = $(this).text();
            mywindow.document.write("<p><input type='checkbox'>"+ ' ' + text + "</p>");
        });
    }
    mywindow.document.write('</div>');
    mywindow.print();
    mywindow.close();
    return true;
}



var CARD_OPEN_STATE = 0;

var observer = new MutationObserver(function(mutations) {

    var state = $('.card-detail-window').length
    if(state!=CARD_OPEN_STATE) {
        CARD_OPEN_STATE = state;
        if(CARD_OPEN_STATE==1)   addPrintButton();
    }
});
