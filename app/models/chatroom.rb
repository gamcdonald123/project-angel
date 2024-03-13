class Chatroom < ApplicationRecord
  has_many :messages
  has_many :chatroom_users
  has_many :users, through: :chatroom_users
  belongs_to :sender, foreign_key: :sender_id, class_name: 'User'
  belongs_to :receiver, foreign_key: :receiver_id, class_name: 'User'
end
