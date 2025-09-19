/*
 * Behaviour for the number porting guide
 *
 * This script wires up the search functionality, provider
 * accordion toggles, and schedules.  Icons are stored as
 * inline SVG snippets to avoid external dependencies.
 */

(function () {
  "use strict";

  // ---------------------------------------------------------------------------
  // Icon definitions
  //
  // Each icon is an inline SVG snippet generated from Font Awesome.  The
  // `fill="currentColor"` attribute ensures that the icons inherit the
  // colour of their container.
  const icons = {
    search: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"></path></svg>`,
    link: `<svg aria-hidden="true" focusable="false" viewBox="0 0 640 512"><path fill="currentColor" d="M579.8 267.7c56.5-56.5 56.5-148 0-204.5c-50-50-128.8-56.5-186.3-15.4l-1.6 1.1c-14.4 10.3-17.7 30.3-7.4 44.6s30.3 17.7 44.6 7.4l1.6-1.1c32.1-22.9 76-19.3 103.8 8.6c31.5 31.5 31.5 82.5 0 114L422.3 334.8c-31.5 31.5-82.5 31.5-114 0c-27.9-27.9-31.5-71.8-8.6-103.8l1.1-1.6c10.3-14.4 6.9-34.4-7.4-44.6s-34.4-6.9-44.6 7.4l-1.1 1.6C206.5 251.2 213 330 263 380c56.5 56.5 148 56.5 204.5 0L579.8 267.7zM60.2 244.3c-56.5 56.5-56.5 148 0 204.5c50 50 128.8 56.5 186.3 15.4l1.6-1.1c14.4-10.3 17.7-30.3 7.4-44.6s-30.3-17.7-44.6-7.4l-1.6 1.1c-32.1 22.9-76 19.3-103.8-8.6C74 372 74 321 105.5 289.5L217.7 177.2c31.5-31.5 82.5-31.5 114 0c27.9 27.9 31.5 71.8 8.6 103.9l-1.1 1.6c-10.3 14.4-6.9 34.4 7.4 44.6s34.4 6.9 44.6-7.4l1.1-1.6C433.5 260.8 427 182 377 132c-56.5-56.5-148-56.5-204.5 0L60.2 244.3z"></path></svg>`,
    chevronDown: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"></path></svg>`,
    chevronUp: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"></path></svg>`,
    externalLink: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M320 0c-17.7 0-32 14.3-32 32s14.3 32 32 32l82.7 0L201.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L448 109.3l0 82.7c0 17.7 14.3 32 32 32s32-14.3 32-32l0-160c0-17.7-14.3-32-32-32L320 0zM80 32C35.8 32 0 67.8 0 112L0 432c0 44.2 35.8 80 80 80l320 0c44.2 0 80-35.8 80-80l0-112c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 112c0 8.8-7.2 16-16 16L80 448c-8.8 0-16-7.2-16-16l0-320c0-8.8 7.2-16 16-16l112 0c17.7 0 32-14.3 32-32s-14.3-32-32-32L80 32z"></path></svg>`,
    phone: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M164.9 24.6c-7.7-18.6-28-28.5-47.4-23.2l-88 24C12.1 30.2 0 46 0 64C0 311.4 200.6 512 448 512c18 0 33.8-12.1 38.6-29.5l24-88c5.3-19.4-4.6-39.7-23.2-47.4l-96-40c-16.3-6.8-35.2-2.1-46.3 11.6L304.7 368C234.3 334.7 177.3 277.7 144 207.3L193.3 167c13.7-11.2 18.4-30 11.6-46.3l-40-96z"></path></svg>`,
    clock: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0a256 256 0 1 1 0 512A256 256 0 1 1 256 0zM232 120l0 136c0 8 4 15.5 10.7 20l96 64c11 7.4 25.9 4.4 33.3-6.7s4.4-25.9-6.7-33.3L280 243.2 280 120c0-13.3-10.7-24-24-24s-24 10.7-24 24z"></path></svg>`,
    shield: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M256 0c4.6 0 9.2 1 13.4 2.9L457.7 82.8c22 9.3 38.4 31 38.3 57.2c-.5 99.2-41.3 280.7-213.6 363.2c-16.7 8-36.1 8-52.8 0C57.3 420.7 16.5 239.2 16 140c-.1-26.2 16.3-47.9 38.3-57.2L242.7 2.9C246.8 1 251.4 0 256 0zm0 66.8l0 378.1C394 378 431.1 230.1 432 141.4L256 66.8s0 0 0 0z"></path></svg>`,
    file: `<svg aria-hidden="true" focusable="false" viewBox="0 0 384 512"><path fill="currentColor" d="M64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-288-128 0c-17.7 0-32-14.3-32-32L224 0 64 0zM256 0l0 128 128 0L256 0zM112 256l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16zm0 64l160 0c8.8 0 16 7.2 16 16s-7.2 16-16 16l-160 0c-8.8 0-16-7.2-16-16s7.2-16 16-16z"></path></svg>`,
    info: `<svg aria-hidden="true" focusable="false" viewBox="0 0 512 512"><path fill="currentColor" d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zM216 336l24 0 0-64-24 0c-13.3 0-24-10.7-24-24s10.7-24 24-24l48 0c13.3 0 24 10.7 24 24l0 88 8 0c13.3 0 24 10.7 24 24s-10.7 24-24 24l-80 0c-13.3 0-24-10.7-24-24s10.7-24 24-24zm40-208a32 32 0 1 1 0 64 32 32 0 1 1 0-64z"></path></svg>`
  };

  // ---------------------------------------------------------------------------
  // Knowledge base data
  //
  // Each entry contains a question, an answer and a set of tags.  Tags and
  // questions/answers are all searched when users type into the search box.
  const knowledgeBase = [
    {
      id: "zoom-port-window",
      q: "What time do Zoom ports happen in the US/Canada?",
      a: "Zoom schedules US/Canada cutovers at 11:30 AM Eastern Time on business days (no weekends/holidays). Preassign numbers to users/sites before cutover.",
      tags: ["zoom", "time", "schedule", "cutover", "11:30", "eastern", "US", "Canada"],
    },
    {
      id: "goto-pin",
      q: "Does GoTo require a port-out PIN?",
      a: "Yes. Set a 4–8 digit Port-out Passcode in GoTo Admin (Settings → Capabilities → Phones → Phone System Security). Provide this PIN to the gaining carrier when porting away.",
      tags: ["goto", "port out", "pin", "passcode", "security"],
    },
    {
      id: "ms-teams-pin",
      q: "Does Microsoft require a port-out PIN?",
      a: "Yes. Set a 10-digit Port-out PIN in Teams Admin (Voice → Phone numbers → Manage port-out PIN). Provide this to the gaining carrier.",
      tags: ["microsoft", "teams", "pin", "port out"],
    },
    {
      id: "ringcentral-window",
      q: "When do RingCentral ports activate?",
      a: "RingCentral typically activates US/CA ports between 8–9 AM Pacific (11–12 PM Eastern) on the confirmed date (Mon–Fri).",
      tags: ["ringcentral", "schedule", "cutover", "time"],
    },
    {
      id: "8x8-lead-times",
      q: "How long do 8x8 ports take?",
      a: "Typical minimum lead times: 1–49 local numbers ≈ 7 business days; 50+ local numbers ≈ 15 business days; toll‑free ≈ 3 business days (assuming no rejections).",
      tags: ["8x8", "lead times", "timeline", "toll-free"],
    },
    {
      id: "zoom-out-pin",
      q: "What do I need to port out of Zoom?",
      a: "Keep service active. From Zoom Admin, copy Account Name/Number (Account Profile), Billing Address, and retrieve the Port-out PIN (Number Management → Related Features → Port‑out Verification). Give these to the new carrier.",
      tags: ["zoom", "port out", "pin", "account number", "address"],
    },
    {
      id: "ms-teams-schedule",
      q: "What about Teams port times?",
      a: "US local numbers can be scheduled between 8 AM and 8 PM Eastern; Canada and US toll‑free default to 11:30 AM Eastern (custom times require support).",
      tags: ["microsoft", "teams", "schedule", "time", "canada", "toll-free"],
    },
    {
      id: "common-docs",
      q: "What documents are needed for a port?",
      a: "Typically: LOA (or e‑LOA), current carrier Account #, PIN for wireless/VoIP (if any), exact Service Address, Authorized Name, recent bill/CSR for validation. Keep losing service active until completion.",
      tags: ["docs", "loa", "csr", "bill", "pin"],
    },
    {
      id: "goto-tmp",
      q: "Can I avoid downtime with GoTo or 8x8?",
      a: "Yes. Both support temporary numbers and/or call forwarding before cutover so you can configure routing and present correct caller ID during the wait period.",
      tags: ["goto", "8x8", "temporary", "forwarding", "downtime"],
    },
  ];

  // ---------------------------------------------------------------------------
  // Provider definitions
  //
  // Each provider object includes the information necessary to render its
  // summary card, details, and list of required documents and official links.
  const providers = [
    {
      key: "ringcentral",
      name: "RingCentral",
      summary: "Ports via portal; typical 5–10 business days. Wireless needs account # and PIN. Large (>100) handled as project ports. Cutovers often late morning (8–9 AM PT).",
      portal: "Admin portal (Phone System → Number Transfer / Port In)",
      contact: "Number Transfer Dept. for complex cases",
      timing: "Mon–Fri, typically AM (8–9 AM PT / 11–12 ET)",
      docs: ["LOA/e‑LOA", "Account #", "Service address", "Authorized name", "Wireless PIN (if applicable)", "Recent bill/CSR (if requested)"],
      links: [
        { label: "RingCentral – Porting hub", href: "https://support.ringcentral.com/porting.html" },
        { label: "RingCentral community: Porting guide", href: "https://community.ringcentral.com/news-announcements-13/smooth-sailing-a-step-by-step-guide-to-submitting-your-porting-request-9384" },
      ],
      // Detailed step‑by‑step instructions for RingCentral
      steps: [
        "Sign in to the RingCentral Admin Portal as an administrator.",
        "Go to <strong>Phone System → Phone Numbers → Number Transfer</strong> (also labelled <strong>Port In Numbers</strong>).",
        "Click <strong>Port In</strong> and enter the phone numbers you wish to transfer.",
        "Provide your current carrier’s information: account number, service address, authorized name, and PIN if you’re porting wireless numbers.",
        "Upload a recent bill/CSR if requested, then submit the port order.",
        "Monitor the status in <strong>Phone Numbers → Transfer Orders</strong>. Once you receive the FOC date, plan for a cutover in the late morning (8–9 AM PT).",
        "After the port completes, verify inbound and outbound calling and then cancel the service with the losing carrier."
      ],
    },
    {
      key: "goto",
      name: "GoTo Connect",
      summary: "Self‑service port request with preferred date (6–30 days out). Temporary numbers & outbound CNAM. Port‑out requires a 4–8 digit passcode.",
      portal: "admin.goto.com → Phone System → Phone Numbers → + Port Existing Numbers",
      contact: "Support for PIN setup / exceptions",
      timing: "Business days; 0–3 hr cutover window; AM/early PM typical",
      docs: ["LOA/e‑LOA", "Account #/BTN", "Service address", "Authorized name", "Wireless/VoIP PIN (if applicable)", "Recent bill/CSR (recommended)"],
      links: [
        { label: "GoTo – Port existing numbers (Admin)", href: "https://support.goto.com/connect/help/port-existing-phone-numbers" },
        { label: "GoTo – Prevent unauthorized transfers (set port-out PIN)", href: "https://support.goto.com/connect/help/how-do-i-prevent-unauthorized-phone-number-transfers-gotoconnect-prevent-unauthorized-phone-number-transfers" },
      ],
      steps: [
        "Sign in to <strong>admin.goto.com</strong> with your admin credentials.",
        "Navigate to <strong>Phone System → Phone Numbers</strong> and click <strong>+ Port Existing Numbers</strong>.",
        "Select the country/region, enter the numbers to port and confirm you own them.",
        "Choose a preferred port date (6–30 days out) or leave blank to request the earliest available date.",
        "Fill in the current provider details: carrier name, account number/BTN, service address, authorized name, and PIN if your current provider requires one.",
        "Upload a recent bill or CSR for verification (recommended) and confirm your account is in good standing (no freezes).",
        "Submit the order and track status under <strong>Port Orders</strong>. Use temporary numbers for call forwarding and outbound CNAM while waiting.",
        "On the FOC date, expect a business‑day cutover with a 0–3 hour window; test calls and then notify your old carrier that you’ve ported."
      ],
    },
    {
      key: "msteams",
      name: "Microsoft Teams (Calling Plans)",
      summary: "Port via Teams Admin (wizard). US can pick cutover time (8 AM–8 PM ET). Canada & US toll‑free default 11:30 AM ET. Port‑out PIN is 10 digits.",
      portal: "Teams Admin → Voice → Phone numbers → Port",
      contact: "TNS Service Desk for large/complex or manual orders",
      timing: "US local: schedule 8 AM–8 PM ET; CA & US Toll‑free: 11:30 AM ET default",
      docs: ["e‑LOA/LOA", "Account #", "Service address", "Authorized name", "PIN for mobile", "Recent bill/CSR (if needed)"],
      links: [
        { label: "Microsoft – Create a port order (country tabs)", href: "https://learn.microsoft.com/en-us/microsoftteams/phone-number-calling-plans/transfer-phone-numbers-to-teams" },
        { label: "Microsoft – Port order overview & scheduling", href: "https://learn.microsoft.com/en-ca/microsoftteams/phone-number-calling-plans/port-order-overview" },
        { label: "Microsoft – Troubleshoot port order rejections", href: "https://learn.microsoft.com/en-us/troubleshoot/microsoftteams/phone-system/issues-with-port-orders" },
      ],
      steps: [
        "Sign in to the <strong>Teams Admin Center</strong> with a Phone System admin role.",
        "Go to <strong>Voice → Phone numbers</strong>, then choose <strong>Port</strong> to start a new port order.",
        "Select the country/region (US or Canada), the type of numbers (user/service), and whether it’s a full or partial port.",
        "Enter the list of phone numbers to port and the Billing Telephone Number (BTN).",
        "Provide current provider details: carrier name, account number, service address, authorized user, and PIN for any mobile numbers.",
        "Choose a preferred port date and time (US local numbers: 8 AM–8 PM ET; CA & US toll‑free default 11:30 AM ET) and sign the LOA electronically.",
        "Submit the order; Microsoft will validate and send it to the losing carrier. Monitor status in <strong>Voice → Port orders</strong>.",
        "On the confirmed date/time, verify that inbound and outbound calls work in Teams. Then cancel your old service as needed."
      ],
    },
    {
      key: "8x8",
      name: "8x8",
      summary: "Portal‑driven with temp numbers auto‑assigned. Typical minimums: 7 biz days (1–49), 15 biz days (50+), toll‑free ≈ 3 biz days. Port‑out may require CSR & carrier‑specific PIN.",
      portal: "8x8 Admin Console → Phone Numbers → Port",
      contact: "8x8 Porting team via support case",
      timing: "Business days; scheduled start time provided; brief (≈15–30 min) activation window",
      docs: ["LOA/e‑LOA", "Account #", "Service address", "Authorized name", "Wireless/VoIP PIN (if applicable)", "Recent bill/CSR (often helpful)"],
      links: [
        { label: "8x8 – Number Porting Typical Lead Times", href: "https://support-portal.8x8.com/helpcenter/viewArticle.html?d=801bcadd-b42a-4495-9720-a5f035e67969&hl=en" },
        { label: "8x8 – What time will my numbers port?", href: "https://support-portal.8x8.com/helpcenter/viewArticle.html?c=1_40_65_68_7594_&d=f62cd321-1b4f-40c8-b546-e37e4024c28d&hl=en" },
      ],
      steps: [
        "Log in to the <strong>8x8 Admin Console</strong> as an administrator.",
        "Navigate to <strong>Home → Phone Numbers</strong> and click <strong>Port</strong> (or <strong>Port Phone Numbers</strong>).",
        "Enter the numbers you wish to port and select the country/region and port type (local or toll‑free).",
        "Supply your current provider’s details: carrier name, account number, service address, authorized name, and any PIN/passcode if applicable.",
        "Attach a recent bill or CSR if requested, then specify your preferred port date. 8x8 assigns temporary numbers for call forwarding and outbound caller ID while you wait.",
        "Submit the order and monitor the case via the 8x8 support portal. Respond promptly if they request additional documentation.",
        "On the scheduled day, expect a brief cutover window (15–30 min) during business hours. Test the numbers once they appear in your 8x8 account and then notify the losing carrier of completion."
      ],
    },
    {
      key: "zoom",
      name: "Zoom Phone",
      summary: "Portal LOA wizard; simple ports <100 via portal; 100+ as project ports. US/CA cutover fixed at 11:30 AM ET. Port‑out uses Zoom Port‑out PIN.",
      portal: "Zoom Admin → Phone System Mgmt → Number Mgmt → Add → Port Number",
      contact: "Zoom Porting (ticket) for project/complex",
      timing: "US/CA: 11:30 AM ET (Mon–Fri)",
      docs: ["LOA (online)", "Account # (esp. wireless)", "Service address", "Authorized name", "PIN for wireless/Zoom port‑out", "Recent bill/CSR (if needed)"],
      links: [
        { label: "Zoom – Request a number port (US/CA/PR)", href: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0062348" },
        { label: "Zoom – Toll‑free porting (US/CA)", href: "https://support.zoom.com/hc/en/article?id=zm_kb&sysparm_article=KB0064099" },
      ],
      steps: [
        "Sign in to the <strong>Zoom web portal</strong> as a phone system admin.",
        "Navigate to <strong>Phone System Management → Number Management → Phone Numbers</strong>.",
        "Click <strong>Add</strong> and select <strong>Port Number</strong>. Enter the numbers you wish to port and click <strong>Check Portability</strong>.",
        "Fill out the online LOA form: enter your Billing Telephone Number, company name, authorized name, service address, current account number, and PIN/passcode for wireless lines.",
        "Optionally specify a Customer Requested Date (CRD) or leave blank for the earliest date. Attach a recent bill/CSR if needed and submit the request.",
        "Monitor the port status under <strong>Phone Numbers → Port History</strong>. Zoom will confirm the FOC date. Assign the porting numbers to users/sites in advance.",
        "On port day (11:30 AM ET for US/CA), test inbound and outbound calls. Once complete, cancel service with the losing carrier and update emergency settings if necessary."
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // Scheduling cheat sheet definitions
  const scheduleCheats = [
    {
      title: "Zoom Phone (US/CA)",
      bullets: [
        "Fixed cutover at 11:30 AM Eastern (Mon–Fri).",
        "Assign numbers to users/sites in advance.",
        "Large ports (>100) handled as project ports.",
      ],
    },
    {
      title: "Microsoft Teams",
      bullets: [
        "US local: choose 8 AM–8 PM Eastern.",
        "Canada & US toll‑free: default 11:30 AM Eastern (request changes via support).",
        "Avoid late‑day cutovers.",
      ],
    },
    {
      title: "RingCentral",
      bullets: [
        "Cutovers typically AM (≈8–9 AM PT / 11–12 ET).",
        "Track in Phone Numbers → Transfer Orders.",
        "Project ports for >100 numbers.",
      ],
    },
    {
      title: "GoTo Connect",
      bullets: [
        "Pick a preferred date (6–30 days out).",
        "Business‑day cutovers; 0–3 hr window typical.",
        "Set Port‑out Passcode for future portability.",
      ],
    },
    {
      title: "8x8",
      bullets: [
        "Scheduled start time provided; brief 15–30 min activation window.",
        "Temp numbers auto‑assigned pre‑port.",
        "CSR often recommended for port‑outs.",
      ],
    },
  ];

  // ---------------------------------------------------------------------------
  // Utility: fuzzy scoring for search
  function fuzzyScore(query, haystack) {
    const tokens = query.toLowerCase().split(/\s+/).filter(Boolean);
    let score = 0;
    for (const token of tokens) {
      if (haystack.includes(token)) score += 2;
    }
    if (haystack.includes(query.toLowerCase())) score += 3;
    return score;
  }

  // ---------------------------------------------------------------------------
  // Render icons into the static layout
  function insertStaticIcons() {
    const mappings = [
      { id: "iconPhone", icon: icons.phone },
      { id: "iconSearch", icon: icons.search },
      { id: "iconShield", icon: icons.shield },
      { id: "iconFile", icon: icons.file },
      { id: "iconClock", icon: icons.clock },
    ];
    mappings.forEach(({ id, icon }) => {
      const el = document.getElementById(id);
      if (el) el.innerHTML = icon;
    });
  }

  // ---------------------------------------------------------------------------
  // Search handling
  function setupSearch() {
    const input = document.getElementById("searchInput");
    const resultsContainer = document.getElementById("searchResults");
    function performSearch(value) {
      const query = value.trim();
      // hide results if nothing typed
      if (query === "") {
        resultsContainer.classList.remove("visible");
        resultsContainer.innerHTML = "";
        return;
      }
      const haystacks = knowledgeBase.map(item => ({ item, hay: (item.q + " " + item.a + " " + item.tags.join(" ")).toLowerCase() }));
      const results = [];
      haystacks.forEach(({ item, hay }) => {
        const score = fuzzyScore(query, hay);
        if (score > 0) results.push({ item, score });
      });
      results.sort((a, b) => b.score - a.score);
      resultsContainer.innerHTML = "";
      resultsContainer.classList.add("visible");
      if (results.length === 0) {
        const div = document.createElement("div");
        div.className = "result‑item";
        div.textContent = "No results. Try provider names (Zoom, 8x8, RingCentral, GoTo, Teams) or keywords like PIN, LOA, CSR, timing.";
        resultsContainer.appendChild(div);
        return;
      }
      results.forEach(({ item }) => {
        const wrapper = document.createElement("div");
        wrapper.className = "result‑item";
        const q = document.createElement("div");
        q.className = "result‑question";
        q.textContent = item.q;
        const a = document.createElement("div");
        a.className = "result‑answer";
        a.textContent = item.a;
        wrapper.appendChild(q);
        wrapper.appendChild(a);
        resultsContainer.appendChild(wrapper);
      });
    }
    input.addEventListener("input", () => performSearch(input.value));
  }

  // ---------------------------------------------------------------------------
  // Providers rendering and toggle
  function setupProviders() {
    const list = document.getElementById("providerList");
    let openKey = null;
    // helper to toggle open state
    function updateOpenState(key) {
      openKey = (openKey === key ? null : key);
      providers.forEach(provider => {
        const body = document.querySelector(`.provider‑card[data-key="${provider.key}"] .provider‑body`);
        const toggle = document.querySelector(`.provider‑card[data-key="${provider.key}"] .provider‑toggle`);
        if (body && toggle) {
          if (provider.key === openKey) {
            body.classList.add("open");
            toggle.innerHTML = icons.chevronUp;
          } else {
            body.classList.remove("open");
            toggle.innerHTML = icons.chevronDown;
          }
        }
      });
    }
    providers.forEach(provider => {
      const card = document.createElement("div");
      card.className = "provider‑card";
      card.dataset.key = provider.key;

      // Header
      const header = document.createElement("div");
      header.className = "provider‑header";
      header.addEventListener("click", () => updateOpenState(provider.key));

      // Info container (icon + texts)
      const info = document.createElement("div");
      info.className = "provider‑info";
      const iconDiv = document.createElement("div");
      iconDiv.className = "provider‑info‑icon";
      iconDiv.innerHTML = icons.info;
      const textDiv = document.createElement("div");
      const title = document.createElement("div");
      title.className = "provider‑info‑title";
      title.textContent = provider.name;
      const summary = document.createElement("div");
      summary.className = "provider‑info‑summary";
      summary.textContent = provider.summary;
      textDiv.appendChild(title);
      textDiv.appendChild(summary);
      info.appendChild(iconDiv);
      info.appendChild(textDiv);
      header.appendChild(info);

      // Toggle
      const toggle = document.createElement("div");
      toggle.className = "provider‑toggle";
      toggle.innerHTML = icons.chevronDown;
      header.appendChild(toggle);

      card.appendChild(header);

      // Body
      const body = document.createElement("div");
      body.className = "provider‑body";

      // Where to do it
      const portalRow = document.createElement("div");
      portalRow.className = "row";
      const portalLabel = document.createElement("div");
      portalLabel.className = "row‑label";
      portalLabel.textContent = "Where to do it";
      const portalValue = document.createElement("div");
      portalValue.className = "row‑value";
      portalValue.textContent = provider.portal;
      portalRow.appendChild(portalLabel);
      portalRow.appendChild(portalValue);
      body.appendChild(portalRow);

      // Support / contact
      const contactRow = document.createElement("div");
      contactRow.className = "row";
      const contactLabel = document.createElement("div");
      contactLabel.className = "row‑label";
      contactLabel.textContent = "Support";
      const contactValue = document.createElement("div");
      contactValue.className = "row‑value";
      contactValue.textContent = provider.contact;
      contactRow.appendChild(contactLabel);
      contactRow.appendChild(contactValue);
      body.appendChild(contactRow);

      // Timing
      const timingRow = document.createElement("div");
      timingRow.className = "row";
      const timingLabel = document.createElement("div");
      timingLabel.className = "row‑label";
      timingLabel.textContent = "Cutover timing";
      const timingValue = document.createElement("div");
      timingValue.className = "row‑value";
      timingValue.textContent = provider.timing;
      timingRow.appendChild(timingLabel);
      timingRow.appendChild(timingValue);
      body.appendChild(timingRow);

      // Docs
      const docsDiv = document.createElement("div");
      docsDiv.className = "docs";
      const docsTitle = document.createElement("div");
      docsTitle.className = "docs‑title";
      docsTitle.textContent = "Docs / Info Required";
      docsDiv.appendChild(docsTitle);
      const docsList = document.createElement("ul");
      provider.docs.forEach(doc => {
        const li = document.createElement("li");
        li.textContent = doc;
        docsList.appendChild(li);
      });
      docsDiv.appendChild(docsList);
      body.appendChild(docsDiv);

      // Steps section
      if (provider.steps && provider.steps.length > 0) {
        const stepsDiv = document.createElement("div");
        stepsDiv.className = "steps";
        const stepsTitle = document.createElement("div");
        stepsTitle.className = "steps‑title";
        stepsTitle.textContent = "Step‑by‑Step Guide";
        stepsDiv.appendChild(stepsTitle);
        const ol = document.createElement("ol");
        provider.steps.forEach(stepText => {
          const li = document.createElement("li");
          // Steps may include bold navigation paths or other simple markup
          li.innerHTML = stepText;
          ol.appendChild(li);
        });
        stepsDiv.appendChild(ol);
        body.appendChild(stepsDiv);
      }

      // Links
      if (provider.links && provider.links.length > 0) {
        const linksSection = document.createElement("div");
        linksSection.className = "links";
        const linksTitle = document.createElement("div");
        linksTitle.className = "links‑title";
        const linkIconSpan = document.createElement("span");
        linkIconSpan.innerHTML = icons.link;
        linksTitle.appendChild(linkIconSpan);
        const ltText = document.createElement("span");
        ltText.textContent = "Official links";
        linksTitle.appendChild(ltText);
        linksSection.appendChild(linksTitle);
        const chipsDiv = document.createElement("div");
        chipsDiv.className = "link‑chips";
        provider.links.forEach(link => {
          const chip = document.createElement("a");
          chip.className = "chip";
          chip.href = link.href;
          chip.target = "_blank";
          chip.rel = "noopener noreferrer";
          const spanLabel = document.createElement("span");
          spanLabel.textContent = link.label;
          chip.appendChild(spanLabel);
          const extIcon = document.createElement("span");
          extIcon.innerHTML = icons.externalLink;
          chip.appendChild(extIcon);
          chipsDiv.appendChild(chip);
        });
        linksSection.appendChild(chipsDiv);
        body.appendChild(linksSection);
      }

      card.appendChild(body);
      list.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // Scheduling cheat sheet rendering
  function setupSchedule() {
    const list = document.getElementById("scheduleList");
    scheduleCheats.forEach(item => {
      const card = document.createElement("div");
      card.className = "schedule‑card";
      const title = document.createElement("div");
      title.className = "schedule‑card‑title";
      title.textContent = item.title;
      card.appendChild(title);
      const ul = document.createElement("ul");
      item.bullets.forEach(bul => {
        const li = document.createElement("li");
        li.textContent = bul;
        ul.appendChild(li);
      });
      card.appendChild(ul);
      list.appendChild(card);
    });
  }

  // ---------------------------------------------------------------------------
  // Initialise everything after DOM content loaded
  document.addEventListener("DOMContentLoaded", () => {
    insertStaticIcons();
    setupSearch();
    setupProviders();
    setupSchedule();
  });
})();