const tabsData = [
  {
    id: 1,
    title: 'Tab 1',
    content: 'Tab 1 content'
  },
  {
    id: 2,
    title: 'Tab 2',
    content: 'Tab 2 content'
  },
  {
    id: 3,
    title: 'Tab 3',
    content: 'Tab 3 content'
  }
];

document.addEventListener('DOMContentLoaded', () => {
  let activeTab = tabsData[0].id;
  const renderTabs = () => {
    const tabContainer = document.querySelector("#tabContainer");
    const contentContainer = document.querySelector("#tabContentContainer");

    tabsData.forEach(tab => {
      const tabButton = document.createElement("button");
      tabButton.textContent = tab.title;
      tabButton.className = "tabLinks";
      tabButton.setAttribute("data-tab", tab.id);
      tabContainer.appendChild(tabButton);

      tabContent = document.createElement("div");
      tabContent.id = tab.id;
      tabContent.className = "tabContent";
      tabContent.innerHTML = `<h3>${tab.title}</h3><p>${tab.content}</p>`;
      contentContainer.appendChild(tabContent);
    });

    tabContainer.addEventListener("click", e => {
      // if (e.target.classList.contains("tabLinks")) {
      if (e.target.matches(".tabLinks")) {
        const tabId = e.target.getAttribute("data-tab");
        if(tabId !== activeTab) {
          openTab(tabId);
          activeTab = tabId;
        }
      }
    });

    const openTab = tabId => {
      const tabContents = document.querySelectorAll(".tabContent");
      const tabLinks = document.querySelectorAll(".tabLinks");

      tabContents.forEach(tab => tab.classList.remove("active"));
      tabLinks.forEach(tab => tab.classList.remove("active"));

      document.getElementById(tabId).classList.add("active");
      document.querySelector(`button[data-tab="${tabId}"]`).classList.add("active");
    };
  };

  renderTabs();
  document.getElementById(activeTab).classList.add("active");
  document.querySelector(`button[data-tab="${activeTab}"]`).classList.add("active");
})