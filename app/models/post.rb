class Post < ApplicationRecord
  belongs_to :user
  belongs_to :community
  has_many :comments
  acts_as_votable
end
