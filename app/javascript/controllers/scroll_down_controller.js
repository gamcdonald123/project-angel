import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="scroll-down"
export default class extends Controller {
  connect() {
  }

  scrollDown() {
    window.scrollBy({
      top: window.innerHeight,
      left: 0,
      behavior: 'smooth'
    });
  }
}
