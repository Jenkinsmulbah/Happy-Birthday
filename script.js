const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => [...document.querySelectorAll(selector)];

const countdownScreen = $("#countdownScreen");
const countdownNumber = $("#countdownNumber");
const countdownQuote = $("#countdownQuote");
const headphoneAlert = $("#headphoneAlert");
const startCountdownButton = $("#startCountdown");
const ringProgress = $("#ringProgress");
// One audio element plays both files in order (shorter ~44s first, then ~63s).
// Reusing a single element keeps mobile browsers from blocking the second track,
// because that element was already unlocked by the "I'm ready" tap.
const introAudio = $("#introAudio");
const introPlaylist = ["audio/birthday-audio-1.mp3", "audio/birthday-audio-2.mp3"];
let introIndex = 0;

const candleScreen = $("#candleScreen");
const candles = $$(".candle");
const candleStatus = $("#candleStatus");
const candleContinue = $("#candleContinue");
const rpsPanel = $("#rpsPanel");
const rpsRound = $("#rpsRound");
const rpsStatus = $("#rpsStatus");
const rpsChoices = $("#rpsChoices");
const rpsResult = $("#rpsResult");

const ageScreen = $("#ageScreen");
const ageForm = $("#ageForm");
const ageInput = $("#ageInput");
const ageResponse = $("#ageResponse");

const wishScreen = $("#wishScreen");
const wishForm = $("#wishForm");
const wishInput = $("#wishInput");
const wishSealed = $("#wishSealed");

const mainContent = $("#mainContent");
const birthdaySong = $("#birthdaySong");
const musicToggle = $("#musicToggle");
const musicIcon = $("#musicIcon");
const musicLabel = $("#musicLabel");

const missMinute = $("#missMinute");
const missMinuteText = $("#missMinuteText");

const questionCard = $("#questionCard");
const questionNumber = $("#questionNumber");
const questionText = $("#questionText");
const answerGrid = $("#answerGrid");
const questionCounter = $("#questionCounter");
const questionPercent = $("#questionPercent");
const questionProgress = $("#questionProgress");
const questionResponse = $("#questionResponse");

const chapterSection = $("#chapterSection");
const chapterAge = $("#chapterAge");
const chapterTitle = $("#chapterTitle");
const chapterMessage = $("#chapterMessage");
const continueAfterQuestions = $("#continueAfterQuestions");

const moodResponse = $("#moodResponse");
const moodContinue = $("#moodContinue");
const finalReveal = $("#finalReveal");
const finalMessage = $("#finalMessage");
const finalPreview = $("#finalPreview");
const prayerVideoWrap = $("#prayerVideoWrap");
const catGrid = $("#catGrid");
const catCounter = $("#catCounter");
const catGameStatus = $("#catGameStatus");
const catResponse = $("#catResponse");
const catContinue = $("#catContinue");
const candleCelebration = $("#candleCelebration");
const candleCelebrationTitle = $("#candleCelebrationTitle");
const candleCelebrationText = $("#candleCelebrationText");
const observationGrid = $("#observationGrid");
const observationCounter = $("#observationCounter");
const letterPages = $("#letterPages");
const letterPrev = $("#letterPrev");
const letterNext = $("#letterNext");
const letterPageNumber = $("#letterPageNumber");
const finalAge = $("#finalAge");
const finalYearTitle = $("#finalYearTitle");
const finalBirthdayName = $("#finalBirthdayName");
const finalSurprise = $("#finalSurprise");
const finalSurpriseButton = $("#finalSurpriseButton");
const timeCapsuleForm = $("#timeCapsuleForm");
const timeCapsuleInput = $("#timeCapsuleInput");
const timeCapsuleSaved = $("#timeCapsuleSaved");
const restartExperience = $("#restartExperience");

const EXPERIENCE_STORAGE_KEY = "birthdayExperienceState_v2";

const birthdayState = {
  currentLevel: "countdownScreen",
  recipient: "Boimalyn",
  age: null,
  answers: {
    newYear: null,
    birthdayStyle: null,
    moneyChoice: null,
    nextVersion: null,
    priority: null,
    chapterTitle: null
  },
  wish: "",
  wishSealed: false,
  memoriesViewed: [],
  finalSurpriseRevealed: false,
  timeCapsuleMessage: ""
};

const experienceContent = {
  recipient: "Boimalyn",
  observations: [
    "[ADD A REAL MEMORY OR OBSERVATION HERE]",
    "[ADD SOMETHING SHE PROBABLY DOESN'T REALIZE YOU NOTICE]",
    "[ADD A FUNNY OR EMBARRASSING MEMORY HERE]",
    "[ADD ONE THING YOU GENUINELY RESPECT ABOUT HER]",
    "[ADD A SMALL DETAIL YOU REMEMBER]",
    "[ADD A MOMENT THAT STILL MAKES YOU LAUGH]",
    "[ADD SOMETHING SHE ONCE SAID THAT STUCK WITH YOU]",
    "[ADD A MEMORY THAT WOULD MAKE HER SAY 'YOU REMEMBER THAT?']",
    "[ADD SOMETHING ABOUT HER PERSONALITY THAT YOU NOTICE]",
    "[ADD A SHORT, VERY SPECIFIC COMPLIMENT]",
    "[ADD A MOMENT WHEN SHE SURPRISED YOU]",
    "[ADD SOMETHING SHE DOES THAT IS VERY 'HER']",
    "[ADD A SMALL THING YOU ARE GRATEFUL FOR]",
    "[ADD A STORY THAT DOESN'T NEED A BIG EXPLANATION]",
    "[ADD SOMETHING YOU HOPE SHE NEVER CHANGES]",
    "[ADD A MOMENT THAT FELT ORDINARY THEN BUT MATTERS NOW]",
    "[ADD SOMETHING PLAYFUL HERE]",
    "[ADD SOMETHING YOU WANT HER TO REMEMBER ABOUT HERSELF]",
    "[ADD A SPECIFIC REASON YOU ENJOY HAVING HER IN YOUR LIFE]",
    "[ADD SOMETHING YOU HAVE NEVER SAID PROPERLY]",
    "[ADD THE ONE FINAL THING YOU WANT HER TO KNOW]"
  ]
};

function saveBirthdayState() {
  try {
    localStorage.setItem(EXPERIENCE_STORAGE_KEY, JSON.stringify(birthdayState));
  } catch (error) {
    // Private prototype: continue in memory if storage is unavailable.
  }
}

function restoreBirthdayState() {
  try {
    const saved = JSON.parse(localStorage.getItem(EXPERIENCE_STORAGE_KEY) || "null");
    if (!saved || typeof saved !== "object") return;
    birthdayState.currentLevel = saved.currentLevel || birthdayState.currentLevel;
    birthdayState.recipient = typeof saved.recipient === "string" && saved.recipient.trim() ? saved.recipient : birthdayState.recipient;
    birthdayState.age = Number.isInteger(saved.age) ? saved.age : null;
    birthdayState.answers = { ...birthdayState.answers, ...(saved.answers || {}) };
    birthdayState.wish = typeof saved.wish === "string" ? saved.wish : "";
    birthdayState.wishSealed = Boolean(saved.wishSealed);
    birthdayState.memoriesViewed = Array.isArray(saved.memoriesViewed) ? saved.memoriesViewed : [];
    birthdayState.finalSurpriseRevealed = Boolean(saved.finalSurpriseRevealed);
    birthdayState.timeCapsuleMessage = typeof saved.timeCapsuleMessage === "string" ? saved.timeCapsuleMessage : "";
  } catch (error) {
    // Corrupt/unavailable storage should never block the experience.
  }
}

restoreBirthdayState();

if (introAudio) {
  introAudio.addEventListener("ended", () => {
    if (!introSequenceActive || introIndex >= introPlaylist.length - 1) return;
    introIndex += 1;
    introAudio.src = introPlaylist[introIndex];
    introAudio.load();
    introAudio.play().catch(() => {
      // If the browser still blocks it, resume on her next tap anywhere.
      document.addEventListener("pointerdown", () => {
        if (introSequenceActive) introAudio.play().catch(() => {});
      }, { once: true });
    });
  });
}

const audioController = {
  active: null,
  async play(audio, { loop = false, volume = 1, reset = false } = {}) {
    if (!audio) return false;
    if (this.active && this.active !== audio) {
      this.active.pause();
      this.active.currentTime = 0;
    }
    this.active = audio;
    audio.loop = loop;
    audio.volume = volume;
    if (reset) audio.currentTime = 0;
    try {
      await audio.play();
      return true;
    } catch (error) {
      return false;
    }
  },
  stop(audio = this.active, { reset = true } = {}) {
    if (!audio) return;
    audio.pause();
    if (reset) audio.currentTime = 0;
    if (this.active === audio) this.active = null;
  }
};

let seconds = 60;
let countdownTimer = null;
let introSequenceActive = false;

function resetIntroPlaylist() {
  if (!introAudio || introIndex === 0) return;
  introIndex = 0;
  introAudio.src = introPlaylist[0];
  introAudio.load();
}
let candlesRemaining = candles.length;
let activeCandleIndex = 0;
let userAge = birthdayState.age;
let currentLevel = birthdayState.currentLevel || "countdownScreen";

const birthdayAnswers = birthdayState.answers;

const questions = [
  {
    key: "newYear",
    text: "What do you want more of this year?",
    answers: [
      ["Happiness", "More days that actually feel good."],
      ["Adventure", "More memories outside the usual routine."],
      ["Success", "More of the things you have been working for."],
      ["Peace", "More quiet when life gets too loud."]
    ],
    reactions: {
      Happiness: "I like that. You deserve plenty of days that feel genuinely good.",
      Adventure: "Okay, I see you. Let’s give you some stories worth telling.",
      Success: "I know you have things you want to accomplish. Keep going.",
      Peace: "Honestly, peace matters. Protect it when you find it."
    }
  },
  {
    key: "birthdayStyle",
    text: "If you could choose your birthday mood...",
    answers: [
      ["A big celebration", "People, music, food, and a little chaos."],
      ["Food + close friends", "Small circle. Good people. Good memories."],
      ["Somewhere new", "A different place and a story to bring back."],
      ["Peace and relaxation", "No pressure. Just enjoy the day."]
    ],
    reactions: {
      "A big celebration": "I can already imagine the noise. You’d probably enjoy it.",
      "Food + close friends": "That one sounds simple, but honestly, those are usually the best days.",
      "Somewhere new": "A birthday somewhere completely different? I can get behind that.",
      "Peace and relaxation": "Sometimes the best plan is having absolutely no stressful plan."
    }
  },
  {
    key: "moneyChoice",
    text: "Someone just gave you $10,000. Be honest. What are you doing first?",
    answers: [
      ["Save / invest it", "Let the money start doing some work."],
      ["Buy something I want", "Finally getting that thing you kept postponing."],
      ["Travel", "A good trip and a story you’ll never forget."],
      ["Find another $10,000", "You understood the assignment."]
    ],
    reactions: {
      "Save / invest it": "Okay, responsible. I respect that.",
      "Buy something I want": "Fair. Sometimes you should actually enjoy what you worked for.",
      Travel: "So we’re leaving the country. Noted.",
      "Find another $10,000": "Now that answer made me laugh. I knew you had sense."
    }
  },
  {
    key: "nextVersion",
    text: "By your next birthday, what do you hope has changed?",
    answers: [
      ["Stronger", "More sure of yourself than you are today."],
      ["Wiser", "A little more understanding of life and yourself."],
      ["More successful", "More things you once prayed or worked for becoming real."],
      ["Happier", "More genuine joy and less unnecessary stress."]
    ],
    reactions: {
      Stronger: "Then I hope this year gives you reasons to realize how strong you really are.",
      Wiser: "You learn a lot when you stop rushing through everything.",
      "More successful": "Keep building. Even the progress nobody sees still counts.",
      Happier: "I really hope you get that. Not fake happiness. The real kind."
    }
  },
  {
    key: "priority",
    text: "What deserves more of your attention this year?",
    answers: [
      ["School / Career", "Keep building the future you want."],
      ["Money", "More independence and more options."],
      ["People I care about", "Make time for the people who matter."],
      ["Actually enjoying life", "Because life cannot just be work, stress, and deadlines."]
    ],
    reactions: {
      "School / Career": "I know you have goals. Keep working toward them, but don’t forget yourself.",
      Money: "There’s nothing wrong with wanting more freedom.",
      "People I care about": "That one matters. The right people make life feel different.",
      "Actually enjoying life": "Exactly. You’re allowed to enjoy your own life while building it."
    }
  },
  {
    key: "chapterTitle",
    text: "If you could name this new year of your life, what would you call it?",
    answers: [
      ["My Time", "A year of choosing yourself and not waiting forever."],
      ["Level Up", "New skills, new goals, new experiences."],
      ["A New Chapter", "Leaving some things behind and making room for what’s next."],
      ["Becoming", "Growing into someone you will be proud to meet."]
    ],
    reactions: {
      "My Time": "I like that. No waiting around. This year is yours.",
      "Level Up": "Okay. Then let’s see what you build this year.",
      "A New Chapter": "Sometimes you really do need a fresh page.",
      Becoming: "That one feels different. You don’t have to have everything figured out. Just keep becoming."
    }
  }
];

const chapterMessages = {
  "My Time": "A year of choosing yourself, growing at your own pace, and not being afraid to take your place.",
  "Level Up": "New goals, new lessons, new experiences. Let’s see what you do with this year.",
  "A New Chapter": "Some things belong in the past. You have a whole new page to write.",
  "Becoming": "You do not need to become someone else. Just keep becoming a better version of you."
};

function speak(message) {
  missMinuteText.textContent = message;
  missMinute.classList.remove("mm-speaking");
  void missMinute.offsetWidth;
  missMinute.classList.add("mm-speaking");
}

const mmHosts = {
  countdownScreen: $("#mmHostCountdown"),
  candleScreen: $("#mmHostCandle"),
  ageScreen: $("#mmHostAge"),
  wishScreen: $("#mmHostWish"),
  levelHero: $("#mmHostHero"),
  introSection: $("#mmHostIntro"),
  questionsSection: $("#mmHostQuestions"),
  catGameSection: $("#mmHostCatGame"),
  chapterSection: $("#mmHostChapter"),
  memorySection: $("#mmHostMemory"),
  moodSection: $("#mmHostMood"),
  faithSection: $("#mmHostFaith"),
  observationsSection: $("#mmHostObservations"),
  letterSection: $("#mmHostLetter"),
  finalSection: $("#mmHostFinal"),
  timeCapsuleSection: $("#mmHostTimeCapsule")
};

function placeMissMinute(levelId) {
  const host = mmHosts[levelId];
  if (host) host.appendChild(missMinute);
}

function resetCountdownIntro() {
  clearTimeout(countdownTimer);
  seconds = 60;
  countdownNumber.textContent = "60";
  ringProgress.style.strokeDashoffset = 0;
  countdownQuote.textContent = "";
  countdownQuote.className = "quote quote-top";
  introSequenceActive = false;
  audioController.stop(introAudio);
  resetIntroPlaylist();
  headphoneAlert?.classList.remove("hidden");
}

function showScreen(screen) {
  [candleScreen, ageScreen, wishScreen].forEach((item) => item.classList.add("hidden"));
  mainContent.classList.add("hidden");

  if (screen === countdownScreen) {
    countdownScreen.classList.remove("hidden");
    document.body.classList.add("locked");
    currentLevel = screen.id;
    birthdayState.currentLevel = currentLevel;
    saveBirthdayState();
    placeMissMinute(currentLevel);
    resetCountdownIntro();
    window.scrollTo({ top: 0, behavior: "auto" });
    return;
  }

  screen.classList.remove("hidden");
  document.body.classList.remove("locked");
  currentLevel = screen.id;
  birthdayState.currentLevel = currentLevel;
  saveBirthdayState();
  placeMissMinute(currentLevel);
  window.scrollTo({ top: 0, behavior: "auto" });
}

function showLevel(id) {
  const target = document.getElementById(id);
  if (!target) return;

  if (id === "chapterSection") {
    populateChapterReveal();
  }

  countdownScreen.classList.add("hidden");
  candleScreen.classList.add("hidden");
  ageScreen.classList.add("hidden");
  wishScreen.classList.add("hidden");
  mainContent.classList.remove("hidden");

  document.querySelectorAll(".level-section").forEach((section) => {
    if (section.id !== id) section.classList.add("hidden");
  });

  target.classList.remove("hidden");
  currentLevel = id;
  birthdayState.currentLevel = currentLevel;
  saveBirthdayState();
  placeMissMinute(id);
  document.body.classList.remove("locked");
  target.scrollIntoView({ behavior: "smooth", block: "start" });
}

function nextLevel(id, message) {
  if (["candleScreen", "ageScreen", "wishScreen", "countdownScreen"].includes(id)) {
    showScreen(document.getElementById(id));
  } else {
    showLevel(id);
  }
  if (message) speak(message);
}

function setupLevelNavigation() {
  $$('[data-next]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.next;
      const messages = {
        introSection: "I put this together for you, so take your time with it.",
        questionsSection: "Okay, I want a few honest answers from you.",
        catGameSection: "Time for something completely unnecessary. Find the five cats.",
        chapterSection: "You found them. Now let’s see what you called this new year.",
        memorySection: "Now for a few moments I wanted to keep here for you.",
        moodSection: "One more thing. What do you want more of this year?",
        faithSection: "Before the last surprise, I wanted to leave you with a prayer.",
        finalSection: "You made it all the way here. Ready?"
      };
      nextLevel(target, messages[target]);
    });
  });

  $$('[data-prev]').forEach((button) => {
    button.addEventListener("click", () => {
      const target = button.dataset.prev;
      if (["candleScreen", "ageScreen", "wishScreen", "countdownScreen"].includes(target)) {
        showScreen(document.getElementById(target));
      } else {
        showLevel(target);
      }
    });
  });

  $$('[data-prev-screen]').forEach((button) => {
    button.addEventListener("click", () => {
      showScreen(document.getElementById(button.dataset.prevScreen));
    });
  });
}

function startCountdownExperience() {
  if (headphoneAlert) headphoneAlert.classList.add("hidden");
  document.body.classList.add("locked");
  seconds = 60;

  // Two opening audios play back to back: audio 1 (shorter), then audio 2 when it ends.
  // They continue through the candle, age, and wish stages and stop when the wish is sealed.
  introSequenceActive = true;
  resetIntroPlaylist();
  audioController.play(introAudio, { loop: false, volume: 0.9, reset: true }).then((started) => {
    if (!started) speak("The opening audio is ready. If you cannot hear it, check your volume before we start.");
  });
  countdownNumber.textContent = "60";
  ringProgress.style.strokeDashoffset = 0;
  countdownQuote.textContent = "";
  countdownQuote.className = "quote quote-top";
  speak("Hi, Boimalyn. I made this little thing for you. Just relax and follow me.");
  updateCountdown();
}

function updateCountdown() {
  countdownNumber.textContent = seconds;

  const circumference = 603.19;
  const progress = seconds / 60;
  ringProgress.style.strokeDashoffset = circumference * (1 - progress);

  const quoteMap = {
    50: "Another year. Another chapter. Another chance to become everything you dream of.",
    40: "May this year give you more reasons to smile.",
    30: "You are not getting older. You are becoming a newer version of yourself.",
    20: "May your dreams become plans, and your plans become memories.",
    10: "One more moment... your birthday surprise is almost ready."
  };

  if (quoteMap[seconds]) {
    countdownQuote.textContent = quoteMap[seconds];
    countdownQuote.className = "quote quote-top visible";
  }

  if (seconds === 30) {
    speak("We’re halfway there. I hope you’re enjoying this as much as I enjoyed making it.");
  }

  if (seconds === 10) {
    speak("Okay... almost there. Don’t rush it.");
  }

  if (seconds <= 0) {
    countdownNumber.textContent = "0";
    ringProgress.style.strokeDashoffset = circumference;
    speak("Okay... enough waiting. Your birthday starts here.");
    setTimeout(finishCountdown, 1200);
    return;
  }

  seconds -= 1;
  countdownTimer = setTimeout(updateCountdown, 1000);
}

function finishCountdown() {
  clearTimeout(countdownTimer);
  // The opening audios keep playing through the candle, age, and wish stages.
  // It stops only when the birthday wish is sealed.
  countdownScreen.classList.add("hidden");
  document.body.classList.remove("locked");
  showScreen(candleScreen);
  speak("Before we get to everything else, there’s one little birthday tradition we have to handle. Five candles. Let’s do this.");
}

function setupCandles() {
  if (candles[0]) candles[0].classList.add("active"); // lifted = "tap me"
  if (candleStatus) candleStatus.textContent = "Five candles. Tap candle 1, then beat me at Rock, Paper, Scissors to blow it out. One at a time.";
  candles.forEach((candle, index) => {
    candle.addEventListener("click", () => {
      if (candle.classList.contains("blown")) return;
      if (index !== activeCandleIndex) {
        speak(`Not that one. Tap candle ${activeCandleIndex + 1} — the lifted one.`);
        return;
      }
      // Already in the middle of this candle's game: don't restart it.
      if (!rpsPanel.classList.contains("hidden")) return;
      openRpsChallenge();
    });
  });

  $$(".rps-choice").forEach((button) => {
    button.addEventListener("click", () => playRps(button.dataset.choice));
  });

  candleContinue.addEventListener("click", () => {
    showScreen(ageScreen);
    speak("Alright, tell me. What age are you stepping into?");
    setTimeout(() => ageInput.focus(), 250);
  });
}

function openRpsChallenge() {
  candles.forEach((candle, index) => candle.classList.toggle("active", index === activeCandleIndex));
  const number = activeCandleIndex + 1;
  rpsPanel.classList.remove("hidden");
  rpsRound.textContent = `CANDLE ${number} OF ${candles.length}`;
  rpsStatus.textContent = `You want this candle? Beat me first. Rock, Paper, or Scissors.`;
  rpsResult.textContent = "";
  $$(".rps-choice").forEach((button) => { button.disabled = false; });
  speak(`Candle ${number}. Come on, let’s see if you can beat me.`);
  rpsPanel.scrollIntoView({ behavior: "smooth", block: "center" });
}

function playRps(playerChoice) {
  const choices = ["rock", "paper", "scissors"];
  const missChoice = choices[Math.floor(Math.random() * choices.length)];
  const labels = { rock: "Rock", paper: "Paper", scissors: "Scissors" };

  $$(".rps-choice").forEach((button) => { button.disabled = true; });
  rpsResult.textContent = `You picked ${labels[playerChoice]}. I picked ${labels[missChoice]}.`;

  let result = "draw";
  if (
    (playerChoice === "rock" && missChoice === "scissors") ||
    (playerChoice === "paper" && missChoice === "rock") ||
    (playerChoice === "scissors" && missChoice === "paper")
  ) {
    result = "win";
  } else if (playerChoice !== missChoice) {
    result = "lose";
  }

  if (result === "win") {
    rpsResult.textContent += " You win.";
    speak("You got me. Fine. You can have this one.");
    setTimeout(() => extinguishActiveCandle(), 700);
    return;
  }

  if (result === "draw") {
    rpsResult.textContent += " Draw. Again.";
    speak("A draw does not count. Try again.");
  } else {
    rpsResult.textContent += " I win. Try again.";
    speak("Nice try. But that candle is still mine. Try again.");
  }

  setTimeout(() => {
    $$(".rps-choice").forEach((button) => { button.disabled = false; });
  }, 550);
}

function celebrateCandle(number) {
  if (!candleCelebration) return;
  candleCelebrationTitle.textContent = number === candles.length ? "YOU ACTUALLY DID IT." : "ONE DOWN.";
  candleCelebrationText.textContent = number === candles.length ? "You beat me all five times. I’m not even mad." : `Candle ${number} is out. One less to worry about.`;
  candleCelebration.classList.remove("hidden");
  launchConfetti();
  setTimeout(() => candleCelebration.classList.add("hidden"), 1100);
}

function extinguishActiveCandle() {
  const candle = candles[activeCandleIndex];
  candle.classList.remove("active");
  candle.classList.add("blown");
  candle.setAttribute("aria-pressed", "true");
  candle.disabled = true;
  candlesRemaining -= 1;
  rpsPanel.classList.add("hidden");
  celebrateCandle(activeCandleIndex + 1);

  if (candlesRemaining > 0) {
    activeCandleIndex += 1;
    // Do NOT auto-start the next game. She has to tap the next candle herself.
    candles[activeCandleIndex].classList.add("active"); // lifted = "tap me next"
    candleStatus.textContent = `${candlesRemaining} candle${candlesRemaining === 1 ? "" : "s"} left. Tap candle ${activeCandleIndex + 1} when you're ready.`;
    setTimeout(() => speak(`Tap candle ${activeCandleIndex + 1} when you’re ready for the next round.`), 1200);
    setTimeout(() => candles[activeCandleIndex]?.scrollIntoView({ behavior: "smooth", block: "center" }), 900);
  } else {
    candleStatus.textContent = "Five candles. Five wins. Okay, I’m impressed.";
    candleContinue.classList.remove("hidden");
    speak("You actually beat me every time. Respect. Now you get the important part. Make your wish.");
  }
}

ageForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const age = Number(ageInput.value);

  if (!Number.isInteger(age) || age < 1 || age > 120) {
    ageResponse.textContent = "I need an actual age, please.";
    return;
  }

  userAge = age;
  birthdayState.age = age;
  saveBirthdayState();
  ageResponse.textContent = `Ah... ${age}. Look at you. A whole new year.`;
  speak(`Ah... ${age}. Look at you. A whole new year.`);

  setTimeout(() => {
    showScreen(wishScreen);
    speak("Take a breath. Think about what you really want from this year. Then write your wish down.");
    setTimeout(() => wishInput.focus(), 350);
  }, 1200);
});

wishForm.addEventListener("submit", (event) => {
  event.preventDefault();

  const privateWish = wishInput.value.trim();

  if (!privateWish) {
    speak("You need a wish first. It can be short. Just make it yours.");
    wishInput.focus();
    return;
  }

  birthdayState.wish = privateWish;
  birthdayState.wishSealed = true;
  saveBirthdayState();
  wishInput.value = "";

  // The opening audios have done their job. Stop them now that the wish is sealed.
  introSequenceActive = false;
  audioController.stop(introAudio);
  resetIntroPlaylist();

  wishForm.classList.add("hidden");
  wishSealed.classList.remove("hidden");

  speak("It’s sealed. Whatever you wished for, I hope this year gives you a real reason to smile when you think about it.");

  setTimeout(startBirthdayExperience, 2300);
});

function startBirthdayExperience() {
  showLevel("levelHero");

  birthdaySong.volume = 0.65;
  birthdaySong.addEventListener("error", () => {
    musicIcon.textContent = "▶";
    musicLabel.textContent = "Song unavailable";
    musicToggle.setAttribute("aria-label", "Birthday song unavailable");
  }, { once: true });

  audioController.play(birthdaySong, { loop: false, volume: 0.65, reset: false }).then((started) => {
    if (started) {
      musicIcon.textContent = "Ⅱ";
      musicLabel.textContent = "Birthday song";
      musicToggle.setAttribute("aria-label", "Pause birthday song");
    } else {
      musicIcon.textContent = "▶";
      musicLabel.textContent = "Play song";
      speak("Your birthday song is ready. Tap the music button if it needs a little help starting.");
    }
  });

  speak("That wish is yours now. Keep it somewhere in your heart. And now... the fun part starts.");
}

musicToggle.addEventListener("click", () => {
  if (birthdaySong.paused) {
    audioController.play(birthdaySong, { loop: false, volume: 0.65 }).then((started) => {
      if (!started) return;
      musicIcon.textContent = "Ⅱ";
      musicLabel.textContent = "Birthday song";
      musicToggle.setAttribute("aria-label", "Pause birthday song");
    });
  } else {
    audioController.stop(birthdaySong, { reset: false });
    musicIcon.textContent = "▶";
    musicLabel.textContent = "Play birthday song";
    musicToggle.setAttribute("aria-label", "Play birthday song");
  }
});

function renderQuestion(index) {
  const question = questions[index];
  const number = String(index + 1).padStart(2, "0");
  const percent = Math.round(((index + 1) / questions.length) * 100);

  questionNumber.textContent = `QUESTION ${number}`;
  questionText.textContent = question.text;
  questionCounter.textContent = `${number} / 06`;
  questionPercent.textContent = `${percent}%`;
  questionProgress.style.width = `${percent}%`;
  questionResponse.textContent = "";

  answerGrid.innerHTML = "";

  question.answers.forEach(([title, description]) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-btn";
    button.innerHTML = `<strong>${title}</strong><span>${description}</span>`;

    button.addEventListener("click", () => {
      selectAnswer(index, title, button);
    });

    answerGrid.appendChild(button);
  });
}

function selectAnswer(index, answer, button) {
  const question = questions[index];
  birthdayAnswers[question.key] = answer;
  birthdayState.answers = birthdayAnswers;
  saveBirthdayState();

  $$(".answer-btn").forEach((item) => item.classList.remove("selected"));
  button.classList.add("selected");

  const reaction = question.reactions[answer];
  questionResponse.textContent = reaction;
  speak(reaction);

  if (index === questions.length - 1) {
    questionProgress.style.width = "100%";
    questionPercent.textContent = "100%";
    continueAfterQuestions.classList.remove("hidden");
    speak("That’s all six. You made it through. Take a breath, then keep going.");
    return;
  }

  setTimeout(() => {
    questionCard.classList.add("changing");

    setTimeout(() => {
      renderQuestion(index + 1);
      questionCard.classList.remove("changing");
    }, 260);
  }, 850);
}

function sketchSVG(type) {
  const common = 'viewBox="0 0 120 120" aria-hidden="true"';
  const stroke = 'fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"';
  const fills = 'fill="currentColor"';
  const shapes = {
    cat: `<svg ${common} ${stroke}><path d="M28 49 30 25 48 38Q60 33 72 38L90 25 92 49Q99 58 94 73 88 91 60 94 32 91 26 73 21 58 28 49Z"/><path d="M45 62h1M74 62h1M51 73q9 7 18 0M60 67v4M42 70l-14-4M78 70l14-4"/></svg>`,
    fox: `<svg ${common} ${stroke}><path d="M27 48 24 25 46 37Q60 32 74 37L96 25 93 50Q98 66 86 80 73 94 60 94 47 94 34 80 22 66 27 48Z"/><path d="m49 65 11 10 11-10M46 60h1M73 60h1"/></svg>`,
    bunny: `<svg ${common} ${stroke}><path d="M43 39Q31 20 38 15 48 12 51 37M77 39Q89 20 82 15 72 12 69 37Q90 48 91 67 89 91 60 94 31 91 29 67 30 48 43 39Z"/><path d="M47 63h1M72 63h1M52 74q8 5 16 0"/></svg>`,
    bear: `<svg ${common} ${stroke}><circle cx="40" cy="39" r="13"/><circle cx="80" cy="39" r="13"/><circle cx="60" cy="63" r="31"/><path d="M49 62h1M70 62h1M53 74q7 6 14 0"/></svg>`,
    bat: `<svg ${common} ${stroke}><path d="M60 88Q46 73 39 52L17 38 24 67 39 59Q43 79 60 88 77 79 81 59L96 67 103 38 81 52Q74 73 60 88Z"/><circle cx="51" cy="61" r="1" fill="currentColor"/><circle cx="69" cy="61" r="1" fill="currentColor"/></svg>`,
    dog: `<svg ${common} ${stroke}><path d="M32 47 24 28 43 36Q60 30 77 36L96 28 88 50Q93 68 82 81 70 94 60 94 50 94 38 81 27 68 32 47Z"/><path d="M47 62h1M72 62h1M52 74q8 5 16 0M35 51 26 45M85 51l9-6"/></svg>`,
    owl: `<svg ${common} ${stroke}><circle cx="42" cy="48" r="21"/><circle cx="78" cy="48" r="21"/><path d="M60 25Q84 31 91 54 88 88 60 94 32 88 29 54 36 31 60 25Z"/><circle cx="42" cy="48" r="6"/><circle cx="78" cy="48" r="6"/><path d="m60 57-6 9 6 5 6-5-6-9Z"/></svg>`,
    devil: `<svg ${common} ${stroke}><path d="M32 45 23 24 47 36Q60 31 73 36L97 24 88 46Q95 62 87 78 77 94 60 94 43 94 33 78 25 62 32 45Z"/><path d="M47 61h1M72 61h1M51 73q9 6 18 0M47 82q13 7 26 0"/></svg>`,
    koala: `<svg ${common} ${stroke}><circle cx="38" cy="48" r="18"/><circle cx="82" cy="48" r="18"/><circle cx="60" cy="63" r="30"/><path d="M51 62q9-8 18 0M55 75q5 4 10 0"/><circle cx="60" cy="67" r="5"/></svg>`,
    raccoon: `<svg ${common} ${stroke}><path d="M28 48 27 27 47 38Q60 33 73 38L93 27 92 49Q98 67 86 81 73 94 60 94 47 94 34 81 22 67 28 48Z"/><path d="M34 56Q60 45 86 56M47 63h1M72 63h1M53 74q7 5 14 0"/></svg>`
  };
  return shapes[type] || shapes.cat;
}

function setupCatGame() {
  if (!catGrid) return;
  const decoys = ["fox", "bunny", "bear", "bat", "dog", "owl", "devil", "koala", "raccoon", "fox"];
  const tiles = [
    ...Array(5).fill("cat"),
    ...decoys
  ].sort(() => Math.random() - 0.5);

  catGrid.innerHTML = "";
  let found = 0;

  tiles.forEach((type, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "cat-tile";
    button.dataset.cat = type === "cat" ? "true" : "false";
    button.setAttribute("aria-label", `Sketch ${index + 1}`);
    button.innerHTML = `<span class="cat-sketch">${sketchSVG(type)}</span><span class="cat-tile-number">${String(index + 1).padStart(2, "0")}</span>`;

    button.addEventListener("click", () => {
      if (button.disabled) return;

      if (button.dataset.cat === "true") {
        button.disabled = true;
        button.classList.add("found");
        found += 1;
        catCounter.textContent = `${found} / 5 cats found`;
        catGameStatus.textContent = found === 5 ? "All five. Okay, you really were paying attention." : "That’s one. Keep looking.";
        catResponse.textContent = found === 5 ? "Five out of five. Okay, I’m impressed." : "Yep. That one is definitely a cat.";
        speak(found === 5 ? "Five cats. You found every one. I knew you’d get there." : "Yep. That one is definitely a cat. Keep going.");

        if (found === 5) {
          catContinue.classList.remove("hidden");
          launchConfetti();
          speak("Five cats. Done. You actually found them all.");
        }
      } else {
        button.classList.add("wrong");
        catResponse.textContent = "Nope. That one was a decoy.";
        catGameStatus.textContent = "Nice try. Look again.";
        speak("Nope. Decoy. Keep searching.");
        setTimeout(() => button.classList.remove("wrong"), 500);
      }
    });

    catGrid.appendChild(button);
  });

  if (catCounter) catCounter.textContent = "0 / 5 cats found";
  if (catGameStatus) catGameStatus.textContent = "Trust yourself.";
  if (catResponse) catResponse.textContent = "";
  catContinue?.classList.add("hidden");
}

function showCatGame() {
  showLevel("catGameSection");
  speak("Okay, one last little challenge before the chapter reveal. Find all five cats.");
}

function populateChapterReveal() {
  const age = userAge ?? "—";
  const title = birthdayAnswers.chapterTitle || "A New Chapter";
  const message = chapterMessages[title] || "Whatever this year becomes, I hope it gives you reasons to be proud of yourself.";

  chapterAge.textContent = age;
  chapterTitle.textContent = title;
  chapterMessage.textContent = message;

  finalPreview.textContent = `You’re stepping into ${age} with the title “${title}.” I hope you make this year your own.`;
}

$$(".mood-card").forEach((button) => {
  button.addEventListener("click", () => {
    $$(".mood-card").forEach((item) => item.classList.remove("selected"));
    button.classList.add("selected");

    const mood = button.dataset.mood;
    const messages = {
      Happiness: "Then let's make room for more reasons to smile.",
      Adventure: "Then this year needs a few stories worth telling.",
      Growth: "Keep becoming. Quiet progress still counts.",
      Peace: "Protect your peace. It matters."
    };

    moodResponse.textContent = messages[mood];
    moodContinue.classList.remove("hidden");
    speak(messages[mood]);
  });
});

function populateFinalReveal() {
  const age = birthdayState.age ?? userAge ?? "—";
  const title = birthdayState.answers.chapterTitle || "A New Chapter";
  if (finalAge) finalAge.textContent = age;
  if (finalYearTitle) finalYearTitle.textContent = title;
  if (finalBirthdayName) finalBirthdayName.textContent = birthdayState.recipient || experienceContent.recipient;
}

function revealFinalSurprise() {
  if (!finalSurprise) return;
  birthdayState.finalSurpriseRevealed = true;
  saveBirthdayState();
  finalSurprise.classList.remove("hidden");
  finalSurpriseButton?.classList.add("hidden");
  speak("Wait. There’s one more thing.");
  setTimeout(() => prayerVideoWrap?.scrollIntoView({ behavior: "smooth", block: "start" }), 650);
}

finalReveal.addEventListener("click", () => {
  populateFinalReveal();
  finalMessage.classList.remove("hidden");
  finalReveal.classList.add("hidden");
  speak(`Happy Birthday, ${birthdayState.recipient || experienceContent.recipient}. You made it all the way here.`);
  finalMessage.scrollIntoView({ behavior: "smooth", block: "center" });
  setTimeout(() => {
    if (finalSurpriseButton) finalSurpriseButton.classList.remove("hidden");
  }, 1500);
});

finalSurpriseButton?.addEventListener("click", revealFinalSurprise);


function renderObservations() {
  if (!observationGrid) return;
  observationGrid.innerHTML = "";
  experienceContent.observations.forEach((text, index) => {
    const article = document.createElement("article");
    article.className = "observation-card";
    article.dataset.index = String(index);
    const number = String(index + 1).padStart(2, "0");
    article.innerHTML = `<span class="observation-number">${number}</span><p></p>`;
    article.querySelector("p").textContent = text;
    observationGrid.appendChild(article);
  });
  if (observationCounter) observationCounter.textContent = `${experienceContent.observations.length} things, waiting to be made personal.`;
}

const letterContent = [
  "[START YOUR REAL LETTER HERE]",
  "Write this part like you would actually speak to her. Specific memories matter more than polished poetry. Keep the sentences natural.",
  "[ADD THE THING YOU REALLY WANT HER TO KNOW]",
  "[END WITH YOUR OWN WORDS — NOT A GENERIC BIRTHDAY QUOTE]"
];
let letterPage = 0;

function renderLetter() {
  if (!letterPages) return;
  letterPages.innerHTML = "";
  const page = document.createElement("article");
  page.className = "letter-page";
  const heading = document.createElement("p");
  heading.className = "letter-page-kicker";
  heading.textContent = `PAGE ${letterPage + 1}`;
  const body = document.createElement("p");
  body.textContent = letterContent[letterPage];
  page.append(heading, body);
  letterPages.appendChild(page);
  if (letterPageNumber) letterPageNumber.textContent = `${letterPage + 1} / ${letterContent.length}`;
  if (letterPrev) letterPrev.disabled = letterPage === 0;
  if (letterNext) letterNext.disabled = letterPage === letterContent.length - 1;
}

letterPrev?.addEventListener("click", () => {
  if (letterPage > 0) { letterPage -= 1; renderLetter(); }
});
letterNext?.addEventListener("click", () => {
  if (letterPage < letterContent.length - 1) { letterPage += 1; renderLetter(); }
});

timeCapsuleForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const message = timeCapsuleInput.value.trim();
  if (!message) {
    timeCapsuleInput.focus();
    return;
  }
  birthdayState.timeCapsuleMessage = message;
  saveBirthdayState();
  timeCapsuleInput.value = "";
  timeCapsuleForm.classList.add("hidden");
  timeCapsuleSaved.classList.remove("hidden");
  speak("You wrote this today. Keep it somewhere safe, and come back next year.");
});

restartExperience?.addEventListener("click", () => {
  try { localStorage.removeItem(EXPERIENCE_STORAGE_KEY); } catch (error) {}
  window.location.reload();
});

function hydrateSavedState() {
  if (birthdayState.age !== null && ageInput) ageInput.value = String(birthdayState.age);
  if (birthdayState.wishSealed) {
    wishForm?.classList.add("hidden");
    wishSealed?.classList.remove("hidden");
  }
  populateFinalReveal();
}

function resumeSavedExperience() {
  const savedLevel = birthdayState.currentLevel;
  if (!savedLevel || savedLevel === "countdownScreen") {
    showScreen(countdownScreen);
    return;
  }
  if (savedLevel === "candleScreen") {
    showScreen(candleScreen);
    return;
  }
  if (savedLevel === "ageScreen" && birthdayState.age === null) {
    showScreen(ageScreen);
    return;
  }
  if (savedLevel === "wishScreen" && !birthdayState.wishSealed) {
    showScreen(wishScreen);
    return;
  }
  if (birthdayState.wishSealed) {
    if (["wishScreen", "countdownScreen", "candleScreen", "ageScreen"].includes(savedLevel)) {
      showLevel("levelHero");
    } else {
      showLevel(savedLevel);
    }
    return;
  }
  showScreen(countdownScreen);
}

renderObservations();
renderLetter();
hydrateSavedState();

function launchConfetti() {
  for (let i = 0; i < 100; i += 1) {
    const piece = document.createElement("span");
    piece.className = "confetti";
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.animationDelay = `${Math.random() * 0.8}s`;
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    document.body.appendChild(piece);

    setTimeout(() => piece.remove(), 4500);
  }
}

renderQuestion(0);
setupCandles();
setupCatGame();
setupLevelNavigation();

if (startCountdownButton) {
  startCountdownButton.addEventListener("click", startCountdownExperience);
}

resumeSavedExperience();


