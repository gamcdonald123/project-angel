import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scrolldown"
export default class extends Controller {
  connect() {
  }

  scroll() {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  }
}
