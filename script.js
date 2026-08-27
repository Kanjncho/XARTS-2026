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
  const siteMenu = document.getElementById("site-menu");
  const bgMusic = document.getElementById("bg-music");
  const houses = document.querySelectorAll(".house");
  const regionalView = document.getElementById("regional-view");
  const regionalBase = document.getElementById("regional-base");
  const regionalBack = document.getElementById("regional-back");
  const mapStage = document.getElementById("map-stage");
  const regionalPlaces = document.getElementById("regional-places");
  const photoView = document.getElementById("photo-view");
  const photoViewImg = document.getElementById("photo-view-img");
  const photoBack = document.getElementById("photo-back");
  const fieldRecording = document.getElementById("field-recording");
  const photoAudioStatus = document.getElementById("photo-audio-status");
  const photoAudioLabel = document.getElementById("photo-audio-label");
  const conceptView = document.getElementById("concept-view");
  const conceptBack = document.getElementById("concept-back");

  /* data-story-id → regional base map
     Add more regions here later without changing house IDs. */
  const REGIONAL_MAPS = {
    hokkaido: {
      src: "maps/Hokkaido-base-map.png",
      alt: "Hand-drawn map of Hokkaido",
    },
    "honshu-central": {
      src: "maps/Tokyo-base-map.png",
      alt: "Hand-drawn map of Tokyo",
    },
    "honshu-south": {
      src: "maps/Shizuoka-base-map.png",
      alt: "Hand-drawn map of Shizuoka",
    },
  };

  /* Regional location icons — x / y are % of .regional-map.
     Keys match data-story-id / REGIONAL_MAPS. */
  const REGIONAL_PLACES = {
    hokkaido: [
      {
        id: "empty-lot",
        src: "maps/Hokkaido/empty lot.png",
        x: 11.9,
        y: 24.9,
        size: 129,
        label: "Empty lot (Former nursery)",
        photo: "photos/Hokkaido-pics/Empty-lot copy.JPG",
        audio: "audio/Hokkaido-audio/Empty-lot.aac",
      },
      {
        id: "tokiwagi-park",
        src: "maps/Hokkaido/Tokiwagi_Park.png",
        x: 25.9,
        y: 35,
        size: 103,
        label: "Tokiwagi Park",
        photo: "photos/Hokkaido-pics/Tokiwagi-park copy.JPG",
        audio: "audio/Hokkaido-audio/Tokiwagi-park.aac",
      },
      {
        id: "three-story-house",
        src: "maps/Hokkaido/3story-house.PNG",
        x: 36.6,
        y: 16.9,
        size: 130,
        label: "3-story house",
        photo: "photos/Hokkaido-pics/3-story-house copy.JPG",
        audio: "audio/Hokkaido-audio/3-story-house.wav",
      },
      {
        id: "first-house",
        src: "maps/Hokkaido/The first house.PNG",
        x: 85.9,
        y: 16.9,
        size: 130,
        label: "The first house",
        photo: "photos/Hokkaido-pics/The-first-house copy.JPG",
        audio: "audio/Hokkaido-audio/The-First-house.wav",
      },
      {
        id: "misono-nursery",
        src: "maps/Hokkaido/Misono Nursary.PNG",
        x: 63.2,
        y: 74.1,
        size: 155,
        label: "Misono Nursery",
        photo: "photos/Hokkaido-pics/Misono-Nurserycopy.jpg",
        audio: "audio/Hokkaido-audio/Misono-Nursery.wav",
      },
    ],
    /* Tokyo (honshu-central) — finalized from regional-place-positions.json */
    "honshu-central": [
      {
        id: "ima-hall",
        src: "maps/Tokyo/IMA Hall.PNG",
        x: 22,
        y: 22,
        size: 150,
        label: "IMA Hall",
        photo: "photos/Tokyo-pics/IMA-Hall.jpg",
        audio: "audio/Tokyo-audio/IMA-Hall.aac",
      },
      {
        id: "after-school-center",
        src: "maps/Tokyo/After-scool-center.PNG",
        x: 50,
        y: 12,
        size: 150,
        label: "After-school center",
        photo: "photos/Tokyo-pics/After-school-center.JPG",
        audio: "audio/Tokyo-audio/After-school-center.aac",
      },
      {
        id: "elementary-school",
        src: "maps/Tokyo/elementary-school.PNG",
        x: 55,
        y: 55,
        size: 160,
        label: "Elementary School",
        photo: "photos/Tokyo-pics/Elementary-School.jpg",
        audio: "audio/Tokyo-audio/Elementary-School.aac",
      },
      {
        id: "fresco-hikarigaoka",
        src: "maps/Tokyo/Fresco-Hikarigaoka.PNG",
        x: 71.9,
        y: 78.5,
        size: 150,
        label: "Fresco Hikarigaoka (My apartment)",
        photo: "photos/Tokyo-pics/Fresco-Hikarigaoka.JPG",
        audio: "audio/Tokyo-audio/Fresco-Hikarigaoka.aac",
      },
      {
        id: "ecc-junior",
        src: "maps/Tokyo/ECC-Junior.PNG",
        x: 75.6,
        y: 96.1,
        size: 140,
        label: "ECC Junior (English class)",
        photo: "photos/Tokyo-pics/ECC-junior.jpg",
        audio: "audio/Tokyo-audio/ECC-Junior.aac",
      },
    ],
    /* Shizuoka (honshu-south) — finalized from regional-place-positions.json */
    "honshu-south": [
      {
        id: "senauchitsubo-park",
        src: "maps/Shizuoka/senauchitsubo-park.png",
        x: 14,
        y: 23.9,
        size: 104,
        label: "Senauchitsubo Park",
        photo: "photos/Shizuoka-pics/Senauchitsubo-park.JPG",
        audio: "audio/Shizuoka-audio/Senauchitsubo-park.aac",
      },
      {
        id: "river-in-front-of-my-apartment",
        src: "maps/Shizuoka/river-in-front-of-my-apartment.PNG",
        x: 37.1,
        y: 87,
        size: 190,
        label: "The river in front of my apartment",
        photo: "photos/Shizuoka-pics/The-river-in -front-of-my-apartment.JPG",
        audio: "audio/Shizuoka-audio/The-river-in -front-of-my-apartment.wav",
      },
      {
        id: "casa-grande",
        src: "maps/Shizuoka/casa-grande.png",
        x: 42.1,
        y: 46.7,
        size: 91,
        label: "Casa Grande",
        photo: "photos/Shizuoka-pics/Casa-Grande.JPG",
        audio: "audio/Shizuoka-audio/Casa-Grande.wav",
      },
      {
        id: "s-pulse-dream-plaza",
        src: "maps/Shizuoka/s-pulse-dream-plaza.PNG",
        x: 85.4,
        y: 24.4,
        size: 255,
        label: "S-Pulse Dream Plaza",
        photo: "photos/Shizuoka-pics/S-pulse-Dream-Plaza.jpg",
        audio: "audio/Shizuoka-audio/S-pulse-Dream-plaza.aac",
      },
      {
        id: "miho-no-matsubara",
        src: "maps/Shizuoka/miho-no-matsubara.PNG",
        x: 84.3,
        y: 69.4,
        size: 255,
        label: "Miho no Matsubara",
        photo: "photos/Shizuoka-pics/Miho-no-Matsubara.jpg",
        audio: "audio/Shizuoka-audio/Miho-no-Matsubara.aac",
      },
    ],
  };

  /* ------------------------------------------------------------
     Global audio — speaker controls #bg-music and #field-recording
     MUTE: pause and preserve position.
     UNMUTE: resume from current position.
     LEAVE PHOTO: stop field recording and reset.

     INVARIANT: #bg-music and #field-recording must never both have
     paused === false. Field recording takes priority over BGM.
     ------------------------------------------------------------ */
  function isMuted() {
    return !speakerBtn || speakerBtn.dataset.muted !== "false";
  }

  function isOnHomepage() {
    return (
      !document.body.classList.contains("is-regional-view") &&
      !document.body.classList.contains("is-concept-view")
    );
  }

  function isFieldRecordingActive() {
    return !!(
      fieldRecording &&
      fieldRecordingActivePlace &&
      fieldRecording.getAttribute("src")
    );
  }

  function enforceAudioExclusivity() {
    if (!bgMusic || !fieldRecording) return;

    const bgPlaying = !bgMusic.paused;
    const fieldPlaying = !fieldRecording.paused;

    if (bgPlaying && fieldPlaying) {
      bgMusic.pause();
    }
  }

  function pauseBgMusic() {
    if (!bgMusic) return;
    bgMusic.pause();
  }

  function resumeBgMusicIfAllowed() {
    if (!bgMusic || isMuted() || !isOnHomepage() || isFieldRecordingActive()) {
      return;
    }

    const playAttempt = bgMusic.play();
    if (playAttempt && typeof playAttempt.catch === "function") {
      playAttempt.catch(function () {
        console.info(
          "[A Map of Belonging] Background music could not play."
        );
      });
    }
  }

  let fieldRecordingLoadToken = 0;
  let fieldRecordingActivePlace = null;
  let fieldRecordingActiveLabel = "";

  function setFieldRecordingUI(state, label) {
    if (!photoAudioStatus || !photoAudioLabel) return;

    const showBar =
      state === "playing" ||
      state === "paused" ||
      state === "ready" ||
      state === "blocked";

    photoAudioStatus.hidden = !showBar;
    photoAudioStatus.classList.toggle("is-playing", state === "playing");

    if (state === "playing") {
      photoAudioLabel.textContent = "Field recording playing — " + label;
    } else if (state === "paused") {
      photoAudioLabel.textContent = "Field recording paused — " + label;
    } else if (state === "ready") {
      photoAudioLabel.textContent = "Field recording ready — " + label;
    } else if (state === "blocked") {
      photoAudioLabel.textContent =
        "Field recording could not play — " + label;
    } else {
      photoAudioStatus.hidden = true;
      photoAudioLabel.textContent = "";
    }
  }

  function stopFieldRecording() {
    fieldRecordingLoadToken += 1;
    fieldRecordingActivePlace = null;
    fieldRecordingActiveLabel = "";

    if (!fieldRecording) return;

    fieldRecording.pause();
    fieldRecording.currentTime = 0;
    fieldRecording.removeAttribute("src");
    fieldRecording.load();
    setFieldRecordingUI("stopped");
  }

  function startFieldRecordingPlayback(place, loadToken) {
    if (
      !fieldRecording ||
      !place ||
      loadToken !== fieldRecordingLoadToken ||
      fieldRecording.getAttribute("src") !== place.audio ||
      isMuted()
    ) {
      return;
    }

    pauseBgMusic();

    const attempt = fieldRecording.play();
    if (attempt && typeof attempt.then === "function") {
      attempt
        .then(function () {
          if (loadToken !== fieldRecordingLoadToken) return;
          enforceAudioExclusivity();
          setFieldRecordingUI("playing", place.label);
        })
        .catch(function (err) {
          if (loadToken !== fieldRecordingLoadToken) return;
          console.warn(
            "[A Map of Belonging] Field recording could not play:",
            place.id,
            err
          );
          setFieldRecordingUI("blocked", place.label);
        });
    } else {
      enforceAudioExclusivity();
      setFieldRecordingUI("playing", place.label);
    }
  }

  function loadFieldRecording(place) {
    if (!fieldRecording || !place || !place.audio) return;

    pauseBgMusic();
    stopFieldRecording();

    const loadToken = fieldRecordingLoadToken;
    fieldRecordingActivePlace = place;
    fieldRecordingActiveLabel = place.label;
    fieldRecording.loop = true;
    fieldRecording.src = place.audio;
    fieldRecording.currentTime = 0;
    fieldRecording.load();

    function onReady() {
      if (loadToken !== fieldRecordingLoadToken) return;
      if (isMuted()) {
        setFieldRecordingUI("ready", place.label);
        return;
      }
      startFieldRecordingPlayback(place, loadToken);
    }

    if (fieldRecording.readyState >= HTMLMediaElement.HAVE_FUTURE_DATA) {
      onReady();
      return;
    }

    fieldRecording.addEventListener(
      "canplay",
      function onCanPlay() {
        fieldRecording.removeEventListener("canplay", onCanPlay);
        onReady();
      },
      { once: true }
    );
  }

  function resumeFieldRecording() {
    if (
      !fieldRecording ||
      !fieldRecording.getAttribute("src") ||
      !fieldRecordingActivePlace
    ) {
      return;
    }

    startFieldRecordingPlayback(
      fieldRecordingActivePlace,
      fieldRecordingLoadToken
    );
  }

  function pauseFieldRecordingForMute() {
    if (!fieldRecording || !fieldRecording.getAttribute("src")) return;

    fieldRecording.pause();
    if (fieldRecordingActiveLabel) {
      setFieldRecordingUI("paused", fieldRecordingActiveLabel);
    }
  }

  function setMuted(muted) {
    if (!speakerBtn || !speakerIcon) return;

    speakerBtn.dataset.muted = String(muted);
    speakerBtn.setAttribute("aria-pressed", String(!muted));
    speakerBtn.setAttribute(
      "aria-label",
      muted ? "Turn audio on" : "Turn audio off"
    );
    speakerIcon.src = muted ? ASSETS.speakerMuted : ASSETS.speakerOn;

    if (muted) {
      pauseBgMusic();
      pauseFieldRecordingForMute();
      return;
    }

    if (isFieldRecordingActive()) {
      pauseBgMusic();
      resumeFieldRecording();
      enforceAudioExclusivity();
      return;
    }

    resumeBgMusicIfAllowed();
    enforceAudioExclusivity();
  }

  function toggleSpeaker() {
    setMuted(!isMuted());
  }

  if (speakerBtn) {
    speakerBtn.addEventListener("click", toggleSpeaker);
  }

  if (bgMusic) {
    bgMusic.addEventListener("play", function () {
      if (isFieldRecordingActive()) {
        bgMusic.pause();
      }
    });
  }

  if (fieldRecording) {
    fieldRecording.loop = true;

    fieldRecording.addEventListener("play", function () {
      pauseBgMusic();
      enforceAudioExclusivity();
    });

    fieldRecording.addEventListener("error", function () {
      if (!fieldRecording.error) return;
      console.warn(
        "[A Map of Belonging] Field recording load error:",
        fieldRecording.currentSrc || fieldRecording.src
      );
      if (fieldRecordingActiveLabel) {
        setFieldRecordingUI("blocked", fieldRecordingActiveLabel);
      }
    });
  }

  /* Initialize muted state (matches HTML defaults) */
  setMuted(true);

  /* ------------------------------------------------------------
     Welcome overlay — initial audio choice; uses existing setMuted()
     ------------------------------------------------------------ */
  const welcomeOverlay = document.getElementById("welcome-overlay");
  const welcomeSoundOn = document.getElementById("welcome-sound-on");
  const welcomeSoundOff = document.getElementById("welcome-sound-off");
  const WELCOME_FADE_MS = 420;

  function dismissWelcome(enableSound) {
    if (!welcomeOverlay || document.body.classList.contains("is-welcome-closing")) {
      return;
    }

    if (enableSound) {
      setMuted(false);
    } else {
      setMuted(true);
    }

    document.body.classList.remove("is-welcome-open");
    document.body.classList.add("is-welcome-closing");

    window.setTimeout(function () {
      welcomeOverlay.hidden = true;
      document.body.classList.remove("is-welcome-closing");
    }, WELCOME_FADE_MS);
  }

  if (welcomeOverlay) {
    /* Block outside clicks from dismissing the dialog */
    welcomeOverlay.addEventListener("click", function (event) {
      if (event.target === welcomeOverlay) {
        event.stopPropagation();
      }
    });

    if (welcomeSoundOn) {
      welcomeSoundOn.addEventListener("click", function () {
        dismissWelcome(true);
      });
    }

    if (welcomeSoundOff) {
      welcomeSoundOff.addEventListener("click", function () {
        dismissWelcome(false);
      });
    }

    /* Trigger entrance after first paint so CSS transitions run */
    window.requestAnimationFrame(function () {
      window.requestAnimationFrame(function () {
        document.body.classList.add("is-welcome-open");
        if (welcomeSoundOn) welcomeSoundOn.focus();
      });
    });
  }

  /* ------------------------------------------------------------
     Speaker / background music — see global audio section above
     ------------------------------------------------------------ */

  /* ------------------------------------------------------------
     Menu button — open / close #site-menu
     Region buttons open regional maps; Concept opens #concept-view.
     ------------------------------------------------------------ */
  const MENU_REGION_MAP = {
    hokkaido: "hokkaido",
    shizuoka: "honshu-south",
    tokyo: "honshu-central",
  };

  function isMenuOpen() {
    return !!(siteMenu && !siteMenu.hidden);
  }

  function setMenuOpen(open) {
    if (!siteMenu || !menuBtn) return;

    siteMenu.hidden = !open;
    menuBtn.setAttribute("aria-expanded", String(open));
    menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    document.body.classList.toggle("is-menu-open", open);
  }

  if (menuBtn) {
    menuBtn.addEventListener("click", function () {
      setMenuOpen(!isMenuOpen());
    });
  }

  if (siteMenu) {
    siteMenu.querySelectorAll("[data-menu]").forEach(function (btn) {
      btn.addEventListener("click", function () {
        const menuKey = btn.dataset.menu;
        setMenuOpen(false);

        if (menuKey === "concept") {
          showConcept();
          return;
        }

        const storyId = MENU_REGION_MAP[menuKey];
        if (!storyId) return;
        showRegionalMap(storyId);
      });
    });
  }

  /* ------------------------------------------------------------
     Regional map view
     House clicks swap the Japan homepage for a regional base map.
     Location icons are rendered into #regional-places per region.
     ------------------------------------------------------------ */
  let currentRegionalStoryId = null;

  function findPlace(storyId, placeId) {
    const places = REGIONAL_PLACES[storyId];
    if (!places) return null;
    for (let i = 0; i < places.length; i++) {
      if (places[i].id === placeId) return places[i];
    }
    return null;
  }

  function applyPlaceStyle(btn, place) {
    btn.style.setProperty("--x", place.x + "%");
    btn.style.setProperty("--y", place.y + "%");
    btn.style.setProperty("--place-size", String(place.size ?? 100));
  }

  function clearRegionalPlaces() {
    if (regionalPlaces) regionalPlaces.replaceChildren();
  }

  function renderRegionalPlaces(storyId) {
    clearRegionalPlaces();
    const places = REGIONAL_PLACES[storyId];
    if (!places || !regionalPlaces) return;

    places.forEach(function (place) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "place";
      btn.dataset.placeId = place.id;
      applyPlaceStyle(btn, place);
      btn.setAttribute("aria-label", place.label);

      const img = document.createElement("img");
      img.src = place.src;
      img.alt = "";
      img.className = "place__img";
      img.draggable = false;

      btn.appendChild(img);
      regionalPlaces.appendChild(btn);
    });
  }

  function showRegionalMap(storyId) {
    const region = REGIONAL_MAPS[storyId];
    if (!region || !regionalView || !regionalBase) return;

    hideConcept(false);
    pauseBgMusic();
    hidePhoto();
    currentRegionalStoryId = storyId;
    regionalBase.src = region.src;
    regionalBase.alt = region.alt;
    renderRegionalPlaces(storyId);
    regionalView.hidden = false;
    document.body.classList.add("is-regional-view");
    if (mapStage) mapStage.setAttribute("aria-hidden", "true");
    if (regionalBack) regionalBack.focus();
  }

  function hideRegionalMap() {
    if (!regionalView || !regionalBase) return;

    hidePhoto();
    currentRegionalStoryId = null;
    regionalView.hidden = true;
    document.body.classList.remove("is-regional-view");
    regionalBase.removeAttribute("src");
    regionalBase.alt = "";
    clearRegionalPlaces();
    if (mapStage && (!conceptView || conceptView.hidden)) {
      mapStage.removeAttribute("aria-hidden");
    }
    resumeBgMusicIfAllowed();
    enforceAudioExclusivity();
  }

  /* ------------------------------------------------------------
     Concept view — hamburger menu → written project description
     ------------------------------------------------------------ */
  function showConcept() {
    if (!conceptView) return;

    if (regionalView && !regionalView.hidden) {
      hidePhoto();
      currentRegionalStoryId = null;
      regionalView.hidden = true;
      document.body.classList.remove("is-regional-view");
      if (regionalBase) {
        regionalBase.removeAttribute("src");
        regionalBase.alt = "";
      }
      clearRegionalPlaces();
    }

    pauseBgMusic();
    conceptView.hidden = false;
    document.body.classList.add("is-concept-view");
    if (mapStage) mapStage.setAttribute("aria-hidden", "true");
    if (conceptBack) conceptBack.focus();
  }

  function hideConcept(resumeAudio) {
    if (!conceptView || conceptView.hidden) return;

    conceptView.hidden = true;
    document.body.classList.remove("is-concept-view");
    if (mapStage && (!regionalView || regionalView.hidden)) {
      mapStage.removeAttribute("aria-hidden");
    }
    if (resumeAudio !== false) {
      resumeBgMusicIfAllowed();
      enforceAudioExclusivity();
    }
  }

  /* ------------------------------------------------------------
     Photo viewer — location icon → photograph + field recording
     ------------------------------------------------------------ */
  function showPhoto(place) {
    if (!place || !place.photo || !photoView || !photoViewImg) return;

    photoViewImg.src = place.photo;
    photoViewImg.alt = place.label;
    photoView.hidden = false;
    if (photoBack) photoBack.focus();

    if (place.audio) {
      loadFieldRecording(place);
    } else {
      stopFieldRecording();
    }
  }

  function hidePhoto() {
    stopFieldRecording();

    if (!photoView || !photoViewImg) return;

    photoView.hidden = true;
    photoViewImg.removeAttribute("src");
    photoViewImg.alt = "";
  }

  function openPlacePhoto(placeId) {
    if (!currentRegionalStoryId) return;
    const place = findPlace(currentRegionalStoryId, placeId);
    if (!place) {
      console.warn(
        "[A Map of Belonging] Unknown place: " +
          placeId +
          " in " +
          currentRegionalStoryId
      );
      return;
    }
    if (!place.photo) {
      console.warn(
        "[A Map of Belonging] No photo configured for: " + placeId
      );
      return;
    }
    showPhoto(place);
  }

  houses.forEach(function (house) {
    house.addEventListener("click", function (event) {
      event.preventDefault();
      showRegionalMap(house.getAttribute("data-story-id"));
    });
  });

  if (regionalBack) {
    regionalBack.addEventListener("click", hideRegionalMap);
  }

  if (conceptBack) {
    conceptBack.addEventListener("click", function () {
      hideConcept();
    });
  }

  if (photoBack) {
    photoBack.addEventListener("click", function () {
      hidePhoto();
      if (regionalBack) regionalBack.focus();
    });
  }

  if (regionalPlaces) {
    regionalPlaces.addEventListener("click", function (event) {
      const btn = event.target.closest(".place");
      if (!btn) return;
      event.preventDefault();
      openPlacePhoto(btn.dataset.placeId);
    });
  }
})();
