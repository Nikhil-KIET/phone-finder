let btn = document.getElementById("btn");
let txt = document.getElementById("input");
let out = document.getElementById("output");
let res; // Declare res variable in a scope accessible to both the click event listener and the fetch function

btn.addEventListener('click', async () => {
    let src = txt.value;
    console.log(src);
    res = await fetch("https://openapi.programming-hero.com/api/phones?search=" + src);
    res = await res.json();
    render(res);
    txt.value = "";
});

function render(res) {
    out.innerHTML = "";
    let data = res.data;
    data.forEach(item => {
        let pa = document.createElement("div");
        pa.classList.add("itm");
        let im = document.createElement("img");
        im.src = item?.image || "";
        pa.appendChild(im);
        let pg = document.createElement('p');
        pg.textContent = item?.phone_name || "Unknown";

        let btn = document.createElement("div");
        btn.id = "btn1" + item?.phone_name;
        btn.textContent = "Show Details"
        btn.classList.add("px-3", "py-3", "bg-[#6419E6]", "rounded-xl")
        pa.appendChild(pg);
        pa.appendChild(btn);
        out.appendChild(pa);
    });
}

out.addEventListener('click', (e) => {
    if (e.target.id.startsWith("btn1")) {
       // alert("clicked");

        let phoneName = e.target.id.replace("btn1", "").trim();

        const foundItem = res.data.find(item => item.phone_name === phoneName); // Use res.data instead of res
        renderitm(foundItem);
    }
});

function renderitm(itm) {
    let pa = document.createElement("div");
    pa.classList.add("itm");
    
    let im = document.createElement("img");
    im.src = itm?.image || "";
    pa.appendChild(im);
    
    let pg = document.createElement('p');
    pg.textContent = itm?.phone_name || "Unknown";
    pa.appendChild(pg);

    let btn = document.createElement("div");
    btn.id = "close"
    btn.textContent = "Show Details"
    btn.classList.add("px-3", "py-3", "bg-[#6419E6]", "rounded-xl")
    pa.appendChild(btn);
    
    let itm_con = document.getElementById("itm-con");
    itm_con.innerHTML = ""; // Clear previous items before appending a new one
    itm_con.appendChild(pa);
    itm_con.style.display = "flex";
    let close=document.getElementById("close");
close.addEventListener('click',()=>{
    itm_con.textContent="";
    itm_con.style.display = "none";

    
})
}


