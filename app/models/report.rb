class Report < ApplicationRecord
  belongs_to :user
  validates  :location, :description, presence: true
  validates  :report_type, presence: true, inclusion: { in: ["Verbal harassment", "Physical harassment", "Visual harassment", "Stalking", "Cyber harassment", "Discriminatory harassment"] }
  validates  :did_it_happen_to_you, inclusion: { in: [true, false] }
end
