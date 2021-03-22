`use strict`


let keywordsArray = [];
function Horns(title, image_url,description,keyword,horns) {
    this.title = title;
    this.image_url = image_url;
    this.description = description;
    this.keyword = keyword;
    this.horns = horns;
    keywordsArray.push(this.keyword);


}

Horns.prototype.render=function(){
    let photoTemplate = $('#photo-template').clone();
    $('main').append(photoTemplate);
    photoTemplate.find('h2').text(this.title);
    photoTemplate.find('img').attr('src', this.image_url);
    photoTemplate.find('p').text(this.description);

    photoTemplate.removeAttr('id');

}


Horns.prototype.listKewords=function(){
   
        let $optionCopy = $('option:first').clone();
        $optionCopy.attr('value',this.keyword);
        $optionCopy.text(this.keyword);
        $('select').append($optionCopy);
  
}

function getHornData() {

    const ajaxSettings = {
        method: 'get',
        dataType: 'json'
    }
    console.log("I will use the ajax ..")
    $.ajax('data/page-1.json', ajaxSettings).then(data=> {
        console.log("we got the data!!")
        console.log(data);
        console.log(typeof data);
        data.forEach(element=> {
            console.log(element);
            let hornObj = new Horns(element.title, element.image_url,element.description,element.keyword,element.horns);
            hornObj.render();
            hornObj.listKewords();
            $('selecting').append($('<option></option>').attr('value', element.keyword))
        });
    })
}
$('document').ready(getHornData);


$('select').on('change', function(event){
    let options = $('select').find(':selected').text()
    event.preventDefault();
    $('h2').hide();
    $('img').hide();
    $('p').hide();
    $(options).show();
   
});



