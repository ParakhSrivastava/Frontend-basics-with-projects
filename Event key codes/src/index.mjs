import "./styles.css";

const insert = document.getElementById("insert");

document.addEventListener("keydown", (event) => {
  const { key, keyCode, code } = event;
  insert.innerHTML = `
    <div class="key">
    ${key === " " ? "Space" : key}
    <small>event.key</small>
    </div>
    <div class="key">
    ${keyCode}
    <small>event.keyCode</small>
    </div>
    <div class="key">
    ${code}
    <small>event.code</small>
    </div>
    `;
});
