import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="report"
export default class extends Controller {
  static targets = [ "description"]

  connect() {
  }

  changeDescriptionOptions(event) {
    let placeholderText = '';
    const reportType = event.target.value;
    switch (reportType) {
      case 'Verbal harassment':
      placeholderText = 'i.e. catcalling, derogatory remarks, sexual comments, and threats';

      case 'Physical harassment':
      placeholderText = 'i.e. unwanted physical contact, groping, assault, or any form of physical intimidation';

      case 'Visual harassment':
      placeholderText = 'i.e. unsolicited sending or showing of explicit images, indecent exposure, or voyeuristic behaviours';

      case 'Stalking':
      placeholderText = 'following or monitoring someone’s movements without their consent, leading to discomfort or fear';

      case 'Cyber harassment':
      placeholderText = 'i.e. threatening messages, spreading of private information without consent, or cyberstalking';


      case 'Discrimination harassment':
      placeholderText = 'i.e. harassment based on gender, sexuality, race, religion, or any other characteristic, including derogatory comments or exclusionary behaviour';
    }
    this.descriptionTarget.placeholder = placeholderText;
  }
}
