// HIỆU ỨNG TIM BAY NHẸ
function createHeart() {
  const heart = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  heart.setAttribute("class", "heart");
  heart.setAttribute("viewBox", "0 0 512 512");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d",
    "M471.7 73.5C441.2 43 396.4 28.3 352.1 40.3c-23.9 6.4-45.5 20.4-64.1 40.4l-31.9 33.9-31.9-33.9c-18.6-20-40.2-34-64.1-40.4-44.3-12-89.1 2.7-119.6 33.2C-7.1 115.8-9.9 176.4 28.7 218l204.5 217.6c14.7 15.7 38.9 15.7 53.6 0L483.3 218c38.6-41.6 35.8-102.2-11.6-144.5z"
  );
  heart.appendChild(path);

  const size = 15 + Math.random() * 30; // nhỏ hơn cho điện thoại
  heart.style.width = `${size}px`;
  heart.style.height = `${size}px`;

  const edge = Math.floor(Math.random() * 4);
  let startX, startY, endX, endY;
  switch(edge){
    case 0: startX="-120vw"; startY=Math.random()*100+"vh"; break;
    case 1: startX="120vw"; startY=Math.random()*100+"vh"; break;
    case 2: startX=Math.random()*100+"vw"; startY="-120vh"; break;
    default: startX=Math.random()*100+"vw"; startY="120vh"; break;
  }
  endX=Math.random()*100-50+"vw";
  endY=Math.random()*100-50+"vh";

  heart.style.setProperty("--startX", startX);
  heart.style.setProperty("--startY", startY);
  heart.style.setProperty("--endX", endX);
  heart.style.setProperty("--endY", endY);

  const duration = 10+Math.random()*5;
  heart.style.setProperty("--dur", duration+"s");

  document.body.appendChild(heart);
  setTimeout(()=>heart.remove(), duration*1000);
}

// Xuất hiện nhiều tim ban đầu (nhẹ hơn)
for (let i = 0; i < 100; i++) createHeart();

// Tim bay liên tục nhiều hơn
setInterval(createHeart, 120);

// CLICK PHONG BÌ MỞ RA
const envelope = document.getElementById("envelope");
const title = document.getElementById("title");
const typewriterElement = document.getElementById("typewriter");
const finalText = document.getElementById("finalText");

envelope.onclick = () => {
  envelope.style.transform = "scale(0.7)";
  envelope.style.opacity = "0";
  setTimeout(()=>envelope.style.display="none", 500);

  // Hiển thị chữ Linh ơi từ từ
  title.style.opacity = 1;

  // Hiển thị dòng đánh máy sau 2.5s
  setTimeout(()=>{
    typewriterElement.style.display = "block";

    // Gõ chữ chậm
    const text = typewriterElement.textContent;
    typewriterElement.textContent = '';
    let index = 0;
    function typeWriter() {
      if(index < text.length){
        typewriterElement.textContent += text.charAt(index);
        index++;
        setTimeout(typeWriter, 120); // chậm lãng mạn
      } else {
        // Hiển thị dòng cuối từ từ, bất ngờ
        finalText.style.animation = "finalAppear 3s ease-out forwards";
      }
    }
    typeWriter();
  }, 2500);
}