async function getData(place){
    const url=`https://timezone.abstractapi.com/v1/current_time/?api_key=Your_api_key_here&location=${place}`
    const res = await fetch(url);
    const data  = await res.json();
    let time = await data.datetime

    document.getElementById("time").innerText = `${place}'s time: ${time} ${data.timezone_abbreviation}`
}

document.querySelectorAll(".allPaths").forEach(e => {
    e.setAttribute('class', `allPaths ${e.id}`);
    e.addEventListener("mouseover", function() {
        window.onmousemove = function(j) {
            let x = j.clientX
            let y = j.clientY
            document.getElementById("name").style.top = y - 60 + "px"
            document.getElementById("name").style.left = x + 10 + "px"
        }

        const classes=e.className.baseVal.replace(/ /g, '.')         
            document.querySelectorAll(`.${classes}`).forEach(country =>{
                country.style.fill = "var(--clr-fill)"
            })
        document.getElementById("namep").innerText = e.id
        document.getElementById("name").style.opacity = 1
    })
    e.addEventListener("mouseleave", function(){
        const classes=e.className.baseVal.replace(/ /g, '.')
        document.querySelectorAll(`.${classes}`).forEach(country =>{
            country.style.fill = "var(--clr-map)"
        })
        document.getElementById("name").style.opacity = 0
    })
    e.addEventListener("click",function(){
        getData(e.id)
    })
})
