class Report < ApplicationRecord
  belongs_to :user
  validates  :report_type, :location, :description, :did_it_happen_to_you, :date_and_time, presence: true

end
