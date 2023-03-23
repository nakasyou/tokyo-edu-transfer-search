(async()=>{
  const res=await fetch("https://gist.githubusercontent.com/nakasyou/376d596fee53f0715dbeb6880a516883/raw/851aff6a2298d877442a6fbab2af4fd668ac4135/tokyo-edu-transfer-peoples-2023.json")
  const data=await res.json();

  const citys=new Set();
  const schools=new Set();
  data.forEach(d=>{
    schools.add(d.NewPlaceName);
    schools.add(d.OldPlaceName);
    
    let sikutyoson;
    try{
      sikutyoson=d.NewPlaceName.match(/^.+?立/)[0];
    }catch{
      sikutyoson="その他";
    }
    citys.add(sikutyoson)
  });
  const $citys=document.getElementById("citys");
  const $schools=document.getElementById("schools");
  const $result=document.getElementById("result");
  Array.from(citys).sort().forEach(school=>{
    const option=document.createElement("option");
    option.value=school;
    option.textContent=school;
    $citys.append(option);
  });
  $citys.addEventListener("change",city=>{
    $schools.innerHTML="";
    Array.from(schools).sort().forEach(school=>{
      const option=document.createElement("option");
      if(school.slice(0,city.target.value.length)!==city.target.value)
        return;
      option.value=school;
      option.textContent=school;
      $schools.append(option);
    });
  })
  $schools.addEventListener("change",event=>{
    $result.innerHTML=`<p id="searching">けんさくちゅう...</p>`;
    const target=event.target.value;
    const hey=[];
    const bye=[];
    data.forEach(d=>{
      if(d.OldPlaceName===target)
        bye.push(d);
      if(d.NewPlaceName===target)
        hey.push(d);
    });
    const ans=document.createElement("div");
    ans.style.display="flex";
    {
      const heyElement=document.createElement("div");
      ans.append(heyElement);
      const heyTitle=document.createElement("h2");
      heyTitle.textContent="転入";
      const heyUl=document.createElement("ul");
      hey.forEach(({Name,OldPlaceName,Reason,NewJobType,OldJobType})=>{
        const li=document.createElement("li");
        li.innerHTML=`<b>${Name}</b><br>(To ${OldPlaceName})<br>${Reason}(${OldJobType}->${NewJobType})`;
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
      bye.forEach(({Name,NewPlaceName,Reason,NewJobType,OldJobType})=>{
        const li=document.createElement("li");
        li.innerHTML=`<b>${Name}</b><br>(From ${NewPlaceName})<br>${Reason}(${OldJobType}->${NewJobType})`;
        byeUl.append(li);
      });
      byeElement.append(byeTitle);
      byeElement.append(byeUl);
    }
    $result.append(ans);
    document.getElementById("searching").hidden=true;
  });
  document.getElementById("loding").hidden=true;
})();
