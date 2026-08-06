/* ============================================================
   A Map of Belonging — Homepage scripts
   Lightweight interactions only. Story navigation comes later.
   ============================================================ */

(function () {
  "use strict";

  /* ------------------------------------------------------------
     Asset paths — speaker icon swap
     ------------------------------------------------------------ */
  const ASSETS = {
    speakerOn: "images/ui/speaker.png",
    speakerMuted: "images/ui/speaker-muted.png",
  };

  /* ------------------------------------------------------------
     DOM references
     ------------------------------------------------------------ */
  const speakerBtn = document.getElementById("speaker-btn");
  const speakerIcon = document.getElementById("speaker-icon");
  const menuBtn = document.getElementById("menu-btn");
  const bgMusic = document.getElementById("bg-music");
  const houses = document.querySelectorAll(".house");

  /* ------------------------------------------------------------
     Speaker / background music
     Starts muted (browser autoplay policy + calm first impression).
     Enabled  → loop ambient track
     Muted    → pause track + swap icon
     ------------------------------------------------------------ */
  function setMuted(muted) {
    if (!speakerBtn || !speakerIcon || !bgMusic) return;

    speakerBtn.dataset.muted = String(muted);
    speakerBtn.setAttribute("aria-pressed", String(!muted));
    speakerBtn.setAttribute(
      "aria-label",
      muted ? "Play background music" : "Mute background music"
    );
    speakerIcon.src = muted ? ASSETS.speakerMuted : ASSETS.speakerOn;

    if (muted) {
      bgMusic.pause();
    } else {
      // play() returns a Promise; catch autoplay / missing-file errors quietly
      const playAttempt = bgMusic.play();
      if (playAttempt && typeof playAttempt.catch === "function") {
        playAttempt.catch(function () {
          // No audio file yet, or browser blocked playback — stay visually unmuted
          // so the UI still reflects user intent once audio is added.
          console.info(
            "[A Map of Belonging] Background music could not play. " +
              "Add audio/ambient.mp3 (or .ogg) when ready."
          );
        });
      }
    }
  }

  function toggleSpeaker() {
    const currentlyMuted = speakerBtn.dataset.muted !== "false";
    setMuted(!currentlyMuted);
  }

  if (speakerBtn) {
    speakerBtn.addEventListener("click", toggleSpeaker);
  }

  /* Initialize muted state (matches HTML defaults) */
  setMuted(true);

  /* ------------------------------------------------------------
     Menu button
     Placeholder — wire up a panel / overlay when ready.
     ------------------------------------------------------------ */
  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      // FUTURE: open navigation panel
      // menuBtn.setAttribute("aria-expanded", "true");
      console.info("[A Map of Belonging] Menu coming soon.");
    });
  }

  /* ------------------------------------------------------------
     House icons
     Hover scale is CSS-only. Clicks are stubbed for future stories.
     data-story-id on each .house will map to story routes later.
     ------------------------------------------------------------ */
  houses.forEach(function (house) {
    house.addEventListener("click", function (event) {
      // Do NOT navigate yet — homepage only.
      event.preventDefault();
      const storyId = house.getAttribute("data-story-id");
      console.info(
        "[A Map of Belonging] House clicked:",
        storyId,
        "— navigation not implemented yet."
      );

      // FUTURE example:
      // window.location.href = "stories/" + storyId + ".html";
    });
  });

  /* ------------------------------------------------------------
     Optional: pause creature CSS animations when the tab is hidden
     (saves a little battery; animations resume on return).
     ------------------------------------------------------------ */
  document.addEventListener("visibilitychange", function () {
    const stage = document.getElementById("map-stage");
    if (!stage) return;
    stage.style.animationPlayState = document.hidden ? "paused" : "running";
    stage.querySelectorAll(".creature, .creature *").forEach(function (el) {
      el.style.animationPlayState = document.hidden ? "paused" : "running";
    });
  });
})();
