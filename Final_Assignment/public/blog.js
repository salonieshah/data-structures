// This file updates the query and the result everytime a user interacts 
// Listen for changes and call function
$(function(){
    $('input').change(function() {
        getResults()
    });
    $('select').change(function() {
        getResults()
    });
});


function getResults(){
    
// Send updated settings 
    var parameters = {category: $('select[name="category"]').val()}
    $.get( '/blog',parameters, function(data) {
        
        // the return data (hanlebars html) is added to the blogpost DIV.
        $('#blogpost').html(data)
    });
}

function init(){
    getResults()
}

init()
