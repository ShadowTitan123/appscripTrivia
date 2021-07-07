


async function AppendResults(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    var username = url.searchParams.get("userid")
    const res = await fetch(`/GetSummaryByUserID/${username}`);
    const data = await res.json();
    console.log(data);

    document.querySelector('#name').innerHTML = data.GetSummaryData[0].user_id;
    document.querySelector('#q1').innerHTML = data.GetSummaryData[0].answer1;
    document.querySelector('#q2').innerHTML = JSON.parse(data.GetSummaryData[0].answer2);

    const history = document.querySelector('#historybtn');
    const finish = document.querySelector('#finish');
    history.addEventListener('click',()=>{
        window.location.href = '/history.html';
    })

    finish.addEventListener('click',()=>{
        window.location.href = '/index.html';
    })
}


AppendResults();