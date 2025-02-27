/**
 * Displays the "Add Contact" overlay.
 *
 * @returns {string} HTML string of the "Add Contact" overlay.
 */
function showAddContactOverlay() {
  return `
    
<div class="addContactOverlay">
  <div class="addContactLeftSide">
    <div class="leftSideContentWrapper">
      <div class="logoContainer">
        <img src="/assets/img/joinLogoSmall.png" class="joinLogoSmall" />
      </div>
      <div class="addContactHeadline">
        <h1>Add contact</h1>
        <p>Tasks are better with a team!</p>
        <div class="blueUnderline"></div>
      </div>
    </div>
  </div>
  <div class="editContactRightSide">
    <div class="rightSideContentWrapper">
      <div class="contactPicture">
        <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g filter="url(#filter0_d_576_4825)">
            <rect x="7" y="7" width="120" height="120" rx="60" fill="white" />
            <rect x="5.5" y="5.5" width="123" height="123" rx="61.5" stroke="white" stroke-width="3" />
            <circle cx="67" cy="67" r="60" fill="#D1D1D1" />
            <mask id="mask0_576_4825" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="35" y="35" width="64" height="64">
              <rect x="35" y="35" width="64" height="64" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_576_4825)">
              <path
                d="M67.0001 67.0001C64.0667 67.0001 61.5556 65.9556 59.4667 63.8667C57.3779 61.7779 56.3334 59.2667 56.3334 56.3334C56.3334 53.4001 57.3779 50.889 59.4667 48.8001C61.5556 46.7112 64.0667 45.6667 67.0001 45.6667C69.9334 45.6667 72.4445 46.7112 74.5334 48.8001C76.6223 50.889 77.6667 53.4001 77.6667 56.3334C77.6667 59.2667 76.6223 61.7779 74.5334 63.8667C72.4445 65.9556 69.9334 67.0001 67.0001 67.0001ZM83.0001 88.3334H51.0001C49.5334 88.3334 48.2779 87.8112 47.2334 86.7668C46.189 85.7223 45.6667 84.4668 45.6667 83.0001V80.8667C45.6667 79.3556 46.0556 77.9667 46.8334 76.7001C47.6112 75.4334 48.6445 74.4667 49.9334 73.8001C52.689 72.4223 55.489 71.389 58.3334 70.7001C61.1779 70.0112 64.0667 69.6667 67.0001 69.6667C69.9334 69.6667 72.8223 70.0112 75.6667 70.7001C78.5112 71.389 81.3112 72.4223 84.0667 73.8001C85.3556 74.4667 86.389 75.4334 87.1667 76.7001C87.9445 77.9667 88.3334 79.3556 88.3334 80.8667V83.0001C88.3334 84.4668 87.8112 85.7223 86.7668 86.7668C85.7223 87.8112 84.4668 88.3334 83.0001 88.3334ZM51.0001 83.0001H83.0001V80.8667C83.0001 80.3779 82.8779 79.9334 82.6334 79.5334C82.389 79.1334 82.0667 78.8223 81.6667 78.6001C79.2668 77.4001 76.8445 76.5001 74.4001 75.9001C71.9556 75.3001 69.489 75.0001 67.0001 75.0001C64.5112 75.0001 62.0445 75.3001 59.6001 75.9001C57.1556 76.5001 54.7334 77.4001 52.3334 78.6001C51.9334 78.8223 51.6112 79.1334 51.3667 79.5334C51.1223 79.9334 51.0001 80.3779 51.0001 80.8667V83.0001ZM67.0001 61.6667C68.4667 61.6667 69.7223 61.1445 70.7668 60.1001C71.8112 59.0556 72.3334 57.8001 72.3334 56.3334C72.3334 54.8667 71.8112 53.6112 70.7668 52.5667C69.7223 51.5223 68.4667 51.0001 67.0001 51.0001C65.5334 51.0001 64.2779 51.5223 63.2334 52.5667C62.189 53.6112 61.6667 54.8667 61.6667 56.3334C61.6667 57.8001 62.189 59.0556 63.2334 60.1001C64.2779 61.1445 65.5334 61.6667 67.0001 61.6667Z"
                fill="white"
              />
            </g>
          </g>
          <defs>
            <filter id="filter0_d_576_4825" x="0" y="0" width="134" height="134" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
              <feFlood flood-opacity="0" result="BackgroundImageFix" />
              <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
              <feOffset />
              <feGaussianBlur stdDeviation="2" />
              <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
              <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_576_4825" />
              <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_576_4825" result="shape" />
            </filter>
          </defs>
        </svg>
      </div>
      <div class="contactForm">
        <div class="closeButton">
          <a onclick="closeAddContactOverlay()"
            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274405_5666)">
                <path
                  d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                  fill="#2A3647"
                />
              </g></svg
          ></a>
        </div>

        <div class="formSection">
          <div>
            <input type="text" id="name" placeholder="Name" class="formInput" requiered />
            <svg class="nameIcon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_274969_2511" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274969_2511)">
                <path
                  d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                  fill="#A8A8A8"
                />
              </g>
            </svg>
            <p id="errorMsgName" class="errorMsgName"></p>
          </div>

          <div>
            <input type="email" id="email" placeholder="Email" class="formInput" requiered /><svg
              class="mailIcon"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0_274969_2518" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274969_2518)">
                <path
                  d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                  fill="#A8A8A8"
                />
              </g>
            </svg>
            <p id="errorMsgEmail" class="errorMsgEmail"></p>
          </div>

          <div>
            <input type="tel" id="phone" placeholder="Phone" class="formInput" requiered /><svg
              class="phoneIcon"
              width="24"
              height="25"
              viewBox="0 0 24 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <mask id="mask0_274969_2525" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274969_2525)">
                <path
                  d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                  fill="#A8A8A8"
                />
              </g>
            </svg>
            <p id="errorMsgPhone" class="errorMsgPhone"></p>
            <p id="errorMsgContactExist" class="errorMsgContactExist"></p>
          </div>
        </div>

        <div class="formButtons">
          <button type="button" class="cancelButton" onclick="closeAddContactOverlay()">
            <p>Cancel</p>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274405_5666)">
                <path
                  d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                  fill="#2A3647"
                />
              </g>
            </svg>
          </button>
          <button disabled type="button" class="createContactButton" onclick="createContact()" id="createContactBtn">
            <p>Create contact</p>
            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_274969_4267" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274969_4267)">
                <path
                  d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                  fill="white"
                />
              </g>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
    
    `;
}

/**
 * Displays the "Add Contact" overlay for mobile view.
 *
 * @returns {string} HTML string of the mobile "Add Contact" overlay.
 */
function showAddContactOverlayMobile() {
  return `
    
<div class="addContactMobileWrapper">
  <div class="blueBackground">
    <div class="closeButtonMobile">
      <a onclick="closeAddContactOverlayMobile()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_274405_5666)">
            <path
              d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
              fill="#2A3647"
            />
          </g>
        </svg>
      </a>
    </div>

    <div class="headlineMobile">
      <h2>Add contact</h2>
      <p class="headlineText">Tasks are better with a team !</p>
      <div class="dividerMobile"></div>
    </div>
  </div>

  <div class="profilePictureMobile">
    <svg width="134" height="134" viewBox="0 0 134 134" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g filter="url(#filter0_d_576_4825)">
        <rect x="7" y="7" width="120" height="120" rx="60" fill="white" />
        <rect x="5.5" y="5.5" width="123" height="123" rx="61.5" stroke="white" stroke-width="3" />
        <circle cx="67" cy="67" r="60" fill="#D1D1D1" />
        <mask id="mask0_576_4825" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="35" y="35" width="64" height="64">
          <rect x="35" y="35" width="64" height="64" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_576_4825)">
          <path
            d="M67.0001 67.0001C64.0667 67.0001 61.5556 65.9556 59.4667 63.8667C57.3779 61.7779 56.3334 59.2667 56.3334 56.3334C56.3334 53.4001 57.3779 50.889 59.4667 48.8001C61.5556 46.7112 64.0667 45.6667 67.0001 45.6667C69.9334 45.6667 72.4445 46.7112 74.5334 48.8001C76.6223 50.889 77.6667 53.4001 77.6667 56.3334C77.6667 59.2667 76.6223 61.7779 74.5334 63.8667C72.4445 65.9556 69.9334 67.0001 67.0001 67.0001ZM83.0001 88.3334H51.0001C49.5334 88.3334 48.2779 87.8112 47.2334 86.7668C46.189 85.7223 45.6667 84.4668 45.6667 83.0001V80.8667C45.6667 79.3556 46.0556 77.9667 46.8334 76.7001C47.6112 75.4334 48.6445 74.4667 49.9334 73.8001C52.689 72.4223 55.489 71.389 58.3334 70.7001C61.1779 70.0112 64.0667 69.6667 67.0001 69.6667C69.9334 69.6667 72.8223 70.0112 75.6667 70.7001C78.5112 71.389 81.3112 72.4223 84.0667 73.8001C85.3556 74.4667 86.389 75.4334 87.1667 76.7001C87.9445 77.9667 88.3334 79.3556 88.3334 80.8667V83.0001C88.3334 84.4668 87.8112 85.7223 86.7668 86.7668C85.7223 87.8112 84.4668 88.3334 83.0001 88.3334ZM51.0001 83.0001H83.0001V80.8667C83.0001 80.3779 82.8779 79.9334 82.6334 79.5334C82.389 79.1334 82.0667 78.8223 81.6667 78.6001C79.2668 77.4001 76.8445 76.5001 74.4001 75.9001C71.9556 75.3001 69.489 75.0001 67.0001 75.0001C64.5112 75.0001 62.0445 75.3001 59.6001 75.9001C57.1556 76.5001 54.7334 77.4001 52.3334 78.6001C51.9334 78.8223 51.6112 79.1334 51.3667 79.5334C51.1223 79.9334 51.0001 80.3779 51.0001 80.8667V83.0001ZM67.0001 61.6667C68.4667 61.6667 69.7223 61.1445 70.7668 60.1001C71.8112 59.0556 72.3334 57.8001 72.3334 56.3334C72.3334 54.8667 71.8112 53.6112 70.7668 52.5667C69.7223 51.5223 68.4667 51.0001 67.0001 51.0001C65.5334 51.0001 64.2779 51.5223 63.2334 52.5667C62.189 53.6112 61.6667 54.8667 61.6667 56.3334C61.6667 57.8001 62.189 59.0556 63.2334 60.1001C64.2779 61.1445 65.5334 61.6667 67.0001 61.6667Z"
            fill="white"
          />
        </g>
      </g>
      <defs>
        <filter id="filter0_d_576_4825" x="0" y="0" width="134" height="134" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
          <feFlood flood-opacity="0" result="BackgroundImageFix" />
          <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0" result="hardAlpha" />
          <feOffset />
          <feGaussianBlur stdDeviation="2" />
          <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.1 0" />
          <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow_576_4825" />
          <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow_576_4825" result="shape" />
        </filter>
      </defs>
    </svg>
  </div>

  <div class="whiteBackground">
    <div class="formInputMobile">
      <input type="text" id="nameMobile" placeholder="Name" requiered />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="nameIconMobile">
        <mask id="mask0_274969_2511" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2511)">
          <path
            d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgNameMobile" class="errorMsgNameMobile"></p>
      <input type="email" id="emailMobile" placeholder="Email" requiered />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="emailIconMobile">
        <mask id="mask0_274969_2518" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2518)">
          <path
            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgEmailMobile" class="errorMsgEmailMobile"></p>
      <input type="tel" id="phoneMobile" placeholder="Phone" requiered />
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="phoneIconMobile">
        <mask id="mask0_274969_2525" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
          <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2525)">
          <path
            d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgPhoneMobile" class="errorMsgPhoneMobile"></p>
      <p id="errorMsgContactExistMobile" class="errorMsgContactExistMobile"></p>
    </div>

    <div class="createdContactContainerMobile">
      <button disabled type="button" class="createContactButton" onclick="createContact()" id="createContactBtn">
        <p>Create contact</p>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_274969_4267" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_274969_4267)">
            <path
              d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
              fill="white"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</div>
    
    `;
}

/**
 * Displays the "Edit Contact" overlay for desktop view.
 *
 * @param {string} initials - Initials for the contact's profile picture.
 * @param {string} color - Background color for the profile picture.
 * @returns {string} HTML string of the "Edit Contact" overlay.
 */
function showEditContactOverlay(initials, color) {
  return `
    
<div class="editContactOverlay">
  <div class="editContactLeftSide">
    <div class="leftSideContentWrapper">
      <div class="logoContainer">
        <img src="/assets/img/joinLogoSmall.png" class="joinLogoSmall" />
      </div>
      <div class="editContactHeadline">
        <h1>Edit contact</h1>
        <div class="blueUnderline"></div>
      </div>
    </div>
  </div>
  <div class="editContactRightSide">
    <div class="rightSideContentWrapper">
      <div class="closeContainer">
        <a
          ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_274405_5666)">
              <path
                d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                fill="#2A3647"
              />
            </g></svg
        ></a>
      </div>
      <div class="contactPicture">
        <div class="customProfilePictureBig" style="background-color: ${color};">
          <span>${initials}</span>
        </div>
      </div>
      <div class="contactForm">
        <div class="closeButton">
          <a onclick="closeEditContactOverlay()"
            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_274405_5666)">
                <path
                  d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
                  fill="#2A3647"
                />
              </g></svg
          ></a>
        </div>

        <div class="formSection">
          <form>
            <div>
              <input type="text" placeholder="Name" class="formInput" id="contactName" requiered value="${currentlyViewedUser.name}" />
              <svg class="nameIconEditOverlay" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_274969_2511" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_274969_2511)">
                  <path
                    d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
                    fill="#A8A8A8"
                  />
                </g>
              </svg>
              <p id="errorMsgEditContactName" class="errorMsgEditContact"></p>
            </div>

            <div>
              <input type="email" placeholder="Email" class="formInput" id="contactEmail" required value="${currentlyViewedUser.email}" />
              <svg class="mailIconEditOverlay" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_274969_2518" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                  <rect width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_274969_2518)">
                  <path
                    d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
                    fill="#A8A8A8"
                  />
                </g>
              </svg>
              <p id="errorMsgEditContactEmail" class="errorMsgEditContact"></p>
            </div>

            <div>
              <input type="tel" placeholder="Phone" class="formInput" id="contactPhone" required value="${currentlyViewedUser.phone}" />
              <svg class="phoneIconEditOverlay" width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_274969_2525" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
                  <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                </mask>
                <g mask="url(#mask0_274969_2525)">
                  <path
                    d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
                    fill="#A8A8A8"
                  />
                </g>
              </svg>
              <p id="errorMsgEditContactPhone" class="errorMsgEditContact"></p>
            </div>

            <div class="formButtons">
              <button type="button" class="deleteButton" onclick="deleteContact()"><p>Delete</p></button>
              <button type="button" class="saveContactButton" id="saveButton" onclick="updateContactData('${currentlyViewedUser.contactId}')">
                <p>Save</p>
                <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask0_274969_4267" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                    <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
                  </mask>
                  <g mask="url(#mask0_274969_4267)">
                    <path
                      d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
                      fill="white"
                    />
                  </g>
                </svg>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>

    `;
}

/**
 * Displays the "Edit Contact" overlay for mobile view.
 *
 * @param {string} initials - Initials for the contact's profile picture.
 * @param {string} color - Background color for the profile picture.
 * @returns {string} HTML string of the mobile "Edit Contact" overlay.
 */
function showEditContactOverlayMobile(initials, color) {
  return `
    
<div class="editContactMobileWrapper">
  <div class="blueBackgroundEdit">
    <div class="closeButtonMobile">
      <a onclick="closeEditContactOverlayMobile()">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_274405_5666" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_274405_5666)">
            <path
              d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z"
              fill="#2A3647"
            />
          </g>
        </svg>
      </a>
    </div>

    <div class="headlineMobile">
      <h2>Edit contact</h2>
      <div class="dividerMobile"></div>
    </div>
  </div>

  <div class="profilePictureMobileEdit">
    <div class="customProfilePictureBig" style="background-color: ${color};">
      <span>${initials}</span>
    </div>
  </div>

  <div class="whiteBackgroundEdit">
    <div class="formInputMobile">
      <input type="text" placeholder="Name" class="formInput" id="contactNameMobile" value="${currentlyViewedUser.name}" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="nameIconMobileEdit">
        <mask id="mask0_274969_2511" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2511)">
          <path
            d="M12 12C10.9 12 9.95833 11.6083 9.175 10.825C8.39167 10.0417 8 9.1 8 8C8 6.9 8.39167 5.95833 9.175 5.175C9.95833 4.39167 10.9 4 12 4C13.1 4 14.0417 4.39167 14.825 5.175C15.6083 5.95833 16 6.9 16 8C16 9.1 15.6083 10.0417 14.825 10.825C14.0417 11.6083 13.1 12 12 12ZM18 20H6C5.45 20 4.97917 19.8042 4.5875 19.4125C4.19583 19.0208 4 18.55 4 18V17.2C4 16.6333 4.14583 16.1125 4.4375 15.6375C4.72917 15.1625 5.11667 14.8 5.6 14.55C6.63333 14.0333 7.68333 13.6458 8.75 13.3875C9.81667 13.1292 10.9 13 12 13C13.1 13 14.1833 13.1292 15.25 13.3875C16.3167 13.6458 17.3667 14.0333 18.4 14.55C18.8833 14.8 19.2708 15.1625 19.5625 15.6375C19.8542 16.1125 20 16.6333 20 17.2V18C20 18.55 19.8042 19.0208 19.4125 19.4125C19.0208 19.8042 18.55 20 18 20ZM6 18H18V17.2C18 17.0167 17.9542 16.85 17.8625 16.7C17.7708 16.55 17.65 16.4333 17.5 16.35C16.6 15.9 15.6917 15.5625 14.775 15.3375C13.8583 15.1125 12.9333 15 12 15C11.0667 15 10.1417 15.1125 9.225 15.3375C8.30833 15.5625 7.4 15.9 6.5 16.35C6.35 16.4333 6.22917 16.55 6.1375 16.7C6.04583 16.85 6 17.0167 6 17.2V18ZM12 10C12.55 10 13.0208 9.80417 13.4125 9.4125C13.8042 9.02083 14 8.55 14 8C14 7.45 13.8042 6.97917 13.4125 6.5875C13.0208 6.19583 12.55 6 12 6C11.45 6 10.9792 6.19583 10.5875 6.5875C10.1958 6.97917 10 7.45 10 8C10 8.55 10.1958 9.02083 10.5875 9.4125C10.9792 9.80417 11.45 10 12 10Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgEditContactNameMobile" class="errorMsgEditContact"></p>
      <input type="email" placeholder="Email" class="formInput" id="contactEmailMobile" required value="${currentlyViewedUser.email}" />
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="emailIconMobileEdit">
        <mask id="mask0_274969_2518" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2518)">
          <path
            d="M4 20C3.45 20 2.97917 19.8042 2.5875 19.4125C2.19583 19.0208 2 18.55 2 18V6C2 5.45 2.19583 4.97917 2.5875 4.5875C2.97917 4.19583 3.45 4 4 4H20C20.55 4 21.0208 4.19583 21.4125 4.5875C21.8042 4.97917 22 5.45 22 6V18C22 18.55 21.8042 19.0208 21.4125 19.4125C21.0208 19.8042 20.55 20 20 20H4ZM20 8L12.525 12.675C12.4417 12.725 12.3542 12.7625 12.2625 12.7875C12.1708 12.8125 12.0833 12.825 12 12.825C11.9167 12.825 11.8292 12.8125 11.7375 12.7875C11.6458 12.7625 11.5583 12.725 11.475 12.675L4 8V18H20V8ZM12 11L20 6H4L12 11ZM4 8.25V6.775V6.8V6.7875V8.25Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgEditContactEmailMobile" class="errorMsgEditContact"></p>
      <input type="tel" placeholder="Phone" class="formInput" id="contactPhoneMobile" required value="${currentlyViewedUser.phone}" />
      <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" class="phoneIconMobileEdit">
        <mask id="mask0_274969_2525" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="25">
          <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
        </mask>
        <g mask="url(#mask0_274969_2525)">
          <path
            d="M19.95 21.5C17.8667 21.5 15.8083 21.0458 13.775 20.1375C11.7417 19.2292 9.89167 17.9417 8.225 16.275C6.55833 14.6083 5.27083 12.7583 4.3625 10.725C3.45417 8.69167 3 6.63333 3 4.55C3 4.25 3.1 4 3.3 3.8C3.5 3.6 3.75 3.5 4.05 3.5H8.1C8.33333 3.5 8.54167 3.57917 8.725 3.7375C8.90833 3.89583 9.01667 4.08333 9.05 4.3L9.7 7.8C9.73333 8.06667 9.725 8.29167 9.675 8.475C9.625 8.65833 9.53333 8.81667 9.4 8.95L6.975 11.4C7.30833 12.0167 7.70417 12.6125 8.1625 13.1875C8.62083 13.7625 9.125 14.3167 9.675 14.85C10.1917 15.3667 10.7333 15.8458 11.3 16.2875C11.8667 16.7292 12.4667 17.1333 13.1 17.5L15.45 15.15C15.6 15 15.7958 14.8875 16.0375 14.8125C16.2792 14.7375 16.5167 14.7167 16.75 14.75L20.2 15.45C20.4333 15.5167 20.625 15.6375 20.775 15.8125C20.925 15.9875 21 16.1833 21 16.4V20.45C21 20.75 20.9 21 20.7 21.2C20.5 21.4 20.25 21.5 19.95 21.5ZM6.025 9.5L7.675 7.85L7.25 5.5H5.025C5.10833 6.18333 5.225 6.85833 5.375 7.525C5.525 8.19167 5.74167 8.85 6.025 9.5ZM14.975 18.45C15.625 18.7333 16.2875 18.9583 16.9625 19.125C17.6375 19.2917 18.3167 19.4 19 19.45V17.25L16.65 16.775L14.975 18.45Z"
            fill="#A8A8A8"
          />
        </g>
      </svg>
      <p id="errorMsgEditContactPhoneMobile" class="errorMsgEditContact"></p>
    </div>

    <div class="formButtonsMobile">
      <button type="button" class="deleteButton" onclick="deleteContact()"><p>Delete</p></button>
      <button type="button" class="saveContactButton" id="saveButton" onclick="updateContactData('${currentlyViewedUser.contactId}')">
        <p>Save</p>
        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
          <mask id="mask0_274969_4267" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
            <rect y="0.5" width="24" height="24" fill="#D9D9D9" />
          </mask>
          <g mask="url(#mask0_274969_4267)">
            <path
              d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z"
              fill="white"
            />
          </g>
        </svg>
      </button>
    </div>
  </div>
</div>

    `;
}

/**
 * Displays a floating contact overlay with contact details.
 *
 * @param {string} name - Contact's name.
 * @param {string} email - Contact's email.
 * @param {string} phone - Contact's phone number.
 * @param {string} initials - Initials for the profile picture.
 * @param {string} color - Background color for the profile picture.
 * @param {string} contactId - Unique identifier for the contact.
 * @returns {string} HTML string of the floating contact overlay.
 */
function showFloatingContactOverlay(name, email, phone, initials, color, contactId) {
  return `
  
 <div class="profileHeadSection">
  <div class="profileWrapper">
    <div class="customProfilePictureBig" style="background-color: ${color};">
      <span>${initials}</span>
    </div>
    <div class="profileInformation">
      <p>${name}</p>
      <div class="symbols">
        <div class="editIcon" onclick="openEditContact('${initials}', '${color}')">
          <a>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 24 24">
              <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
            </svg>
            <p>Edit</p>
          </a>
        </div>
        <div class="deleteIcon" onclick="deleteContact('${contactId}')">
          <a
            ><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <mask id="mask0_273251_1845" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9" />
              </mask>
              <g mask="url(#mask0_273251_1845)">
                <path
                  d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                  fill="#2A3647"
                />
              </g>
            </svg>
            <p>Delete</p></a
          >
        </div>
      </div>
    </div>
  </div>
  <div class="contactInformation">
    <p>Contact Information</p>
  </div>
  <div class="bottomPart">
    <p><b>Email</b></p>
    <p class="blue">${email}</p>
    <p><b>Phone</b></p>
    <p>${phone}</p>
  </div>
</div>
  
  `;
}

/**
 * Displays a floating contact overlay for mobile view.
 *
 * @param {string} name - Contact's name.
 * @param {string} email - Contact's email.
 * @param {string} phone - Contact's phone number.
 * @param {string} initials - Initials for the profile picture.
 * @param {string} color - Background color for the profile picture.
 * @param {string} contactId - Unique identifier for the contact.
 * @returns {string} HTML string of the mobile floating contact overlay.
 */
function showFloatingContactOverlayMobile(name, email, phone, initials, color, contactId) {
  return `

<div class="detailedContactSectionMobile">
  <div class="topPart">
    <div class="headlineMobile">
      <h1>Contacts</h1>
      <p>Better with a team</p>
      <div class="dividerMobile"></div>
    </div>

    <a class="goBackArrow" href="/html/contact.html?active=contacts">
      <svg width="25" height="23" viewBox="0 0 25 23" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M6.00972 9.88554H23.1871C24.0362 9.88554 24.7246 10.5739 24.7246 11.4231C24.7246 12.2722 24.0362 12.9606 23.1871 12.9606H6.00972L13.17 20.1209C13.7704 20.7213 13.7704 21.6946 13.17 22.295C12.5697 22.8954 11.5963 22.8954 10.996 22.295L1.53824 12.8373C0.757188 12.0562 0.757188 10.7899 1.53824 10.0089L10.996 0.55115C11.5963 -0.0492049 12.5697 -0.0492048 13.17 0.55115C13.7704 1.1515 13.7704 2.12487 13.17 2.72523L6.00972 9.88554Z"
          fill="#29ABE2"
        /></svg
    ></a>
  </div>

  <div class="mobileFloatingContactWrapper">
    <div class="profileHeadSection">
      <div class="profileWrapper">
        <div class="customProfilePictureBig" style="background-color: ${color};">
          <span>${initials}</span>
        </div>
        <div class="profileInformation">
          <p class="contactNameBig">${name}</p>
        </div>
      </div>
      <div class="contactInformation">
        <p>Contact Information</p>
      </div>
      <div class="bottomPart">
        <p><b>Email</b></p>
        <p class="blue">${email}</p>
        <p><b>Phone</b></p>
        <p>${phone}</p>
      </div>
      <div class="responsiveEditContactButton" onclick="openMobileContactMenu('${initials}', '${color}', '${contactId}')">
        <svg width="6" height="22" viewBox="0 0 6 22" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M2.99967 21.6666C2.26634 21.6666 1.63856 21.4055 1.11634 20.8833C0.594119 20.361 0.333008 19.7333 0.333008 18.9999C0.333008 18.2666 0.594119 17.6388 1.11634 17.1166C1.63856 16.5944 2.26634 16.3333 2.99967 16.3333C3.73301 16.3333 4.36079 16.5944 4.88301 17.1166C5.40523 17.6388 5.66634 18.2666 5.66634 18.9999C5.66634 19.7333 5.40523 20.361 4.88301 20.8833C4.36079 21.4055 3.73301 21.6666 2.99967 21.6666ZM2.99967 13.6666C2.26634 13.6666 1.63856 13.4055 1.11634 12.8833C0.594119 12.361 0.333008 11.7333 0.333008 10.9999C0.333008 10.2666 0.594119 9.63881 1.11634 9.11659C1.63856 8.59436 2.26634 8.33325 2.99967 8.33325C3.73301 8.33325 4.36079 8.59436 4.88301 9.11659C5.40523 9.63881 5.66634 10.2666 5.66634 10.9999C5.66634 11.7333 5.40523 12.361 4.88301 12.8833C4.36079 13.4055 3.73301 13.6666 2.99967 13.6666ZM2.99967 5.66659C2.26634 5.66659 1.63856 5.40547 1.11634 4.88325C0.594119 4.36103 0.333008 3.73325 0.333008 2.99992C0.333008 2.26659 0.594119 1.63881 1.11634 1.11659C1.63856 0.594363 2.26634 0.333252 2.99967 0.333252C3.73301 0.333252 4.36079 0.594363 4.88301 1.11659C5.40523 1.63881 5.66634 2.26659 5.66634 2.99992C5.66634 3.73325 5.40523 4.36103 4.88301 4.88325C4.36079 5.40547 3.73301 5.66659 2.99967 5.66659Z"
            fill="white"
          />
        </svg>
      </div>
      <div id="mobileMenu"></div>
    </div>
  </div>
</div>

  `;
}

/**
 * Generates a mobile contact menu with edit and delete options.
 *
 * @param {string} initials - Initials for the profile picture.
 * @param {string} color - Background color for the profile picture.
 * @param {string} contactId - Unique identifier for the contact.
 * @returns {string} HTML string of the mobile contact menu.
 */
function showMobileContactMenu(initials, color, contactId) {
  return `
  
    <div class="openMobileContactMenuContainer">
       <div class="editContainer" onclick="openEditContactMobile('${initials}', '${color}')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_273251_3173" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_273251_3173)">
              <path
                d="M5 19H6.4L15.025 10.375L13.625 8.975L5 17.6V19ZM19.3 8.925L15.05 4.725L16.45 3.325C16.8333 2.94167 17.3042 2.75 17.8625 2.75C18.4208 2.75 18.8917 2.94167 19.275 3.325L20.675 4.725C21.0583 5.10833 21.2583 5.57083 21.275 6.1125C21.2917 6.65417 21.1083 7.11667 20.725 7.5L19.3 8.925ZM17.85 10.4L7.25 21H3V16.75L13.6 6.15L17.85 10.4Z"
                fill="#2A3647"
              />
            </g>
          </svg>
          <p>Edit</p>
        </div>

        <div class="deleteContainer" onclick="deleteContact('${contactId}')">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <mask id="mask0_273251_1845" style="mask-type: alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
              <rect width="24" height="24" fill="#D9D9D9" />
            </mask>
            <g mask="url(#mask0_273251_1845)">
              <path
                d="M7 21C6.45 21 5.97917 20.8042 5.5875 20.4125C5.19583 20.0208 5 19.55 5 19V6C4.71667 6 4.47917 5.90417 4.2875 5.7125C4.09583 5.52083 4 5.28333 4 5C4 4.71667 4.09583 4.47917 4.2875 4.2875C4.47917 4.09583 4.71667 4 5 4H9C9 3.71667 9.09583 3.47917 9.2875 3.2875C9.47917 3.09583 9.71667 3 10 3H14C14.2833 3 14.5208 3.09583 14.7125 3.2875C14.9042 3.47917 15 3.71667 15 4H19C19.2833 4 19.5208 4.09583 19.7125 4.2875C19.9042 4.47917 20 4.71667 20 5C20 5.28333 19.9042 5.52083 19.7125 5.7125C19.5208 5.90417 19.2833 6 19 6V19C19 19.55 18.8042 20.0208 18.4125 20.4125C18.0208 20.8042 17.55 21 17 21H7ZM7 6V19H17V6H7ZM9 16C9 16.2833 9.09583 16.5208 9.2875 16.7125C9.47917 16.9042 9.71667 17 10 17C10.2833 17 10.5208 16.9042 10.7125 16.7125C10.9042 16.5208 11 16.2833 11 16V9C11 8.71667 10.9042 8.47917 10.7125 8.2875C10.5208 8.09583 10.2833 8 10 8C9.71667 8 9.47917 8.09583 9.2875 8.2875C9.09583 8.47917 9 8.71667 9 9V16ZM13 16C13 16.2833 13.0958 16.5208 13.2875 16.7125C13.4792 16.9042 13.7167 17 14 17C14.2833 17 14.5208 16.9042 14.7125 16.7125C14.9042 16.5208 15 16.2833 15 16V9C15 8.71667 14.9042 8.47917 14.7125 8.2875C14.5208 8.09583 14.2833 8 14 8C13.7167 8 13.4792 8.09583 13.2875 8.2875C13.0958 8.47917 13 8.71667 13 9V16Z"
                fill="#2A3647"
              />
            </g>
          </svg>
          <p>Delete</p>
        </div>
      </div>
  
  `;
}

/**
 * Renders a contact template.
 *
 * @param {string} name - Contact's name.
 * @param {string} email - Contact's email.
 * @param {string} phone - Contact's phone number.
 * @param {string} contactId - Unique identifier for the contact.
 * @param {string} initials - Initials for the profile picture.
 * @param {string} color - Background color for the profile picture.
 * @returns {string} HTML string representing the contact.
 */
function renderContactTemplate(name, email, phone, contactId, initials, color) {
  return `

   <div class="contactBox">
  <div class="contact" onclick="openContact('${name}', '${email}', '${phone}', '${initials}', '${color}')" id="contact_${contactId}">
    <div class="customProfilePicture" style="background-color: ${color};">
      <span>${initials}</span>
    </div>
    <div class="personalInformationShort">
      <p class="userName" id="userName">${name}</p>
      <span class="blue smallText">${email}</span>
    </div>
  </div>
</div>

  `;
}
