fetch("https://gist.githubusercontent.com/nakasyou/376d596fee53f0715dbeb6880a516883/raw/851aff6a2298d877442a6fbab2af4fd668ac4135/tokyo-edu-transfer-peoples-2023.json")
  .then(res=>res.json())
  .then(data=>{
    const schools=new Set();
    data.forEach(d=>{
      schools.add(d.NewPlaceName);
      schools.add(d.OldPlaceName);
    });
    const $schools=document.getElementById("schools");
    const $result=document.getElementById("result");
    Array.from(schools).sort().forEach(school=>{
      const option=document.createElement("option");
      option.value=school;
      option.textContent=school;
      $schools.append(option);
    });
    $schools.addEventListener("change",event=>{
      $result.innerHTML=`<p id="searching">けんさくちゅう...</p>`;
      const target=event.target.value;
      const hey=[];
      const bye=[];
      data.forEach(d=>{
        if(d.OldPlaceName===target)
          bye.push(d.Name);
        if(d.NewPlaceName===target)
          hey.push(d.Name);
      });
      const ans=document.createElement("div");
      ans.style.display="flex";
      {
        const heyElement=document.createElement("div");
        ans.append(heyElement);
        const heyTitle=document.createElement("h2");
        heyTitle.textContent="転入";
        const heyUl=document.createElement("ul");
        hey.forEach(name=>{
          const li=document.createElement("li");
          li.textContent=name;
          heyUl.append(li);
        });
        heyElement.append(heyTitle);
        heyElement.append(heyUl);
      }
      {
        const byeElement=document.createElement("div");
        ans.append(byeElement);
        const byeTitle=document.createElement("h2");
        byeTitle.textContent="転出";
        const byeUl=document.createElement("ul");
        bye.forEach(name=>{
          const li=document.createElement("li");
          li.textContent=name;
          byeUl.append(li);
        });
        byeElement.append(byeTitle);
        byeElement.append(byeUl);
      }
      $result.append(ans);
      document.getElementById("searching").hidden=true;
    });
  })
  .then(()=>{
    document.getElementById("loding").hidden=true;
  })
  .catch(error=>{
    console.error(error.name);
    console.error(error.message);
    alert("エラーが発生しました。再読み込みしてください。");
  });