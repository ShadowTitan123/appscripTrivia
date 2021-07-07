

async function AppendResults(){
    var url_string = window.location.href;
    var url = new URL(url_string);
    const res = await fetch(`/GetAllAnswers`);
    const data = await res.json();
    console.log(data);
    
    if(data.success === true){
        let table1 = '';
        const table2 = document.querySelector('#answers');
        data.GetAllAnswer.forEach(function(row,index){ 
        table1 += ` <div class="col-md-4">
        <div class="card">
            <div class="card-body">
              <span class="tag tag-teal">Game ${index+1}</span>
              <div class="answers">
                <details>
                    <summary>Who is the best cricketer in the world?</summary>
                    <p> ${row.answer1}</p>
                  </details>
                  <details>
                    <summary>What are the colors in the national flag?</summary>
                    <p>${JSON.parse(row.answer2)}</p>
                  </details>
              </div>
              <div class="user">
                <img src="./assets/images/profile.png" alt="user" />
                <div class="user-info">
                  <h5>${row.user_id}</h5>
                  <small>${row.timestamp}</small>
                </div>
              </div>
            </div>
        </div>
    </div>`
        })
          table2.innerHTML = table1;
          
    }else{
        console.log("Empty data");  
        let Empty = 'No Answers!';
        table2.innerHTML = Empty;
    }
}


AppendResults();