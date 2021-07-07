$('#quizz ul li').click(function () {
    $(this).toggleClass("selectedAnswer");
    const answer = document.querySelector('.selectedAnswer').textContent;
    console.log(answer);
    document.getElementById('nextbtn').style.display = 'block';

    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("userid")
    window.location.href = '/question2.html?userid=' + username + '&answer1=' + answer;
});


var flag = 0;
var colors = [];
$('#quizzz ul li').click(function () {
    let answer = '';
    $(this).toggleClass("selectedAnswer");
    if (flag >= 1) {
        document.getElementById('nextbtn2').style.display = 'block';
        document.getElementById('morebtn').style.display = 'none';
        answer = document.querySelectorAll('.selectedAnswer');
        console.log(answer);
        answer.forEach(function (i, index) {
            console.log(i.textContent);
            colors.push(i.textContent);
        })
        console.log("Final Answer", colors);

    } else {
        answer = document.querySelector('.selectedAnswer').textContent;
        console.log(answer);
        document.getElementById('morebtn').style.display = 'block';
    }
    flag++;

});

document.querySelector('#nextbtn2').addEventListener('click',()=>{
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("userid")
    var answer1 = url.searchParams.get("answer1");
    var uniqueNames = [];
$.each(colors, function(i, el){
    if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
});

console.log("Final array is",uniqueNames);

    console.log("Request to be sent", username, answer1, colors);
    axios.post('/AddAnswer', {
            username: username,
            answer1 : answer1,
            answer2 : uniqueNames
        })
        .then(function (response) {
            console.log(response.data);
            if (response.data.success === true) {
                console.log("Answer added");
                window.location.href = '/summary.html?userid=' + username;
            } else {
                alert("Failed to Add Answer. Try Again Later");
            }
        })
        .catch(function (error) {
            console.log(error);
        });
})