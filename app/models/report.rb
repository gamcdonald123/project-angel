class Report < ApplicationRecord
  belongs_to :user
  validates  :location, :description, presence: true
end
