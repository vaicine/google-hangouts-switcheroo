const loadSwitcheroo = (button) => {
  const switcherooButton = button.cloneNode(true);

  switcherooButton.removeAttribute("jscontroller");
  switcherooButton.removeAttribute("jsaction");
  switcherooButton.removeAttribute("mousedown");
  switcherooButton.removeAttribute("mouseup");
  switcherooButton.removeAttribute("mouseenter");
  switcherooButton.removeAttribute("mouseleave");
  switcherooButton.removeAttribute("touchstart");
  switcherooButton.removeAttribute("touchmove");
  switcherooButton.removeAttribute("touchend");
  switcherooButton.removeAttribute("touchcancel");
  switcherooButton.removeAttribute("focus");
  switcherooButton.removeAttribute("contextmenu");
  switcherooButton.removeAttribute("jsname");
  switcherooButton.removeAttribute("data-disable-idom");
  switcherooButton.removeAttribute("data-tooltip-enabled");
  switcherooButton.removeAttribute("data-tooltip-id");
  switcherooButton.removeAttribute("data-panel-id");
  switcherooButton.removeAttribute("data-panel-id");
  switcherooButton.setAttribute("aria-label", "Switcheroo button");

  Array.prototype.forEach.call(switcherooButton.childNodes, (child) => {
    child.removeAttribute("jsname");
    const text = child.innerText;
    if (text === "info") {
      child.innerText = "flip_camera_android";
    }
  });

  switcherooButton.addEventListener("click", (event) => {
    Array.prototype.forEach.call(
      document.querySelector("[data-requested-participant-id]").parentElement
        .childNodes,
      (child) => {
        child.style.position = "absolute";
        child.style.bottom = child.style.top;
        child.style.top = "auto";
      }
    );

    switcherooButton.remove();
  });

  button.parentElement.prepend(switcherooButton);
};

const observer = new MutationObserver( (_, me) => {
  const button = document.querySelector("[aria-label='Meeting details']");

  if (button) {
    loadSwitcheroo(button);
    me.disconnect();
    return;
  }
});

observer.observe(document, {
  childList: true,
  subtree: true,
});
