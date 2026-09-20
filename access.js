(()=>{
const ACCESS_KEY="ll-site-access-2026";
const ACCESS_HASH="6557739a67283a8de383fc5c0997fbec7c5721a46f28f3235fc9607598d9016b";
let booted=false;
async function hash(v){const b=await crypto.subtle.digest("SHA-256",new TextEncoder().encode(v));return [...new Uint8Array(b)].map(x=>x.toString(16).padStart(2,"0")).join("")}
function load(src){return new Promise((ok,bad)=>{const s=document.createElement("script");s.src=src;s.onload=ok;s.onerror=bad;document.body.appendChild(s)})}
async function boot(){if(booted)return;booted=true;document.getElementById("siteGate")?.classList.add("unlocked");await load("https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2");await load("data.js?v=86");await load("app.js?v=86")}
async function unlock(code){if(await hash(code)!==ACCESS_HASH)return false;localStorage.setItem(ACCESS_KEY,ACCESS_HASH);await boot();return true}
async function init(){if(localStorage.getItem(ACCESS_KEY)===ACCESS_HASH){await boot();return}const f=document.getElementById("gateForm"),i=document.getElementById("gateCode"),e=document.getElementById("gateError");f.addEventListener("submit",async ev=>{ev.preventDefault();e.textContent="";if(await unlock(i.value.trim()))return;i.value="";e.textContent="Incorrect access code.";i.focus()});setTimeout(()=>i.focus(),150)}
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init);else init();
})();
