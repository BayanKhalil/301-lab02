`use strict`

$(document).ready(function () {
    let keywordsArray = [];
    let objArr = [];
    function Horns(title, image_url, description, keyword, horns) {
        this.title = title;
        this.image_url = image_url;
        this.description = description;
        this.keyword = keyword;
        this.horns = horns;
        objArr.push(this);
        keywordsArray.push(this.keyword);



    }

    Horns.prototype.render = function () {
        let $photoTemplate = $('#photo-template').html();
        let html = Mustache.render($photoTemplate, this);
        console.log(html);
        $('main').append(html);


        // let photoTemplate = $('#photo-template').clone();
        // photoTemplate.find('h2').text(this.title);
        // photoTemplate.find('img').attr('src', this.image_url);
        // photoTemplate.find('p').text(this.description);
        // photoTemplate.attr('class', `${this.keyword} visible`);
        // photoTemplate.removeAttr('id');
        // $('main').append(photoTemplate);

    }


    Horns.prototype.listKewords = function () {

        let $optionCopy = $('option:first').clone();
        $optionCopy.attr('value', this.keyword);
        $optionCopy.text(this.keyword);
        $('select').append($optionCopy);


    }

    function getHornData1() {

        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        }
        console.log("I will use the ajax ..")
        $.ajax('data/page-1.json', ajaxSettings).then(data => {
            console.log("we got the data!!")
            console.log(data);
            console.log(typeof data);
            data.forEach(element => {
                console.log(element);
                let hornObj = new Horns(element.title, element.image_url, element.description, element.keyword, element.horns);
                hornObj.render();
                hornObj.listKewords();
            });
        })
    }
    getHornData1();

    function getHornData2() {

        const ajaxSettings = {
            method: 'get',
            dataType: 'json'
        }
        console.log("I will use the ajax ..")
        $.ajax('data/page-2.json', ajaxSettings).then(data => {
            console.log("we got the data!!")
            console.log(data);
            console.log(typeof data);
            data.forEach(element => {
                console.log(element);
                let hornObj = new Horns(element.title, element.image_url, element.description, element.keyword, element.horns);
                hornObj.render();
                hornObj.listKewords();
            });
        })
    }
    getHornData2()

    $('#firstPage').on('click', () => {
        $('section').remove();
        $('option:not(:first)').remove();
        objArr = [];
        getHornData1();
    })

    $('#secondPage').on('click', () => {
        $('section').remove();
        $('option:not(:first)').remove();
        objArr = [];
        getHornData2()
    })


    $('select').on('change', () => {
        $('section').removeClass('visible');
        let $buttonValue = $('select option:selected').val();
        console.log($buttonValue);



        if ($buttonValue === 'default') {
            $('section').addClass('visible');

        }
        $(`[class*=${$buttonValue}]`).addClass('visible').show();
        console.log($(`[class*=${$buttonValue}]`).addClass('visible'));

    })

    $('#byHorns').on('click', (event) => {
        event.preventDefault();
        $('section').remove();
        objArr.sort((a, b) => {
            return b.horns - a.horns;
        });
        objArr.forEach(value => {
            value.render();
        });
        $('section').removeClass('visible');
        let $buttonValue = $('select option:selected').val();
        console.log($buttonValue);

        if ($buttonValue === 'default') {
            $('section').addClass('visible');
        }
        $(`${$buttonValue}`).addClass('visible');
    })

    $('#byName').on('click',()=>{
        $('section').remove();
        objArr.sort((a,b) =>{
            let firstTitle = a.title.toLowerCase();
            let secondTitle = b.title.toLowerCase();
            if (firstTitle > secondTitle){
                return 1;
            }else{
                return -1
            }
            
        });
        objArr.forEach(value =>{
            value.render();
        });
        $('section').removeClass('visible');
        
        let $buttonValue = $('select option:selected').val();
        console.log($buttonValue);

        if ($buttonValue === 'default'){
            $('section').addClass('visible');
        }
        $(`[class*=${$buttonValue}]`).addClass('visible');
    })




});






