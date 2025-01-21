function showEditContactOverlay() {
  return `
    
  <div class="editContactOverlay">
          <div class="editContactLeftSide">
            <div class="leftSideContentWrapper">
              <div class="logoContainer">
                <img src="/assets/img/join_logo_small.png" class="joinLogoSmall" />
              </div>
              <div class="editContactHeadline">
                <h1>Edit contact</h1>
                <div class="blueUnderline"></div>
              </div>
            </div>
          </div>
          <div class="editContactRightSide">
            <div class="rightSideContentWrapper">
              <div class="contactPicture">
                <img src="/assets/img/default_contact_picture.png" />
              </div>
              <div class="contactForm">
                <a class="closeButton"><span class="material-symbols-outlined"> close </span></a>
                <div class="formSection">
                  <input type="text" placeholder="Name" class="formInput" requiered/>
                  <input type="email" placeholder="Email" class="formInput" requiered/>
                  <input type="tel" placeholder="Phone" class="formInput" requiered/>
                </div>
                <div class="formButtons">
                  <button type="button" class="deleteButton">Delete</button>
                  <button type="button" class="saveButton">Save</button>
                </div>
              </div>
            </div>
          </div>
        </div>
    
    `;
}

function showAddContactOverlay() {
  return `
    
  <div class="addContactOverlay">
          <div class="addContactLeftSide">
            <div class="leftSideContentWrapper">
              <div class="logoContainer">
                <img src="/assets/img/join_logo_small.png" class="joinLogoSmall" />
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
                <img src="/assets/img/default_contact_picture.png" />
              </div>
              <div class="contactForm">
                <a class="closeButton"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_274405_5666" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_274405_5666)">
                <path d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                </g>
                </svg></a>
                <div class="formSection">
                  <input type="text" placeholder="Name" class="formInput" requiered/>
                  <input type="email" placeholder="Email" class="formInput" requiered/>
                  <input type="tel" placeholder="Phone" class="formInput" requiered/>
                </div>
                <div class="formButtons">
                  <button type="button" class="cancelButton"><p>Cancel</p><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_274405_5666" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
                <rect width="24" height="24" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_274405_5666)">
                <path d="M12 13.4L7.09999 18.3C6.91665 18.4834 6.68332 18.575 6.39999 18.575C6.11665 18.575 5.88332 18.4834 5.69999 18.3C5.51665 18.1167 5.42499 17.8834 5.42499 17.6C5.42499 17.3167 5.51665 17.0834 5.69999 16.9L10.6 12L5.69999 7.10005C5.51665 6.91672 5.42499 6.68338 5.42499 6.40005C5.42499 6.11672 5.51665 5.88338 5.69999 5.70005C5.88332 5.51672 6.11665 5.42505 6.39999 5.42505C6.68332 5.42505 6.91665 5.51672 7.09999 5.70005L12 10.6L16.9 5.70005C17.0833 5.51672 17.3167 5.42505 17.6 5.42505C17.8833 5.42505 18.1167 5.51672 18.3 5.70005C18.4833 5.88338 18.575 6.11672 18.575 6.40005C18.575 6.68338 18.4833 6.91672 18.3 7.10005L13.4 12L18.3 16.9C18.4833 17.0834 18.575 17.3167 18.575 17.6C18.575 17.8834 18.4833 18.1167 18.3 18.3C18.1167 18.4834 17.8833 18.575 17.6 18.575C17.3167 18.575 17.0833 18.4834 16.9 18.3L12 13.4Z" fill="#2A3647"/>
                </g>
                </svg></button>
                  <button type="button" class="createContactButton"><p>Create contact</p> <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
<mask id="mask0_274969_4267" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
<rect y="0.5" width="24" height="24" fill="#D9D9D9"/>
</mask>
<g mask="url(#mask0_274969_4267)">
<path d="M9.55057 15.65L18.0256 7.175C18.2256 6.975 18.4631 6.875 18.7381 6.875C19.0131 6.875 19.2506 6.975 19.4506 7.175C19.6506 7.375 19.7506 7.6125 19.7506 7.8875C19.7506 8.1625 19.6506 8.4 19.4506 8.6L10.2506 17.8C10.0506 18 9.81724 18.1 9.55057 18.1C9.28391 18.1 9.05057 18 8.85057 17.8L4.55057 13.5C4.35057 13.3 4.25474 13.0625 4.26307 12.7875C4.27141 12.5125 4.37557 12.275 4.57557 12.075C4.77557 11.875 5.01307 11.775 5.28807 11.775C5.56307 11.775 5.80057 11.875 6.00057 12.075L9.55057 15.65Z" fill="white"/>
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

function showFloatingContactOverlay() {
  return `
  
  <div class="profileHeadSection">
              <div class="profileWrapper">
                <img src="/assets/img/default_contact_picture.png" />
                <div class="profileInformation">
                  <p><span id="surname">XXXXX</span> <span id="lastname">XXXXX</span></p>
                  <div class="symbols">
                    <div class="editIcon">
                      <a>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#000000" viewBox="0 0 24 24">
                          <path
                            d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"
                          />
                        </svg>
                        <p>Edit</p>
                      </a>
                    </div>
                    <div class="deleteIcon">
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
                <p class="blue">XXXXX@gmail.com</p>
                <p><b>Phone</b></p>
                <p>+49 XXXX XXX XX X</p>
              </div>
            </div>
  
  `;
}

function renderContactTemplate() {
  return `
  
  
  
  `;
}
