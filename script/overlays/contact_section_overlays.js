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
                <a class="closeButton"><span class="material-symbols-outlined"> close </span></a>
                <div class="formSection">
                  <input type="text" placeholder="Name" class="formInput" requiered/>
                  <input type="email" placeholder="Email" class="formInput" requiered/>
                  <input type="tel" placeholder="Phone" class="formInput" requiered/>
                </div>
                <div class="formButtons">
                  <button type="button" class="cancelButton">Cancel</button>
                  <button type="button" class="createContactButton">Create contact</button>
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
