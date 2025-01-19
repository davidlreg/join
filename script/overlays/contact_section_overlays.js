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
