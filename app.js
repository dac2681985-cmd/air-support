
// KET NOI SUPABASE - AIR SUPPORT 1.1
const SUPABASE_URL = "https://nkyybhiavbwkrbfpisdc.supabase.co";
const SUPABASE_ANON_KEY = "DÁN_TOÀN_BỘ_KHÓA_THẬT";

const supabaseClient = window.supabase.createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
);

const AIRPORTS = [
  {code:"HAN",name:"Nội Bài",city:"Hà Nội"},
  {code:"SGN",name:"Tân Sơn Nhất",city:"TP. Hồ Chí Minh"},
  {code:"DAD",name:"Đà Nẵng",city:"Đà Nẵng"},
  {code:"CXR",name:"Cam Ranh",city:"Khánh Hòa"},
  {code:"PQC",name:"Phú Quốc",city:"Kiên Giang"},
  {code:"HPH",name:"Cát Bi",city:"Hải Phòng"},
  {code:"VCA",name:"Cần Thơ",city:"Cần Thơ"},
  {code:"VII",name:"Vinh",city:"Nghệ An"},
  {code:"DLI",name:"Liên Khương",city:"Lâm Đồng"},
  {code:"HUI",name:"Phú Bài",city:"Huế"}
];

const SERVICES = [
  {id:"baggage",icon:"🧳",title:"Hành lý",desc:"Hành lý xách tay và ký gửi",body:"Quy định hành lý phụ thuộc hãng hàng không, hạng vé, hành trình và loại tàu bay.",items:["Kiểm tra cân nặng và kích thước theo điều kiện vé.","Đánh dấu hành lý và giữ lại cuống thẻ hành lý.","Không để vật phẩm nguy hiểm trong hành lý trái quy định.","Xác nhận hạn mức cụ thể với hãng hàng không trước chuyến đi."]},
  {id:"checkin",icon:"📋",title:"Thủ tục bay",desc:"Chuẩn bị giấy tờ và làm thủ tục",body:"Chuẩn bị giấy tờ đi lại hợp lệ và kiểm tra thời gian làm thủ tục do hãng bay công bố.",items:["Kiểm tra giấy tờ tùy thân và điều kiện nhập cảnh.","Làm thủ tục trực tuyến nếu hãng hỗ trợ.","Đến sân bay theo khuyến nghị của hãng hàng không.","Theo dõi thông báo tại sân bay và trên ứng dụng hãng bay."]},
  {id:"airport",icon:"🏢",title:"Thông tin sân bay",desc:"Nhà ga và tiện ích",body:"Thông tin nhà ga, quầy thủ tục, phương tiện di chuyển và tiện ích cần được xác nhận theo từng sân bay.",items:["Kiểm tra đúng nhà ga khởi hành.","Xem biển chỉ dẫn và màn hình thông tin chuyến bay.","Dành thời gian phù hợp để di chuyển trong sân bay."]},
  {id:"special",icon:"♿",title:"Hỗ trợ đặc biệt",desc:"Trẻ em, người cao tuổi, người cần trợ giúp",body:"Hành khách cần hỗ trợ đặc biệt nên liên hệ hãng hàng không hoặc đại lý trước chuyến đi để xác nhận khả năng phục vụ.",items:["Đăng ký xe lăn hoặc hỗ trợ di chuyển sớm.","Thông báo nhu cầu hỗ trợ khi đặt vé.","Xác nhận quy định đi cùng trẻ em và trẻ sơ sinh.","Trao đổi với hãng về thiết bị y tế cần mang theo."]},
  {id:"transfer",icon:"🔄",title:"Nối chuyến",desc:"Chuẩn bị hành trình tiếp theo",body:"Điều kiện nối chuyến phụ thuộc vé, sân bay, hãng khai thác, hành lý và yêu cầu xuất nhập cảnh.",items:["Kiểm tra vé nối chuyến có cùng mã đặt chỗ hay không.","Xác nhận hành lý có được chuyển thẳng đến điểm cuối.","Kiểm tra yêu cầu nhập cảnh và an ninh tại sân bay trung chuyển.","Hỏi hãng bay về thời gian nối chuyến tối thiểu."]},
  {id:"lost",icon:"🎧",title:"Hành lý thất lạc",desc:"Hướng dẫn khi hành lý có vấn đề",body:"Nếu hành lý không xuất hiện tại băng chuyền, hãy liên hệ quầy hành lý thất lạc của hãng hoặc đơn vị phục vụ tại sân bay trước khi rời khu vực nhận hành lý.",items:["Giữ thẻ hành lý và thẻ lên tàu bay.","Cung cấp mô tả, ảnh và thông tin nhận dạng hành lý.","Lấy mã hồ sơ/báo cáo sự việc để theo dõi.","Lưu thông tin liên hệ và chứng từ liên quan."]}
];

const GUIDES = [
  {icon:"⏱️",title:"Khi nào nên đến sân bay?",desc:"Kiểm tra giờ có mặt và thời gian đóng quầy theo hướng dẫn của hãng bay.",service:"checkin"},
  {icon:"🪪",title:"Giấy tờ trước chuyến đi",desc:"Xác nhận giấy tờ cần thiết theo tuyến bay và quốc tịch của hành khách.",service:"checkin"},
  {icon:"🧳",title:"Chuẩn bị hành lý đúng cách",desc:"Kiểm tra hạn mức, kích thước và danh mục vật phẩm theo quy định hiện hành.",service:"baggage"},
  {icon:"♿",title:"Đăng ký hỗ trợ đặc biệt",desc:"Liên hệ hãng hàng không sớm để xác nhận dịch vụ phù hợp.",service:"special"}
];

const $ = (id) => document.getElementById(id);
const escapeText = (value) => String(value ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
let toastTimer;

function toast(message){
  const el=$("toast"); el.textContent=message; el.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>el.classList.remove("show"),2600);
}

function populateAirports(){
  ["origin","destination"].forEach(id=>{
    const select=$(id);
    AIRPORTS.forEach(a=>{
      const opt=document.createElement("option");
      opt.value=a.code; opt.textContent=`${a.code} · ${a.city}`;
      select.appendChild(opt);
    });
  });
}
async function loadAirportsFromSupabase() {
  try {
    const { data, error } = await supabaseClient
      .from("airports")
      .select("name, iata_code, city")
      .order("iata_code");

    if (error) throw error;
    if (!data || data.length === 0) return;

    AIRPORTS.splice(
      0,
      AIRPORTS.length,
      ...data.map(a => ({
        code: a.iata_code,
        name: a.name,
        city: a.city || ""
      }))
    );

    ["origin", "destination"].forEach(id => {
      const select = $(id);
      if (select) select.innerHTML = "";
    });

    populateAirports();
    toast("Đã tải danh sách sân bay từ Supabase");
  } catch (error) {
    console.error("Supabase airports:", error);
    toast("Chưa tải được danh sách sân bay từ cơ sở dữ liệu");
  }
}


function renderServices(){
  $("serviceGrid").innerHTML=SERVICES.map(s=>`
    <button class="service-card" data-service="${s.id}">
      <span class="service-emoji">${s.icon}</span>
      <b>${escapeText(s.title)}</b><small>${escapeText(s.desc)}</small>
    </button>`).join("");
  $("guideList").innerHTML=GUIDES.map(g=>`
    <button class="guide-item" data-service="${g.service}">
      <span class="guide-icon">${g.icon}</span><span><b>${escapeText(g.title)}</b><small>${escapeText(g.desc)}</small></span>
    </button>`).join("");
  document.querySelectorAll("[data-service]").forEach(btn=>btn.addEventListener("click",()=>openService(btn.dataset.service)));
}

function openService(id){
  const s=SERVICES.find(x=>x.id===id); if(!s)return;
  $("dialogContent").innerHTML=`<div class="service-emoji">${s.icon}</div><h3>${escapeText(s.title)}</h3><p>${escapeText(s.body)}</p><ul>${s.items.map(x=>`<li>${escapeText(x)}</li>`).join("")}</ul><p><b>Lưu ý:</b> Nội dung hướng dẫn tổng quát. Điều kiện áp dụng cần xác nhận với hãng hàng không hoặc sân bay liên quan.</p>`;
  $("serviceDialog").showModal();
}

function getSaved(){try{return JSON.parse(localStorage.getItem("airSupportSaved")||"[]")}catch{return []}}
function setSaved(items){localStorage.setItem("airSupportSaved",JSON.stringify(items));renderSaved()}
function renderSaved(){
  const items=getSaved(); const root=$("savedFlights");
  if(!items.length){root.innerHTML='<div class="empty-state">Bạn chưa lưu chuyến bay nào.<br>Tra cứu và lưu hành trình để xem lại nhanh.</div>';return}
  root.innerHTML=items.map((x,i)=>`<div class="saved-item"><div><b>${escapeText(x.flight||"Hành trình")}</b><small>${escapeText(x.route||"Chưa chọn tuyến")} · ${escapeText(x.date||"Chưa chọn ngày")}</small></div><button class="remove-btn" data-remove="${i}">Xóa</button></div>`).join("");
  root.querySelectorAll("[data-remove]").forEach(b=>b.addEventListener("click",()=>{const a=getSaved();a.splice(Number(b.dataset.remove),1);setSaved(a);toast("Đã xóa hành trình đã lưu.")}));
}

$("flightForm").addEventListener("submit",e=>{
  e.preventDefault();
  const flight=$("flightNumber").value.trim().toUpperCase();
  const origin=$("origin").value, destination=$("destination").value, date=$("travelDate").value;
  const result=$("flightResult");
  if(!flight && !(origin&&destination&&date)){result.innerHTML="<b>Vui lòng nhập số hiệu chuyến bay hoặc chọn đầy đủ sân bay đi, sân bay đến và ngày bay.</b>";return}
  if(origin && destination && origin===destination){result.innerHTML="<b>Sân bay đi và sân bay đến không được trùng nhau.</b>";return}
  if(flight && !/^[A-Z0-9]{2,3}\s?\d{1,4}[A-Z]?$/i.test(flight)){result.innerHTML="<b>Định dạng số hiệu chuyến bay chưa hợp lệ. Ví dụ: VN123.</b>";return}
  const route=origin&&destination?`${origin} → ${destination}`:"Chưa chọn tuyến";
  result.innerHTML=`<b>Chưa có dữ liệu chuyến bay trực tiếp</b><p>Yêu cầu tìm kiếm đã được kiểm tra. AIR SUPPORT chưa kết nối nhà cung cấp lịch bay nên không thể xác nhận giờ bay hoặc trạng thái của ${escapeText(flight||route)}.</p><button class="btn btn-primary full" id="saveFlight" type="button">♡ Lưu hành trình trên điện thoại</button><p class="form-note">Hãy xác nhận lịch bay với hãng hàng không hoặc sân bay.</p>`;
  $("saveFlight").addEventListener("click",()=>{
    const items=getSaved(); const entry={flight:flight||"Hành trình",route,date};
    if(!items.some(x=>x.flight===entry.flight&&x.route===entry.route&&x.date===entry.date)){items.unshift(entry);setSaved(items.slice(0,20));toast("Đã lưu hành trình trên thiết bị.")}else toast("Hành trình này đã được lưu.");
  });
});

populateAirports(); renderServices();loadAirportsFromSupabase(); renderSaved();

let deferredInstallPrompt=null;
window.addEventListener("beforeinstallprompt",e=>{
  e.preventDefault(); deferredInstallPrompt=e; $("installBtn").hidden=false;
});
$("installBtn").addEventListener("click",async()=>{
  if(!deferredInstallPrompt){toast("Mở menu Chrome và chọn Cài đặt ứng dụng.");return}
  deferredInstallPrompt.prompt(); await deferredInstallPrompt.userChoice;
  deferredInstallPrompt=null; $("installBtn").hidden=true;
});
window.addEventListener("appinstalled",()=>toast("AIR SUPPORT đã được cài đặt."));
if("serviceWorker" in navigator && location.protocol!=="file:"){
  window.addEventListener("load",()=>navigator.serviceWorker.register("./sw.js").catch(err=>console.error("SW:",err)));
}
document.querySelectorAll(".bottom-nav a").forEach(a=>a.addEventListener("click",()=>{
  document.querySelectorAll(".bottom-nav a").forEach(x=>x.classList.remove("active"));a.classList.add("active");
}));
